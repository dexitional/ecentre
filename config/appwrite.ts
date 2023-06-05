import { Client, Databases, Account, ID, Storage } from "appwrite";

const { NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID } = process.env;
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
    
const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID }