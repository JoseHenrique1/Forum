'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"

function Page() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const route = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const result = await signIn('credentials', {
            email,
            senha,
            redirect: false
        })
        if(result.error) {
            alert("Verifique email e senha")
            return
        } 
      
        route.refresh()
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