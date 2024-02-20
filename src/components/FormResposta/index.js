function FormResposta({setResponses, socket, comentarioId, user}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    async function handleSendResponse (e) {
        e.preventDefault()

        let data = {
            mensagem : e.target.response.value,
            usuarioId : user.id,
            comentarioId: comentarioId 
        }
        let req = await fetch(API_URL+'/respostas', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(data=>data.json())
        .catch(e=>console.log(e));

        setResponses((e)=>{
            return [{...req.resposta, usuario: {id: user.id, nome: user.nome, email: user.email}}, ...e]
        })

        socket.emit('comentarios', {
            comentarioId, 
            resposta: {
                ...req.resposta,
                usuario: {...user}
            },
        });  

        e.target.reset();
    }

    return ( 
        <form className="w-full bg-transparent dark:bg-slate-700" onSubmit={handleSendResponse}>
            <div className="flex flex-col justify-center items-end py-4 space-y-1 sm:space-y-2">
                <input className="w-full px-4 border-blue-400 border-b focus:border-b-2 focus:outline-none dark:bg-transparent dark:text-gray-100" type="text" name="response" required/>
                <input className="bg-blue-400 px-4 py-2 rounded text-white focus:ring-2" type="submit" value="enviar"/>
            </div>
        </form>
     );
}

export default FormResposta;