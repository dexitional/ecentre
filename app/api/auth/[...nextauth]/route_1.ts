import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
const { NEXTAUTH_SECRET } = process.env;

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
              if (user) {
                return user
              } else {
                return null
              }
            }
          })
    ],
    secret: NEXTAUTH_SECRET,
    
    // pages: {
    //     signIn: '/'
    // }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }