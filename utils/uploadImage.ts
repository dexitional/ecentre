import { ID, storage } from "@/appwrite";

const uploadImage = async (file: any) => {
   if(!file) return
   // @ts-ignore
   const fileUploaded = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, ID.unique, file);
   return fileUploaded;
};

export default uploadImage;