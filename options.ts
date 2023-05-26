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
          if(!serial) throw new Error("Serial field empty !")
          if(!pin) throw new Error("Pin field empty !")
          
          const resp = await getVoucher(serial,pin);
          console.log(resp)
          if(resp.total > 0){
             const user:any = resp.documents[0];
             return user
          }

          throw new Error("Invalid details")
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