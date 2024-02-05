import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main>
      <h2>Página não encontrada</h2>
      <p>
        Verifique de você digitou a url corretamente, 
        caso contrário volte para a página <Link href="/">Home</Link>
    </p>
    </main>
  )
}