// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBq6ZH9gGfK5Dku5fCk9b7T3lRHcPqOmMY",
  authDomain: "herb-aurora.firebaseapp.com",
  projectId: "herb-aurora",
  storageBucket: "herb-aurora.firebasestorage.app",
  messagingSenderId: "430573425836",
  appId: "1:430573425836:web:8255b9314c3b6d77b0bb09",
  measurementId: "G-V45YT71LVZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, RecaptchaVerifier, db };
