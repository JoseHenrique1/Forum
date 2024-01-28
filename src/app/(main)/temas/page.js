'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Page() {
    const { data: session, status } = useSession();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [themes, setThemes] = useState([]);

    function handleLoadThemes() {
        fetch(API_URL+'temas')
        .then(data=>data.json())
        .then(data=>setThemes(data))
        .catch(error=>console.log(error))
    }

    function handleCreateThemes (e) {
        e.preventDefault();
        fetch(API_URL+'temas', { 
            method: "POST", 
            body: JSON.stringify({
                usuarioId: session?.user.id,
                conteudo: e.target.theme.value
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"} 
        })
        .then(data=>data.json())
        .then(data=>setThemes(e=>[...e,data.tema]))
        e.target.reset();
    }
    useEffect(handleLoadThemes, []);

    return ( 
        <main>
            <h1>Temas para debate</h1>
            <form onSubmit={handleCreateThemes}>
                <input type="text" name="theme" required />
                <input type="submit" value="Criar tema"/>
            </form>
            <section>
                {themes.map((theme)=>{
                    const {id, conteudo, usuarioId } = theme;
                    return (
                        <div key={id} >
                            <p> {conteudo} </p>
                            <Link href={"/temas/"+id} >Acessar</Link>
                        </div>
                    )
                })}
            </section>
        </main>
     );
}

export default Page;