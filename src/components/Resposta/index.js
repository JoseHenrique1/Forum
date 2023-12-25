import Image from "next/image";

function Resposta({resposta}) {
    return ( 
        <div>
            <div>
                <Image width={50} height={50} src="/usuarioPadrao.png" alt="avatar" />
                <p>Username {resposta.usuarioId}</p>
            </div>
            <p>{resposta.mensagem}</p>
        </div>
     );
}

export default Resposta;