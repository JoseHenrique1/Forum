'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const route = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {nome, email, senha}
        const req = await fetch(API_URL+'/usuarios',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .catch(console.error);
        if (req.msg=="success") {
            route.replace('/login');
        } else {
            alert("Usuário já existe");
        }
    }

    return ( 
            <form className="sm:w-3/4 lg:w-1/2 p-2 sm:p-4 space-y-2 sm:space-y-4 mx-auto my-0" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    value={nome} 
                    onChange={(e)=>{setNome(e.target.value)}}
                    required
                    className="
                        w-full
                        border focus:outline-none focus:ring-2 hover:ring-1
                        text-gray-700
                        px-2 py-1 
                        rounded
                        dark:bg-slate-700 
                        dark:text-gray-100
                        dark:border-slate-600
                        dark:ring-blue-300  
                    "/>
                <input 
                    type="email" 
                    placeholder="Email@gmail.comm" 
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                    className="
                        w-full
                        border focus:outline-none focus:ring-2 hover:ring-1
                        text-gray-700
                        px-2 py-1 
                        rounded
                        dark:bg-slate-700 
                        dark:text-gray-100
                        dark:border-slate-600
                        dark:ring-blue-300  
                    "/>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e)=>{setSenha(e.target.value)}}
                    required
                    className="
                        w-full
                        border focus:outline-none focus:ring-2 hover:ring-1
                        text-gray-700
                        px-2 py-1 
                        rounded
                        dark:bg-slate-700 
                        dark:text-gray-100
                        dark:border-slate-600
                        dark:ring-blue-300  
                    "/>
                <input type="submit" value="Cadastre-se" className="w-32 bg-blue-400 px-4 py-2 rounded text-white focus:ring-2"/>
            </form>
        
     );
}

export default Page;