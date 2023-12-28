import Link from "next/link";
function Navbar() {
    return ( 
        <nav>
            <Link href="/temas">Temas</Link>
            <Link href="/cadastro">Cadastro</Link>
            <Link href="/login">Login</Link>
        </nav>
     );
}

export default Navbar;