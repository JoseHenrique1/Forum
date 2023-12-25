"use client";
import { useEffect, useState } from "react";
import Comentario from "@/components/Comentario/index.js";

function Page({params}) {
    const [interacoes, setInteracoes] = useState([]);

    function handleLoadInteractions () {
        fetch('http://localhost:3000/interacoes/'+params.id)
        .then(data=>data.json())
        .then(data=>setInteracoes(data))
        .catch(error=>console.log(error));
    }

    useEffect(handleLoadInteractions, []);
    return ( 
        <main>
            id {params.id}
            <h3>Tema a ser debatido</h3>
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