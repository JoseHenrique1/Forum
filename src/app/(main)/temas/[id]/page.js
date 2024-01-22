"use client";
import { useEffect, useState } from "react";
import Comentario from "@/components/Comentario/index.js";
import { useSession } from "next-auth/react";

function Page({params}) {
    const { data: session, status } = useSession();
    const [tema, setTema] = useState("");
    const [commentsPublic, setCommentsPublic] = useState([]);
    const [commentsPersonal, setCommentsPersonal] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)

    function handleLoadTema () {
        fetch('http://localhost:3000/temas/'+params.id)
        .then(data=>data.json())
        .then((data)=> setTema(data.conteudo))
        .catch(error=>console.log(error));
    }

    function handleLoadComments () {
        session != undefined && fetch(`http://localhost:3000/comentarios/?temaId=${params.id}&pageNumber=${pageNumber}&usuarioId=${session?.user.id}`)
        .then(data=>data.json())
        .then((data)=>{
            setCommentsPersonal(data.comentariosPessoais);
            setCommentsPublic((e)=>{
                return [...e, ...data.comentariosPublicos]
            });
        })
        .catch(error=>console.log(error)); 
    }


    async function handleSendComment (e) {
        e.preventDefault();
        if (session) {
            let data = {
                mensagem : e.target.comment.value,
                usuarioId : session.user.id,
                temaId: params.id 
            }
            await fetch('http://localhost:3000/comentarios', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(data=>data.json())
            .then((data)=>{
                setCommentsPersonal([...commentsPersonal, {
                    ...data.comentario, 
                    usuario:{
                        nome: session?.user.nome,
                        email: session?.user.email,
                    }
                }])
            })
            .catch(e=>console.log(e))
        }
        e.target.reset()
    }

    useEffect(handleLoadTema,[])
    useEffect(handleLoadComments, [session,pageNumber]);

    return ( 
        <main>
            <h3>{tema}</h3>
            <p>{session?.user.nome} Faça um comentario!</p>
            <form onSubmit={handleSendComment}>
                <textarea name="comment" required />
                <input type="submit" value="Enviar" />
            </form>
            <section>
                {
                    session?.user && commentsPersonal.map((comment)=>{  
                        return <Comentario key={comment.id} comment={comment} user={session.user} />  
                    })
                }
                {
                    session?.user && commentsPublic.map((comment)=>{  
                        return <Comentario key={comment.id} comment={comment} user={session.user} />  
                    })
                }
            </section> 
            <section>
                <button onClick={()=>setPageNumber(e=>e+1)} >Mais comentarios</button>
            </section>  
        </main>
     );
}

export default Page;