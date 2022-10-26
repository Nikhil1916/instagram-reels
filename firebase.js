// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyACUdAR67uVN-3rXo8dD1jEn0IL7NAlBAU",
  authDomain: "rels-c731c.firebaseapp.com",
  projectId: "rels-c731c",
  storageBucket: "rels-c731c.appspot.com",
  messagingSenderId: "1054067543744",
  appId: "1:1054067543744:web:af0ddc8fec2312f3b0e725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, storage };