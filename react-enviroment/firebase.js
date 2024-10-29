// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firestore and export it
const db = getFirestore(app);
export { db };