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
        <form onSubmit={handleSendComment} className="bg-white divide-y border rounded shadow dark:bg-slate-700 dark:border-slate-600 dark:divide-slate-600 dark:shadow-blue-300">
            <textarea name="comment" className="bg-transparent w-full h-32 p-3 focus:outline-none resize-none text-gray-800 dark:text-gray-100" placeholder="Faça o seu comentario aqui..." required />
            <div className="w-full p-3 flex justify-between">
                <p className="text-sm dark:text-gray-400">Fuso horário</p>
                <input type="submit" className="bg-blue-400 px-4 py-2 rounded text-white focus:ring-2" value="Enviar" />
            </div>
            
        </form>
     );
}

export default FormComentario;