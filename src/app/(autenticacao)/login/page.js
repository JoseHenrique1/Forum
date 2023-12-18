'use client'
import { useState } from "react";

function Page() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return ( 
        <main>
            <div>
                <input 
                    type="email" 
                    placeholder="Email@gmail.comm" 
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e)=>{setSenha(e.target.value)}}/>
                <button>Cadastrar</button>
            </div>
        </main>
     );
}

export default Page;