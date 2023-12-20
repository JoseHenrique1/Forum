'use client'
import { useState } from "react";

function Page() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {nome, email, senha}
        const req = await fetch('http://localhost:3000/cadastro',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .catch(console.error);
        if (req.msg=="success") {
            alert('cadastrado com sucesso')  
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