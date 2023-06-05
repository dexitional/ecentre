import { ID, storage } from '@/config/appwrite';

const uploadImage = async (file: File) => {
   if(!file) return

   // @ts-ignore
   const fileUploaded = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, ID.unique, file);
   return fileUploaded;
};

export default uploadImage;