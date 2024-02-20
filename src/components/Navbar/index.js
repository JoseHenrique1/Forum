"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import Dropdown from "../Dropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

function Navbar({theme, setThemeApp}) {
    const [show, setShow] = useState(false);
    const { data: session, status } = useSession();

    const route = useRouter();

    async function handleLogout () {
        await signOut({
            redirect: false
        })
        route.refresh()
    }
    return ( 
        <div className="bg-blue-400 border-b p-4 space-y-4 sm:space-y-0 dark:bg-slate-900 dark:border-black">

            <button 
                className="block sm:hidden text-white"
                onClick={()=>setShow(e=>!e)}
            > 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </button>
            
            <div className={(show? 'flex flex-col items-start' : 'hidden')+' space-x-0 sm:space-x-4 space-y-1 sm:space-y-0 sm:flex sm:flex-row' }>
                <Link href="/" className="w-auto text-gray-100 hover:text-white dark:text-gray-400 dark:hover:text-gray-100">Inicio</Link>
                <Link href="/temas" className="w-auto text-gray-100 hover:text-white dark:text-gray-400 dark:hover:text-gray-100">Temas</Link>
                <Link href="/sobre" className="w-auto text-gray-100 hover:text-white dark:text-gray-400 dark:hover:text-gray-100">Sobre</Link>
                {
                    session?.user?
                    <Dropdown user={session.user} handleLogout={handleLogout}/>
                    :
                    <Link href="/login" className="w-auto text-gray-100 hover:text-white dark:text-gray-400 dark:hover:text-gray-100">Entre</Link>
                }
                <div className="w-auto" onClick={setThemeApp}>
                    {
                        theme == 'dark'?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-100 hover:text-white dark:text-gray-400 dark:hover:text-gray-100   ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-100 hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>     
                    }
                </div>
            </div>
        </div>
     );
}

export default Navbar;



/*

return ( 
        <nav>
            <Link href="/temas">Temas</Link>
            <Link href="/cadastro">Cadastro</Link>
            <Link href="/login">Login</Link>
            {session?.user && <button onClick={handleLogout} >Logout</button>}
        </nav>
     );

*/ 