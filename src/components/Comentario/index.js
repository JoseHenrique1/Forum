import { useEffect, useState } from "react";
import Image from "next/image";
import Resposta from "../Resposta";


function Comentario({comentario}) {
    const [mostrarRespostas, setMostrarRespostas] = useState(false);
    const [responder, setResponder] = useState(false);

    //tratando dados vindos da api
    const {mensagem, usuarioId} = comentario;
    const [respostas, setRespostas] = useState([]);
    useEffect(()=>{setRespostas(comentario.respostas)});

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
                    <form>
                        <input type="text" required/>
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