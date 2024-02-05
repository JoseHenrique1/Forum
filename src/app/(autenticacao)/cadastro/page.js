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
        <main>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    value={nome} 
                    onChange={(e)=>{setNome(e.target.value)}}
                    required/>
                <input 
                    type="email" 
                    placeholder="Email@gmail.comm" 
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required/>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e)=>{setSenha(e.target.value)}}
                    required/>
                <input type="submit" value="Cadastre-se" />
            </form>
        </main>
     );
}

export default Page;