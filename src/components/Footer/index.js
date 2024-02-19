import Link from "next/link";

function Footer() {
    return ( 
        <footer className="bg-blue-400 text-white w-full flex flex-col sm:flex-row justify-center items-center gap-2 border-t p-4 dark:bg-slate-900">
            <Link href="/" className="shadow"> Github </Link>
            <Link href="/"> Linkedin </Link>
            <Link href="/"> Instagram </Link>
        </footer>
     );
}

export default Footer;