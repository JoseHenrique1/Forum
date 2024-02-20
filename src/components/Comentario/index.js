"use client";
import { useState } from "react";
import Image from "next/image";
import ContainerRespostas from "../ContainerRespostas";

function Comentario({comment, user, socket}) {
    const [show, setShow] = useState(false);
    const {id, mensagem, usuario:{nome, email}} = comment;

    return ( 
        <div className="bg-white p-4 space-y-2 shadow-md dark:bg-slate-700 dark:shadow-sm dark:shadow-blue-300">
            <div className="flex h-16 space-x-2 ">
                <div className="h-16">
                    <Image src="/usuarioPadrao.png" className="h-full w-auto rounded-full " width={50} height={50} alt="avatar" priority={true} />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="font-medium dark:text-white">{nome||email}</p>
                    <p className="text-xs text-gray-400">10/12/2023</p>
                </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300">{mensagem}</p>
            <div>
                <button className="hover:bg-blue-100 text-blue-400 px-3 py-1 rounded-md  focus:ring-2 dark:hover:bg-slate-600" onClick={()=>setShow(e=>!e)}>{show? 'Ver menos': 'Ver respostas'}</button>
            </div>
            {show && <ContainerRespostas comentarioId={id} socket={socket} user={user} />}
            
        </div>
     );
}

export default Comentario;


/*
USER
MSG - comment
OPTIONS - buttons
FORM - send response
CONTAINER - responses

106 LINHAS
*/ 