import Option from "@/components/Option";

export default function Home() {
  
  return (
    <div className='container max-w-screen-lg mx-auto my-0 p-2 sm:p-4 flex flex-col items-center space-y-2'> 
      <h1 className="text-xl font-medium dark:text-gray-50">
        Conecte-se com a comunidade: <span className="text-blue-400">DiversityForum</span> !
      </h1>
      <p className="text-gray-500 dark:text-gray-400"> 
        Apresentamos o <span className="text-blue-400">DiversityForum</span>, um fórum online vibrante e dinâmico 
        onde você pode se conectar com pessoas que compartilham seus interesses. 
        Crie tópicos, participe de conversas e explore um mundo de conhecimento 
        e ideias!
      </p>
      <h1 className="font-medium dark:text-gray-50">
        Aqui no DiversityForum, você pode:
      </h1>
      <div className="flex justify-center flex-wrap gap-4">
        <Option title="Criar tópicos" description="Compartilhe suas ideias, perguntas e experiências. Escolha entre categorias predefinidas ou crie a sua própria!">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-400 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        </Option>
        <Option title="Comentar e responder" description="Participe de conversas em tempo real, interagindo com outros membros da comunidade e construindo conhecimento juntos.">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-400 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg> 
        </Option>
        <Option title="Comunicação instantânea" description="Receba mensagens em tempo real e mantenha-se conectado à conversa. Responda a comentários e menções rapidamente, sem perder o fio da meada.">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-400 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          </svg>
        </Option>
        <Option title="Temas personalizáveis" description="Escolha entre o tema claro e escuro para personalizar sua experiência de navegação no site.">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-400 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
          </svg>
        </Option>
      </div>
    </div>
  );
}