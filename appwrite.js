import { Client, Databases, Account, ID, Storage } from "node-appwrite";

const { NEXT_PUBLIC_APPWRITE_API_KEY , NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID, NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;
const appwriteClient = new Client()
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(NEXT_PUBLIC_APPWRITE_API_KEY);  

const appwriteDB = new Databases(appwriteClient);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, appwriteDB, storage, ID }

