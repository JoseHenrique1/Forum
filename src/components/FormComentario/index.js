function FormComentario({setComments, socket, user, temaId}) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

        setComments(e=>[
            {
                ...req.comentario, 
                usuario:{
                    nome: user.nome,
                    email: user.email,
                }
            },
            ...e
        ]);

        socket.emit('temas', {
            temaId,
            comentario: {
                ...req.comentario,
                usuario: {...user}
            },
        }); 
        
        e.target.reset()
    }

    return ( 
        <form onSubmit={handleSendComment}>
            <textarea name="comment" required />
            <input type="submit" value="Enviar" />
        </form>
     );
}

export default FormComentario;