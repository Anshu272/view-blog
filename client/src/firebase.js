// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bf855.firebaseapp.com",
  projectId: "mern-blog-bf855",
  storageBucket: "mern-blog-bf855.appspot.com",
  messagingSenderId: "529235985395",
  appId: "1:529235985395:web:e3f523eb2aeb290eb60886"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);