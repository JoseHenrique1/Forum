import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
      
        async authorize(credentials, req) {
          const user1 = {user:{ id: "1", name: "J Smith", email: "jsmith@example.com" }}
          if (user1) {
              return user1
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