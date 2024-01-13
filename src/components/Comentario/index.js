import { useEffect, useState } from "react";
import Image from "next/image";
import Resposta from "../Resposta";


function Comentario({comentario, user}) {
    const [mostrarRespostas, setMostrarRespostas] = useState(false);
    const [responder, setResponder] = useState(false);

    //tratando dados vindos da api
    const {id, mensagem, usuarioId} = comentario;
    const [respostas, setRespostas] = useState(comentario.respostas);

    async function handleSendResponse (e) {
        e.preventDefault()
        let data = {
            mensagem : e.target.response.value,
            usuarioId : user.id,
            comentarioId: id 
        }
        await fetch('http://localhost:3000/respostas', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .then((data)=>{
            setRespostas([...respostas, data.resposta])
        })
        .catch(e=>console.log(e))
    }
    return ( 
        <div>
            <div>
                <Image src="/usuarioPadrao.png" width={50} height={50} alt="avatar" />
                <p>Username {usuarioId}</p>
            </div>
            <p>{mensagem}</p>
            <div>
                <button onClick={()=>setMostrarRespostas(m=> !m)}>Ver respostas</button>
                <button onClick={()=>setResponder(r=>!r)}>Responder</button>
                {
                    responder && 
                    <form onSubmit={handleSendResponse}>
                        <input type="text" name="response" required/>
                        <input type="submit" value="enviar"/>
                    </form>
                }
            </div>
            <div>
                {
                    mostrarRespostas && respostas.map((resposta)=>{
                        return <Resposta key={resposta.id} resposta={resposta} />
                    })
                }
            </div>
            <hr />
        </div>
     );
}

export default Comentario;