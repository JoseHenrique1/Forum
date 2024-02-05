"use client";
import Comentario from "../Comentario";
import { useState, useEffect } from "react";

function ContainerComentarios({temaId, user, socket}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [commentsAll, setCommentsAll] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentsNumber, setCommentsNumber] = useState(5);

    function handleLoadComments () {
        fetch(API_URL+`/comentarios/?temaId=${temaId}`) 
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
        }) 
    }

    async function handleSendComment (e) {
        e.preventDefault();
        let data = {
            mensagem : e.target.comment.value,
            usuarioId : user.id,
            temaId
        };
        let req = await fetch(API_URL+'/comentarios', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .then(data=>data)
        .catch(e=>console.log(e));

        setComments([
            {
                ...req.comentario, 
                usuario:{
                    nome: user.nome,
                    email: user.email,
                }
            },
            ...comments
        ]);

        socket.current.emit('temas', {
            temaId,
            comentario: {
                ...req.comentario,
                usuario: {...user}
            },
        }); 
        
        e.target.reset()
    }

    useEffect(()=>{
        socket.current.on('tema'+temaId, (data)=>{
            setComments(e=>[data.comentario, ...e])            
        })
    },[]);
    useEffect(handleLoadComments, []);
    useEffect(handleLoadMoreComments, [commentsAll, commentsNumber]);
    return ( 
    <div>
        <form onSubmit={handleSendComment}>
            <textarea name="comment" required />
            <input type="submit" value="Enviar" />
        </form>
        <section>
            {
                comments.map((comment)=>{  
                    return <Comentario key={comment.id} comment={comment} user={user} socket={socket}/>  
                })
            }
        </section> 
        <section>
            <button 
                onClick={()=>{setCommentsNumber(e=>e+5)}}
                disabled={commentsNumber >= commentsAll.length? true: false}
            > Mais comentarios </button>
        </section> 
    </div> 
    );
}

export default ContainerComentarios;