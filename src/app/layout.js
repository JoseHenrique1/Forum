"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import './globals.css'
export default function RootLayout({ children }) {
  const [theme, setTheme] = useState( '' )
  function setThemeApp () {
    let themeCurrent = localStorage.getItem('themeApp') == ''?'dark':'';
    localStorage.setItem("themeApp", themeCurrent)
    setTheme(themeCurrent)
  }
  useEffect(()=>{
    let themeCurrent = localStorage.getItem('themeApp')? localStorage.getItem('themeApp'): "";
    setTheme(themeCurrent)
  },[])
  return (
    <html lang="en" className={theme}>
      <body className="h-screen flex flex-col">
        <NextAuthSessionProvider>

        <Navbar theme={theme} setThemeApp={setThemeApp}/>
        <main className="grow bg-gray-50 dark:bg-slate-800">
        {children}
        </main>
        <Footer/>
        
        </NextAuthSessionProvider>
        </body>
    </html>
  )
}
