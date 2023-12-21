'use client'
import { useState } from "react";

function Page() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {email, senha}
        const req = await fetch('http://localhost:3000/autenticacao',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .catch(e=>console.log(e));
        if (req.msg=="success") {
            alert('login realizado com sucesso')  
        }
    }

    return ( 
        <main>
            <form onSubmit={handleSubmit}>
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
                <input type="submit" value="Fazer login" />
            </form>
        </main>
     );
}

export default Page;