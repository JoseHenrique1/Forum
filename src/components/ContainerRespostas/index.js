"use client";
import { useState, useEffect } from "react";
import Resposta from "../Resposta";
import FormResposta from "../FormResposta";

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

    useEffect(()=>{
        socket.on('comentario'+comentarioId, (data)=>{
            setResponses(e=>[data.resposta, ...e])   
        })
    },[]);
    useEffect(handleLoadResponses, []);
    useEffect(handleLoadMoreResponses, [responsesAll ,responsesNumber]); 
    return ( 
        <div>
            <FormResposta setResponses={setResponses} socket={socket} comentarioId={comentarioId} user={user} />
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