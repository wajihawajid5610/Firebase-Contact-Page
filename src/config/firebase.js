// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD95uXDEq7RccuN0pr6mN0cAEbRzbAiNCA",
  authDomain: "react-contact-31728.firebaseapp.com",
  projectId: "react-contact-31728",
  storageBucket: "react-contact-31728.appspot.com",
  messagingSenderId: "692742578219",
  appId: "1:692742578219:web:77f7424205a24da00f0a6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app); 
