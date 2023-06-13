// Import the functions you need from the SDKs you need
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
export function uploadCv(file: File, id: string) {
    // TODO: picture extension
    return uploadBytes(ref(cvsRef, `${id}.pdf`), file).then((snapshot) => {
        console.log('Uploaded a cv!',snapshot);
    });
}

export function uploadPicture(file: File, id: string) {
    return uploadBytes(ref(picturesRef,  `${id}.jpg`), file).then((snapshot) => {
        console.log('Uploaded a picture!');
    });
}

export function downloadPicture(id: string) {
    getDownloadURL(ref(picturesRef,  `${id}.jpg`)).then((url) => {
        // TODO: download picture from $url
    });
}

export function downloadCv(id: string) {
    getDownloadURL(ref(cvsRef, `${id}.pdf`)).then((url) => {
        // TODO: download cv from $url
    })
}