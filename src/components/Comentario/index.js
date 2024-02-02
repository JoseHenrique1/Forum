import { useEffect, useState } from "react";
import Image from "next/image";
import Resposta from "../Resposta";


function Comentario({comment, user, socket}) {
    const [mostrarRespostas, setMostrarRespostas] = useState(false);
    const [responder, setResponder] = useState(false);

    //tratando dados vindos da api
    const {id, mensagem, usuario:{nome, email}} = comment;
    const [responsesAll, setResponsesAll] = useState([]);
    const [responses, setResponses] = useState([]);
    const [responsesNumber, setResponsesNumber] = useState(5);

    function handleLoadResponses () {
        fetch(`http://localhost:3000/respostas/?comentarioId=${id}`)
        .then(data=>data.json())
        .then((data)=>{
            setResponsesAll(data.respostas);  
        })
        .catch(e=>console.log(e))
    }

    function handleLoadMoreResponses () {
        setResponses((e)=>{ 
            if (e.length != 0 && e[e.length-1].id == responsesAll.slice(responsesNumber-5, responsesNumber)[4]?.id) {return e}
            else { return [...e, ...responsesAll.slice(responsesNumber-5, responsesNumber)] }
        })
    }

    async function handleSendResponse (e) {
        e.preventDefault()
        let data = {
            mensagem : e.target.response.value,
            usuarioId : user.id,
            comentarioId: id 
        }
        let req = await fetch('http://localhost:3000/respostas', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .then(data=>data)
        .catch(e=>console.log(e));
        setResponses((e)=>{
            return [{...req.resposta, usuario: {id: user.id, nome: user.nome, email: user.email}}, ...e]
        })
        let dataResponse = {
            ...req.resposta,
            usuario: {
                ...user
            }
        }
        socket.current.emit('comentarios', {
            comentarioId: id, 
            resposta: dataResponse,
        });  
        e.target.reset();
    }
    useEffect(()=>{
        socket.current.on('comentario'+id, (data)=>{
            setResponses(e=>[data.resposta, ...e])   
        })
        return () => {socket.current.disconnect()}
    },[]);
    useEffect(handleLoadResponses, []);
    useEffect(handleLoadMoreResponses, [responsesAll ,responsesNumber]); 
    return ( 
        <div>
            <div>
                <Image src="/usuarioPadrao.png" width={50} height={50} alt="avatar" priority={true} />
                <p>{nome||email}</p>
            </div>
            <p>{mensagem}</p>
            <div>
                <button onClick={()=>setMostrarRespostas(m=> !m)}>Ver respostas</button>
                <button onClick={()=>setResponder(r=>!r)}>Responder</button>
                {
                    responder && 
                    <form onSubmit={handleSendResponse}>
                        <input type="text" name="response" required/>
                        <input type="submit" value="enviar"/>
                    </form>
                }
            </div>
            <div>
                {
                    mostrarRespostas && responses.map((resposta)=>{
                        return <Resposta key={resposta.id} resposta={resposta} />})  
                }
                {
                    mostrarRespostas && <button 
                            onClick={()=>setResponsesNumber(e=>e+5)} 
                            disabled={responsesNumber >= responsesAll.length? true: false}
                    >Mais respostas</button>
                }
            </div>
            <hr />
            <hr />
        </div>
     );
}

export default Comentario;