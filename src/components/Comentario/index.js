"use client";
import { useState } from "react";
import Image from "next/image";
import ContainerRespostas from "../ContainerRespostas";

function Comentario({comment, user, socket}) {
    const [show, setShow] = useState(false);
    const {id, mensagem, usuario:{nome, email}} = comment;

    return ( 
        <div>
            <div>
                <Image src="/usuarioPadrao.png" width={50} height={50} alt="avatar" priority={true} />
                <p>{nome||email}</p>
            </div>
            <p>{mensagem}</p>
            <div>
                <button onClick={()=>setShow(e=>!e)}>{show? 'Ver menos': 'Ver respostas'}</button>
            </div>
            {show && <ContainerRespostas comentarioId={id} socket={socket} user={user} />}
            <hr />
            <hr />
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