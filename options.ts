import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getVoucher, verifyAdmin } from "./utils/serverApi";
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
          if(resp.total > 0){
             const user:any = resp?.documents[0];
             return { ...user, gid: 1 }
          } else { 
            throw new Error("Invalid details")
          }
        },   
      }),

      CredentialsProvider({
        id: "adminsignin",
        name: "Administrator Signin",
        credentials: {
          username: { label: "STAFF NUMBER", type: "text"  },
          password:    { label: "PASSWORD", type: "password" },
        },
        async authorize(credentials) {
          const { username, password }: any = credentials;
          if(!username) throw new Error("Username field empty !")
          if(!password) throw new Error("Password field empty !")
          
          const resp = await verifyAdmin(username,password);
          if(resp.total > 0){
             const user:any = resp.documents[0];
             return { ...user, gid: 2 }
          } else {
             throw new Error("Invalid details")
          }
        },   
      }),
    ],

    callbacks: {
        async jwt({ token, user, profile, account }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.user = { ...token };
            return session;
        },
    },
    
    pages:{
      signIn:'/'
    }
  };