"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import ContainerComentarios from "@/components/ContainerComentarios";

function Page({params}) {
    const socket = useRef(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL
    const { data: session, status } = useSession();
    const [tema, setTema] = useState("");

    function handleLoadTema () {
        fetch(API_URL+'/temas/'+params.id)
        .then(data=>data.json())
        .then((data)=> setTema(data.conteudo))
        .catch(error=>console.log(error));
    }

    useEffect(()=>{
        socket.current = io(SOCKET_URL);
        return () => {socket.current.disconnect()}
    },[]);
    useEffect(handleLoadTema,[]);
    return ( 
        <main>
            <h3>{tema}</h3>
            <p>{session?.user.nome} Faça um comentario!</p>
            {
                session && socket.current?.connected && <ContainerComentarios temaId={params.id} socket={socket} user={session.user} /> 
            }     
        </main>
     );
}

export default Page;