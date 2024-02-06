"use client";
import Comentario from "../Comentario";
import { useState, useEffect } from "react";
import FormComentario from "../FormComentario";
import Button from "../Button";

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

    useEffect(()=>{
        socket.on('tema'+temaId, (data)=>{
            setComments(e=>[data.comentario, ...e])            
        })
    },[]);
    useEffect(handleLoadComments, []);
    useEffect(handleLoadMoreComments, [commentsAll, commentsNumber]);
    return ( 
        <div>
            <FormComentario setComments={setComments} socket={socket} user={user} temaId={temaId}/>
            <section>
                {
                    comments.map((comment)=>{  
                        return <Comentario key={comment.id} comment={comment} user={user} socket={socket}/>  
                    })
                }
            </section> 
            <section>
                <Button 
                    onclick={()=>{setCommentsNumber(e=>e+5)}}
                    disabled={commentsNumber >= commentsAll.length? true: false}
                > Mais comentarios </Button>
            </section> 
        </div> 
    );
}

export default ContainerComentarios;