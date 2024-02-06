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
        <form onSubmit={handleSendResponse}>
            <input type="text" name="response" required/>
            <input type="submit" value="enviar"/>
        </form>
     );
}

export default FormResposta;