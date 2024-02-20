
import Image from "next/image";

function Resposta({resposta}) {
    const {usuario: {nome, email}, mensagem, createdAt} = resposta;
    return ( 
        <div className="p-4  space-y-2 ">
            <div className="flex h-16 space-x-2 ">
                <div className="h-full">
                    <Image src="/usuarioPadrao.png" width={100} height={100} className="h-full w-auto rounded-full" alt="user"/>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="font-medium dark:text-white">{nome || email}</p>
                    <p className="text-xs text-gray-400">{createdAt.slice(0,16).replace('T', ' ')}</p>
                </div>
            </div>
            <p className="dark:text-gray-300">
                {mensagem}
            </p>
        </div>
     );
}

export default Resposta;