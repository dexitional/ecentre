import { appwriteDB as db } from "@/appwrite"
import { Query, ID } from 'node-appwrite'
import { Queue } from 'async-await-queue';

const mainQueue = new Queue(1, 100);
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID, COLLECTION_VOUCHER, COLLECTION_SESSION, COLLECTION_USER, COLLECTION_APPLICATION, COLLECTION_POSITION,COLLECTION_GROUP } = process.env;

// Voucher Queries
export const getVoucher = async (serial: string, pin: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!, [
      Query.equal("serial", serial.trim()),
      Query.equal("pin", pin.trim()),
    ])
    return res;
}

export const fetchVouchers = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!,
    [
       Query.orderAsc("sessionId"),
       Query.orderAsc("groupId"),
       Query.limit(100)
    ])
    return res;
}

export const fetchVouchersOffset = async (pass: number) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!,
    [
       Query.orderAsc("sessionId"),
       Query.orderAsc("groupId"),
       Query.limit(100),
       //Query.offset(pass)
    ])
    return res;
}

export const fetchVoucherOffsetById = async (groupId: string, pass: number) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!,
    [
       Query.equal("groupId", groupId),
       Query.orderDesc("sessionId"),
       Query.limit(100),
       //Query.offset(pass)
    ])
    return res;
}

export const fetchVoucher = async (serial: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!, [
      Query.equal("serial", serial),
    ])
    return res;
}

export const fetchVoucherById = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!, [
      Query.equal("$id", id),
    ])
    return res;
}

export const fetchVoucherByGroup = async (groupId: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!, [
      Query.equal("groupId", groupId),
    ])
    return res;
}


export const postVoucher = async (body: object) => {
    const res = await db.createDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!, ID.unique(), body);
    return res;
}


export const updateVoucher = async (id: string, body: object) => {
    const res = await db.updateDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_VOUCHER!, id , body)
    return res;
}


// Session Queries
export const fetchSessions = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_SESSION!)
    return res;
}

export const fetchSession = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_SESSION!, [
        Query.equal("$id", id),
    ])
    return res;
}


// Users Queries
export const fetchUsers = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_USER!)
    return res;
}

export const fetchUser = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_USER!, [
        Query.equal("$id", id),
    ])
    return res;
}

export const fetchUserByEmail = async (email: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_USER!, [
        Query.equal("email", email),
    ])
    return res;
}

export const verifyAdmin = async (username: string, password: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_USER!, [
      Query.equal("tag", username),
      Query.equal("password", password),
    ])
    return res;
}




// Nominees Queries
export const fetchNominees = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_APPLICATION!)
    return res;
}

export const fetchNominee = async (serial: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_APPLICATION!, [
        Query.equal("serial", serial),
    ])
    return res;
}

export const fetchNomineeOffset = async (keyword: string, pass: number, limit: number) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_APPLICATION!,
    [
          Query.search("aspirant_regno",keyword),
    //    Query.orderDesc("sessionId"),
    //    Query.orderAsc("groupId"),
    //    Query.orderAsc("positionId"),
       Query.limit(limit),
       Query.offset(pass*limit)
    ])
    return res;
}

export const fetchNomineeOffsetById = async (groupId: string, pass: number) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_APPLICATION!,
    [
       Query.equal("groupId", groupId),
       //Query.orderDesc("sessionId"),
       Query.orderDesc("positionId"),
       Query.limit(100),
       //Query.offset(pass)
    ])
    return res;
}

export const postNominee = async (body: object) => {
    const res = await db.createDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_APPLICATION!, ID.unique(), body);
    return res;
}


export const updateNominee = async (id: string, body: object) => {
    const res = await db.updateDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_APPLICATION!, id , body)
    return res;
}

export const deleteNominee = async (serial: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_APPLICATION!, [
        Query.equal("serial", serial.toString()),
    ])
    return res;
}

// Position Queries
export const fetchPositions = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_POSITION!)
    return res;
}

export const fetchPosition = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_POSITION!, [
       Query.equal("$id", id),
    ])
    return res;
}

// Group Queries

export const fetchGroups = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_GROUP!)
    return res;
}

export const fetchGroup = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_GROUP!, [
        Query.equal("$id", id),
    ])
    return res;
}


// Helper Queries


export const fetchActiveSession = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, COLLECTION_SESSION!,[
        Query.equal("visible", true),
    ])
    return res;
}

export const fetchCgpa = async (tag: string) => {
    try {
       const resp = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}/zeus/getcgpa?tag=${encodeURIComponent(tag)}`)
       const response = await resp.json()
       return response;
      //return '3.5'
    } catch (error) {
      console.log(error)
      return null
    }
}

export const fetchBio = async (tag: string) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}/api/sso/identity?search=${encodeURIComponent(tag)}`)
        const response = await resp.json()
        return response;
    } catch (error) {
        console.log(error)
        return null
    }
}


// Voter Register Queries
export const fetchRegister = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '645b562c59f8241f270b')
    return res;
}

// Vetting Queries
export const fetchVettingResult = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '645b562c59f8241f270b')
    return res;
}

// SMS System Queries
export const fetchSmsAccount = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '645b562c59f8241f270b')
    return res;
}

export const fetchSmsHistory = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '645b562c59f8241f270b')
    return res;
}

export const fetchSmsTopup = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '645b562c59f8241f270b')
    return res;
}

export const fetchSmsGroup = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '645b562c59f8241f270b')
    return res;
}

export const fetchSmsSenderId = async (id: string) => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '645b562c59f8241f270b')
    return res;
}



// SETUP COLLECTIONS

export const setupCourses = async (data: any) => {
    try {
       let count = 0;
        for (const row of data) {
            mainQueue.run(async () => {
                const res = await db.createDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '6467ff2717916c0a710c', ID.unique(), row);
                count++;
                //if (count % 1000 == 0)  await new Promise(resolve => setTimeout(resolve, 1000));
                console.log(`count: ${count} out of  ${data.length}`)
            })
        }   return count;
    } catch (e) {
        console.log(e)
        return null
    }
}


export const setupVenues = async (data: any) => {
    try {

        const locations = new Map()
        const venues = new Map()
        const md = await Promise.all(data.map(async (row: any, i: number) => {
             
             if(!locations.has(row.shorthand)){
                locations.set(row.shorthand, { shorthand: row.shorthand, name: row.location_name })
                const res = await db.createDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '6464dd203db9635d5c5e', ID.unique(), {
                    name: row.location_name,
                    shorthand: row.shorthand
                });
                locations.set(row.shorthand, { shorthand: row.shorthand, name: row.location_name, locationId: res.$id })
             }

             if(!venues.has(row.venue_name)){
                venues.set(row.venue_name, { name: row.venue_name, locationId: null, shorthand: row.shorthand })
             }
        }))

        venues.forEach(async (_,key) => {
             const row = venues.get(key);
             const rowData = { ...row, locationId: locations.get(row.shorthand).locationId }
             delete rowData.shorthand
             console.log(rowData)
             const res1 = await db.createDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '6464de98857b29c0ab93', ID.unique(), rowData);
        })

        return { locations: Object.fromEntries(locations), venues: Object.fromEntries(venues) }
    } catch (e) {
        console.log(e)
        return null
    }
}


export const deleteCourses = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '6467de30d7bdae30a42c')
    for(const row of res.documents){
        console.log(row)
        const m = await db.deleteDocument(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, 'v6467de30d7bdae30a42c', row.$id)
        console.log(m)
    }
    return res;
}



export const fetchTest = async () => {
    const res = await db.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!, '6467de30d7bdae30a42c', [
        //Query.equal("$id",'646638ae631e9896529f'),
        Query.equal("code", 'INF399D'),
    ])
    return res;
}


/*
 
ISSUES
 -- CGPA not working
 -- Lock dropdown Select ( Disabled or set Default value ) - Position, Running Mate
 -- Serial  ( Undefined Check before Insert or Update )
 -- GroupId ( Undefined Check before Insert or Update )
 -- Check Guarantors whether not verfied -- and send again by trigger


 czsjvgwk  || 4902

 
*/