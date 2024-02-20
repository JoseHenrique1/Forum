function FormTheme({handleCreateThemes}) {
    return ( 
        <form className="flex justify-start gap-4 flex-wrap " onSubmit={handleCreateThemes} >
          <input 
            name="theme"
            type="text" 
            className="grow max-w-full px-2 py-1 focus:outline-none focus:ring-2 hover:ring-1 rounded shadow dark:text-gray-100 dark:bg-slate-700 dark:hover:ring-1 dark:ring-blue-300 dark:focus:ring-2" 
            placeholder="Digite seu tema aqui!"
          />
          <input 
            type="submit" 
            className="px-2 py-1 bg-blue-400 text-gray-100 rounded hover:text-white active:ring-2 dark:bg-sky-700"
            value="Criar tema " 
          />
        </form>
     );
}

export default FormTheme;