'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FormTheme from "@/components/FormTheme";

function Page() {
    const { data: session, status } = useSession();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [themes, setThemes] = useState([]);

    function handleLoadThemes() {
        fetch(API_URL+'/temas')
        .then(data=>data.json())
        .then(data=>setThemes(data))
        .catch(error=>console.log(error))
    }

    function handleCreateThemes (e) {
        e.preventDefault();
        fetch(API_URL+'/temas', { 
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
        <div className='container max-w-screen-lg mx-auto my-0 p-2 sm:p-4 space-y-4'>
            <h1 className='text-xl dark:text-white'>Temas para debate</h1>
            <FormTheme handleCreateThemes={handleCreateThemes} />
            {
                themes.map((theme)=>{
                    const {id, conteudo, usuarioId } = theme;
                    return (
                        <div key={id} className='w-full flex flex-col items-start bg-white shadow p-2 sm:p-4 dark:bg-slate-700 dark:shadow-sm  dark:shadow-blue-300'>
                            <p className="dark:text-white"> {conteudo} </p>
                            <Link href={"/temas/"+id} className='text-blue-400'>Acessar</Link>
                        </div>
                    )
                })
            }
        </div>
     );
}

export default Page;