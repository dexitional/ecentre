import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
const { NEXTAUTH_SECRET } = process.env;

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'voucher',
            name: "Voucher",
            credentials: {
              serial: { label: "Serial", type: "text" },
              pin: { label: "Pin", type: "text" },
            },
            authorize(credentials,req) {
              // Connect to BD to authenticate
              const user = { id: "1", serial: "abcdefgh", pin: "1234", name: "J Smith", email: "jsmith@example.com" }
              if (user) {
                return user
              } else {
                return null
              }
            }
        })
    ],

    // pages: {
    //    signIn: '/'
    // },

    // callbacks: {
    //     jwt: async ({ token, user }: any) => {
    //         user && (token.user = user)
    //         return token
    //     },
    //     session: async ({ session, token }: any) => {
    //         const user = token.user
    //         session.user = user
    //         return session
    //     }
    // },
    secret: NEXTAUTH_SECRET
}

// @ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }