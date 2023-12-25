import { useEffect, useState } from "react";
import Image from "next/image";
import Resposta from "../Resposta";


function Comentario({comentario}) {
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
                {
                    respostas.map((resposta)=>{
                        return <Resposta key={resposta.id} resposta={resposta} />
                    })
                }
            </div>
            <hr />
        </div>
     );
}

export default Comentario;