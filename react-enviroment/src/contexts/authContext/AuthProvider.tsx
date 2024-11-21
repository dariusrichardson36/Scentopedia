//src/contexts/authContext/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore imports

// Define the shape of the context value
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Listen for Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                await handleUserSignIn(firebaseUser); // Handle Firestore document creation
            }
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleUserSignIn = async (user: User) => {
        if (!user.email) return; // Ensure the user has an email

        const userDocRef = doc(db, 'users', user.email); // Firestore document reference
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // Create the user's document if it doesn't exist
            await setDoc(userDocRef, {
                email: user.email,
                username: user.displayName || 'Anonymous',
                profilePicture: user.photoURL || '/assets/default-avatar.png',
                createdAt: serverTimestamp(),
                favorites: [], // Initialize an empty favorites list
                wishlists: {}, // Initialize an empty wishlists object
            });
        }
    };

    const login = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    // Logout function
    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
