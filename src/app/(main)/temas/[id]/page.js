"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import ContainerComentarios from "@/components/ContainerComentarios";

function Page({params}) {
    const [socket, setSocket] = useState(null)
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
        setSocket(io(SOCKET_URL));
        return () => {socket?.disconnect()}
    },[]);
    useEffect(handleLoadTema,[]);
    return ( 
        <div className="container max-w-screen-lg mx-auto my-0 p-2 sm:p-4 space-y-4 ">
            <p className="text-xl dark:text-white">{tema}</p>
            {
                session && socket && <ContainerComentarios temaId={params.id} socket={socket} user={session.user} /> 
            }   
        </div>        
     );
}

export default Page;