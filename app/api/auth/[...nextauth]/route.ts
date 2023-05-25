import { options } from "@/options";
import NextAuth from "next-auth";

const handler:any = NextAuth(options)
export {handler as GET , handler as POST}
