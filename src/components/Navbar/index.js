import Link from "next/link";
function Navbar() {
    return ( 
        <nav>
            <Link href="#">Temas</Link>
            <Link href="#">Cadastro</Link>
            <Link href="#">Login</Link>
        </nav>
     );
}

export default Navbar;