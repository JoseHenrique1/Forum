'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
function Page() {
    const [themes, setThemes] = useState([]);

    function handleLoadThemes() {
        fetch('http://localhost:3000/temas')
        .then(data=>data.json())
        .then(data=>setThemes(data))
        .catch(error=>console.log(error))
    }
    useEffect(handleLoadThemes, []);

    return ( 
        <main>
            <h1>Temas para debate</h1>
            {themes.map((theme)=>{
                const {id, conteudo, usuarioId } = theme;
                return (
                    <div key={id} >
                        <p> {conteudo} </p>
                        <Link href={"/temas/"+id} >Acessar</Link>
                    </div>
                )
            })}
        </main>
     );
}

export default Page;