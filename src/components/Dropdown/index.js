"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
function Dropdown({user, handleLogout}) {
    const [show, setShow] = useState(false);
    return ( 
        <div className="relative w-full sm:w-auto">
            <div onClick={()=>setShow(e=>!e)} className="flex w-full text-gray-100 hover:text-white dark:text-gray-400 dark:hover:text-gray-100">
                <p>{user.nome || user.email}</p>
                {
                    show?
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg> 
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>     
                }    
            </div>



            {
                show && 
                <div className="flex flex-col items-center w-full bg-white rounded sm:absolute sm:w-52 sm:shadow-md dark:bg-slate-800 dark:shadow-sm dark:shadow-slate-500">
                    <div className="flex justify-center items-center w-48 h-auto py-3 border-b-2">
                        <Image src="/usuarioPadrao.png" width={1000} height={1000} alt="avatar" className="w-40 h-auto rounded-full"/>
                    </div>


                    <div className="w-full flex flex-col justify-center items-center divide-y divide-slate-200 dark:divide-slate-500">        
                        <p className="w-full text-center py-1 dark:text-gray-300">{user.email}</p>
                        <Link className="w-full text-center py-1 hover:bg-slate-200 dark:text-gray-300 dark:hover:bg-slate-600" href={"/"}>Perfil</Link>
                        <button onClick={handleLogout} className="w-full text-center py-1 hover:bg-slate-200 dark:text-gray-300 dark:hover:bg-slate-600" href={"/"}>Sair</button>
                    </div>
                </div>
            }
        </div>
     );
}

export default Dropdown;