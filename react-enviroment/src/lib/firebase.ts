// src/lib/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration object containing API keys and project identifiers.
const firebaseConfig = {
    apiKey: "AIzaSyB2gistUGA6Z3wT32Dt7oZF5BP4-sBQcR0",
    authDomain: "scentopedia-ab22e.firebaseapp.com",
    projectId: "scentopedia-ab22e",
    storageBucket: "scentopedia-ab22e.firebasestorage.app",
    messagingSenderId: "295858152820",
    appId: "1:295858152820:web:70c7f452941191264cf821"
};

// Initialize Firebase app using the provided configuration.
const app = initializeApp(firebaseConfig);

// Initialize Firebase services: Authentication, Firestore Database, and Storage.
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

/*
Documentation Summary:
- This module initializes the Firebase app using the provided configuration (`firebaseConfig`).
- It exports the following Firebase services for use throughout the application:
  1. `auth`: Firebase Authentication service (`getAuth`) - Used for user authentication and related functionalities.
  2. `db`: Firestore Database service (`getFirestore`) - Used to store and retrieve structured data.
  3. `storage`: Firebase Storage service (`getStorage`) - Used to store and manage user-generated content such as images.
*/