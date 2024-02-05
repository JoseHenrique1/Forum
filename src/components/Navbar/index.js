"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"

function Navbar() {
    const { data: session, status } = useSession()

    const route = useRouter();

    async function handleLogout () {
        await signOut({
            redirect: false
        })
        route.refresh()
    }
    return ( 
        <nav>
            <Link href="/temas">Temas</Link>
            <Link href="/cadastro">Cadastro</Link>
            <Link href="/login">Login</Link>
            {session?.user && <button onClick={handleLogout} >Logout</button>}
        </nav>
     );
}

export default Navbar;