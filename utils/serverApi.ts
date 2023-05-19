import { appwriteDB as db } from "@/appwrite"
import { Query,ID } from 'node-appwrite'
const { APPWRITE_DATABASE_ID } = process.env;


export const getVoucher = async (serial:FormDataEntryValue, pin:FormDataEntryValue) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b', [
        Query.equal("serial", serial.toString()),
        Query.equal("pin", pin.toString()),
    ])
    return res;
}


// Nominees Queries
export const fetchNominees = async () => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

export const fetchNominee = async (serial: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b', [
        Query.equal("voucher", serial.toString()),
    ])
    return res;
}

export const postNominee = async (body: object) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}


export const updateNominee = async (serial: string, body: object) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b', [
        Query.equal("serial", serial.toString()),
    ])
    return res;
}

export const deleteNominee = async (serial: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b', [
        Query.equal("serial", serial.toString()),
    ])
    return res;
}


// Helper Queries
export const fetchPositions = async () => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

// Voter Register Queries
export const fetchRegister = async (id: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

// Vetting Queries
export const fetchVettingResult = async (id: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

// SMS System Queries
export const fetchSmsAccount = async (id: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

export const fetchSmsHistory = async (id: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

export const fetchSmsTopup = async (id: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

export const fetchSmsGroup = async (id: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}

export const fetchSmsSenderId = async (id: string) => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'645b562c59f8241f270b')
    return res;
}



// SETUP COLLECTIONS

export const setupCourses = async (data: any) => {
  try{
//    const md = await Promise.all(data.map( async (row:any, i: number) => {
//         const res = await db.createDocument(APPWRITE_DATABASE_ID!,'64663cd32e2f15fae96e', ID.unique(), row );
//         console.log(`count: ${(i+1)} out of  ${data.length}`)
//    }))
    let count = 0;
    for(const row of data) {
        const res = await db.createDocument(APPWRITE_DATABASE_ID!,'64673f52adb0b86585fd', ID.unique(), row );
        count++;
        console.log(`count: ${count} out of  ${data.length}`)
    }  return count;
  } catch(e){
    console.log(e)
    return null
  }
}


export const setupVenues = async (data: any) => {
    try{
     const md = await Promise.all(data.map( async (row:any, i: number) => {
        const res = await db.createDocument(APPWRITE_DATABASE_ID!,'6464de98857b29c0ab93', ID.unique(), row );
        console.log(`count: ${(i+1)} out of  ${data.length}`)
     }))
     return md;
    } catch(e){
      console.log(e)
      return null
    }
  }
  


export const fetchTest = async () => {
    const res = await db.listDocuments(APPWRITE_DATABASE_ID!,'64673f52adb0b86585fd',[
        //Query.equal("$id",'646638ae631e9896529f'),
        Query.equal("code",'INF399D'),
    ])
    return res;
}


