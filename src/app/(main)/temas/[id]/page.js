"use client";
import { useEffect, useState } from "react";
import Comentario from "@/components/Comentario/index.js";
import { useSession } from "next-auth/react";

function Page({params}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { data: session, status } = useSession();
    const [tema, setTema] = useState("");
    const [commentsAll, setCommentsAll] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(5);

    function handleLoadTema () {
        fetch(API_URL+'temas/'+params.id)
        .then(data=>data.json())
        .then((data)=> setTema(data.conteudo))
        .catch(error=>console.log(error));
    }

    function handleLoadComments () {
        fetch(API_URL+`comentarios/?temaId=${params.id}`) 
        .then(data=>data.json())
        .then((data)=>{
            setCommentsAll(data.comentarios);
        })
        .catch(error=>console.log(error)); 
    }

    function handleLoadMoreComments () {
        setComments((e)=>{ 
            if (e.length != 0 && e[e.length-1].id == commentsAll.slice(commentsNumber-5, commentsNumber)[4]?.id) {return e}
            else { return [...e, ...commentsAll.slice(commentsNumber-5, commentsNumber)] }
        }) }

    async function handleSendComment (e) {
        e.preventDefault();
        if (session) {
            let data = {
                mensagem : e.target.comment.value,
                usuarioId : session.user.id,
                temaId: params.id 
            }
            await fetch(API_URL+'comentarios', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(data=>data.json())
            .then((data)=>{
                setComments([
                    {
                        ...data.comentario, 
                        usuario:{
                            nome: session?.user.nome,
                            email: session?.user.email,
                        }
                    },
                    ...comments
                ])
            })
            .catch(e=>console.log(e))
        }
        e.target.reset()
    }

    useEffect(handleLoadTema,[])
    useEffect(handleLoadComments, []);
    useEffect(handleLoadMoreComments, [commentsAll, commentsNumber])

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
                    session?.user && comments.map((comment)=>{  
                        return <Comentario key={comment.id} comment={comment} user={session.user} />  
                    })
                }
            </section> 
            <section>
                <button 
                    onClick={()=>{setCommentsNumber(e=>e+5)}}
                    disabled={
                        commentsNumber >= commentsAll.length? true: false
                    }
                > Mais comentarios </button>
            </section>  
        </main>
     );
}

export default Page;