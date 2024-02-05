import Image from "next/image";

function Resposta({resposta}) {
    const {usuario: {nome, email}, mensagem} = resposta;
    return ( 
        <div>
            <div>
                <Image width={50} height={50} src="/usuarioPadrao.png" alt="avatar" />
                <p>{nome || email}</p>
            </div>
            <p>{mensagem}</p>
        </div>
     );
}

export default Resposta;