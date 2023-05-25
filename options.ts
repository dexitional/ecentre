import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getVoucher } from "./utils/serverApi";
export const options: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET
    },
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Nomination Voucher",
        credentials: {
          serial: { label: "SERIAL", type: "text"  },
          pin:    { label: "PIN", type: "password" },
        },
        async authorize(credentials) {
          const { serial, pin }: any = credentials;
          const resp = await getVoucher(serial,pin);
          console.log(resp)
          if(resp.total > 0){
             const user:any = resp.documents[0];
             return user
          }
          return null
        },
      }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            return session;
        },
    },
    pages:{
      signIn:'/'
    }
  };