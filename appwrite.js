import { Client, Databases } from "node-appwrite";

const { APPWRITE_API_KEY , APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID } = process.env;
export const appwriteClient = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);         //

export const appwriteDB = new Databases(appwriteClient);

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
