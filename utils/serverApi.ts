import { appwriteDB as db } from "@/appwrite"
import { Query } from 'node-appwrite'
const { APPWRITE_DATABASE_ID } = process.env;


export const getVoucher = async (serial:FormDataEntryValue, pin:FormDataEntryValue) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b', [
        Query.equal("serial", serial.toString()),
        Query.equal("pin", pin.toString()),
    ])
    return res;
}


