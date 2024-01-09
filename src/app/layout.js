import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextAuthSessionProvider from "@/providers/sessionProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <Navbar/>
          {children}
          <Footer/>
        </NextAuthSessionProvider>
        </body>
    </html>
  )
}
