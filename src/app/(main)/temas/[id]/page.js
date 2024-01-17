"use client";
import { useEffect, useState } from "react";
import Comentario from "@/components/Comentario/index.js";
import { useSession } from "next-auth/react";

function Page({params}) {
    const { data: session, status } = useSession();
    const [tema, setTema] = useState("");
    const [comments, setComments] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)
    
    function handleLoadTema () {
        fetch('http://localhost:3000/temas/'+params.id)
        .then(data=>data.json())
        .then((data)=> setTema(data.conteudo))
        .catch(error=>console.log(error));
    }

    function handleLoadComments () {
        fetch(`http://localhost:3000/comentarios/?temaId=${params.id}&pageNumber=${pageNumber}`)
        .then(data=>data.json())
        .then(data=>setComments(data.comentarios))
        .catch(error=>console.log(error)); 
    }

    useEffect(handleLoadTema,[])
    useEffect(handleLoadComments, []);

    async function handleSendComment (e) {
        e.preventDefault();
        if (session) {
            let data = {
                mensagem : e.target.comment.value,
                usuarioId : session.user.id,
                temaId: params.id 
            }
            console.log(data)
            await fetch('http://localhost:3000/comentarios', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(data=>data.json())
            .then((data)=>{
                console.log(data)
                //setComments([...comments, {...data.comentario}])
            })
            .catch(e=>console.log(e))
        }
        e.target.reset()
    }
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
        </main>
     );
}

export default Page;