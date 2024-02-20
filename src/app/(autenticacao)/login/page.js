'use client'
import { useState } from "react";
import Link from "next/link";
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
        
        <form className="sm:w-3/4 lg:w-1/2 p-2 sm:p-4 space-y-2 sm:space-y-4 mx-auto my-0" onSubmit={handleSubmit}>
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
            <input type="submit" value="Fazer login" className="w-32 bg-blue-400 px-4 py-2 rounded text-white focus:ring-2 "/>
            <p className="text-gray-500 dark:text-gray-300">Ainda não possui conta? <Link href="/cadastro" className="text-blue-400 hover:text-blue-500 dark:hover:text-blue-500">Cadastre-se</Link></p>
        </form>
        
     );
}

export default Page;