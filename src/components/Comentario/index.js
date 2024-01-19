import { useEffect, useState } from "react";
import Image from "next/image";
import Resposta from "../Resposta";


function Comentario({comment, user}) {
    const [mostrarRespostas, setMostrarRespostas] = useState(false);
    const [responder, setResponder] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    //tratando dados vindos da api
    const {id, mensagem, usuarioId, usuario:{nome, email}} = comment;
    const [responsesPublic, setResponsesPublic] = useState([]);
    const [responsesPersonal, setResponsesPersonal] = useState([]);

    function handleLoadResponse () {
        fetch(`http://localhost:3000/respostas/?comentarioId=${id}&pageNumber=${pageNumber}&usuarioId=${user.id}`)
        .then(data=>data.json())
        .then((data)=>{
            setResponsesPublic(data.respostasPublicas);
            setResponsesPersonal(data.respostasPessoais);
        })
        .catch(e=>console.log(e))
    }

    async function handleSendResponse (e) {
        e.preventDefault()
        let data = {
            mensagem : e.target.response.value,
            usuarioId : user.id,
            comentarioId: id 
        }
        await fetch('http://localhost:3000/respostas', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .then((data)=>{
            setResponsesPersonal((e)=>{
                return [...e, {...data.resposta, usuario: {id: user.id, nome: user.nome, email: user.email}}]
            })
        })
        .catch(e=>console.log(e))
    }

    useEffect(handleLoadResponse, [])
    return ( 
        <div>
            <div>
                <Image src="/usuarioPadrao.png" width={50} height={50} alt="avatar" />
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
                    mostrarRespostas && responsesPersonal.map((resposta)=>{
                        return <Resposta key={resposta.id} resposta={resposta} />
                    })
                }
                {
                    mostrarRespostas && responsesPublic.map((resposta)=>{
                        return <Resposta key={resposta.id} resposta={resposta} />
                    })
                }
            </div>
            <hr />
        </div>
     );
}

export default Comentario;