import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4TCf7OAWVuvFnr70FYL05E3GD_3SeXHE",
    authDomain: "ecentre-ab341.firebaseapp.com",
    projectId: "ecentre-ab341",
    storageBucket: "ecentre-ab341.appspot.com",
    messagingSenderId: "465783538568",
    appId: "1:465783538568:web:ef4f101fb72014ffd9b03d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

// Create a storage reference from our storage service

const cvsRef = ref(storage, 'cvs');
const picturesRef = ref(storage, 'pictures');

// id is a unique identifier for the file
export function uploadCv(file: File, serial: string) {
  return uploadBytes(ref(cvsRef, `${serial}.pdf`), file).then((snapshot) => getDownloadURL(snapshot.ref).then(url => url));
}

export function uploadPicture(file: File, serial: string) {
   return uploadBytes(ref(picturesRef, `${serial}.jpg`), file).then((snapshot) => getDownloadURL(snapshot.ref).then(url => url));
}

