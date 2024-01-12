"use client";
import { useEffect, useState } from "react";
import Comentario from "@/components/Comentario/index.js";

function Page({params}) {
    const [tema, setTema] = useState("");
    const [interacoes, setInteracoes] = useState([]);
    
    function handleLoadTema () {
        fetch('http://localhost:3000/temas/'+params.id)
        .then(data=>data.json())
        .then((data)=> setTema(data.conteudo))
        .catch(error=>console.log(error));
    }

    function handleLoadInteractions () {
        fetch('http://localhost:3000/interacoes/'+params.id)
        .then(data=>data.json())
        .then(data=>setInteracoes(data))
        .catch(error=>console.log(error));
    }

    useEffect(handleLoadTema,[])
    useEffect(handleLoadInteractions, []);
    
    return ( 
        <main>
            <h3>{tema}</h3>
            <section>
                {
                    interacoes.map((interacao)=>{
                        return <Comentario key={interacao.id} comentario={interacao} />
                    })
                }
            </section>   
        </main>
     );
}

export default Page;