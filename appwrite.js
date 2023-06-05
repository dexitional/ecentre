import { Client, Databases, Account, ID, Storage } from "node-appwrite";

const { NEXT_PUBLIC_APPWRITE_API_KEY , NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID, NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;
export const appwriteClient = new Client()
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(NEXT_PUBLIC_APPWRITE_API_KEY);         //

export const appwriteDB = new Databases(appwriteClient);
export { Account, ID, Storage }

// appwriteDB.listDocuments('645b4e0308de0a08ebc3','[COLLECTION_ID]',
//     [
//         Query.equal('title', ['Avatar', 'Lord of the Rings']),
//         Query.greaterThan('year', 1999)
//     ]
// );

// const page1 = await appwriteDB.listDocuments(
//   APPWRITE_DATABASE_ID,
//   '','voucher'
//   [
//       Query.limit(25),
//       Query.offset(0)
//   ]
// );
