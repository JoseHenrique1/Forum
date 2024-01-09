import { getServerSession } from "next-auth";
import {nextAuthOptions} from "../api/auth/[...nextauth]/route.js"
import { redirect } from "next/navigation";

async function Layout({children}) {
    const session = await getServerSession(nextAuthOptions)
    if (!session) {
        redirect('/login')  
    }
    return ( 
        <main>
            {children}
        </main>
     );
}

export default Layout;