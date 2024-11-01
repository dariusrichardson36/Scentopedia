// Import the functions you need from the SDKs you need
// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2gistUGA6Z3wT32Dt7oZF5BP4-sBQcR0",
  authDomain: "scentopedia-ab22e.firebaseapp.com",
  projectId: "scentopedia-ab22e",
  storageBucket: "scentopedia-ab22e.appspot.com",
  messagingSenderId: "295858152820",
  appId: "1:295858152820:web:70c7f452941191264cf821"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
