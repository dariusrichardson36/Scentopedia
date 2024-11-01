import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB2gistUGA6Z3wT32Dt7oZF5BP4-sBQcR0",
    authDomain: "scentopedia-ab22e.firebaseapp.com",
    projectId: "scentopedia-ab22e",
    storageBucket: "scentopedia-ab22e.firebasestorage.app",
    messagingSenderId: "295858152820",
    appId: "1:295858152820:web:70c7f452941191264cf821"
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
