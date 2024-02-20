"use client";
import { useState, useEffect } from "react";
import Resposta from "../Resposta";
import Button from "../Button";
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
            {responses.length != 0 ? <div className="border-b-2 border-blue-400 bg-blue-50 dark:bg-slate-600">
            {
                responses.map((resposta)=>{
                    return <Resposta key={resposta.id} resposta={resposta} />})  
            }
            </div>
            :
            <></>}
            <div className="flex items-center justify-center py-1">
                <button
                        className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white border-2 px-4 py-2 rounded-md " 
                        onClick={()=>setResponsesNumber(e=>e+5)} 
                        disabled={responsesNumber >= responsesAll.length? true: false}
                >Mais respostas</button>
            </div>
        </div>
     );
}

export default ContainerRespostas;