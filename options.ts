import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { fetchUserByEmail, fetchUsers, getVoucher } from "./utils/serverApi";
export const options: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      }),

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
        async signIn({ account, profile }: any) {
          if (account?.provider === "google") {
           return profile?.email_verified && profile?.email.endsWith("@ucc.edu.gh")
          }
          return true // Do different verification for other providers that don't have `email_verified`
        },
    },
    
    pages:{
      signIn:'/'
    }
  };