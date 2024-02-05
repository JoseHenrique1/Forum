"use client";
import { useState, useEffect } from "react";
import Resposta from "../Resposta";

function ContainerRespostas({comentarioId, socket, user}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [responsesAll, setResponsesAll] = useState([]);
    const [responses, setResponses] = useState([]);
    const [responsesNumber, setResponsesNumber] = useState(5);

    function handleLoadResponses () {
        fetch(API_URL+`/respostas/?comentarioId=${comentarioId}`)
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
            comentarioId: comentarioId 
        }
        let req = await fetch(API_URL+'/respostas', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .catch(e=>console.log(e));

        setResponses((e)=>{
            return [{...req.resposta, usuario: {id: user.id, nome: user.nome, email: user.email}}, ...e]
        })

        socket.emit('comentarios', {
            comentarioId, 
            resposta: {
                ...req.resposta,
                usuario: {...user}
            },
        });  

        e.target.reset();
    }

    useEffect(()=>{
        socket.on('comentario'+comentarioId, (data)=>{
            setResponses(e=>[data.resposta, ...e])   
        })
    },[]);
    useEffect(handleLoadResponses, []);
    useEffect(handleLoadMoreResponses, [responsesAll ,responsesNumber]); 
    return ( 
        <div>
            <form onSubmit={handleSendResponse}>
                <input type="text" name="response" required/>
                <input type="submit" value="enviar"/>
            </form>
            {
                responses.map((resposta)=>{
                    return <Resposta key={resposta.id} resposta={resposta} />})  
            }
            <button 
                    onClick={()=>setResponsesNumber(e=>e+5)} 
                    disabled={responsesNumber >= responsesAll.length? true: false}
            >Mais respostas</button>
        </div>
     );
}

export default ContainerRespostas;