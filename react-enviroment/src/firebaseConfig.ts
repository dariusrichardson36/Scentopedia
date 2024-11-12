import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2gistUGA6Z3wT32Dt7oZF5BP4-sBQcR0",
    authDomain: "scentopedia-ab22e.firebaseapp.com",
    projectId: "scentopedia-ab22e",
    storageBucket: "scentopedia-ab22e.firebasestorage.app",
    messagingSenderId: "295858152820",
    appId: "1:295858152820:web:70c7f452941191264cf821"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
