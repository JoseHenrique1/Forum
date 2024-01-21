import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: "Email", type: "email" },
          senha: { label: "Senha", type: "password" }
        },
      
        async authorize(credentials, req) {
          const requisicao = await fetch(`http://localhost:3000/usuarios/?email=${credentials.email}&senha=${credentials.senha}`)
          .then(data=>data.json())
          .catch(e=>console.log(e));
          if (requisicao.msg=="success") {
              return {user: requisicao.user}
          } else {
            return null
          }
        }
      })
    ],
    pages: {
      signIn: "/"
    },
    callbacks: {
      async jwt ({token, user}) {
        user && (token.user = user)
        return token
      },
  
      async session({session, token}) {
        session  =token.user;
        return session
      }
    }  
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };