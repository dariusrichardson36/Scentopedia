// src/pages/YourListsPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext/AuthProvider';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, arrayRemove, setDoc, serverTimestamp } from 'firebase/firestore';

// Interface for Wishlist data
interface Wishlist {
  [key: string]: string[]; // Each wishlist is an array of fragrance IDs
}

// YourListsPage Component
// This component allows authenticated users to manage their lists of fragrances, including favorites and custom wishlists.
const YourListsPage: React.FC = () => {
  const { user } = useAuth(); // Get current user from authentication context.
  const [favorites, setFavorites] = useState<string[]>([]); // State to store user's favorite fragrances.
  const [wishlists, setWishlists] = useState<Wishlist>({}); // State to store user's wishlists.
  const [newWishlistName, setNewWishlistName] = useState(''); // State for new wishlist name.

  // Fetch user's lists from Firestore when component mounts or when user changes.
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFavorites(userData.favorites || []);
          setWishlists(userData.wishlists || {});
        }
      };
      fetchUserData();
    }
  }, [user]);

  // Add a new wishlist to Firestore.
  const addWishlist = async () => {
    if (!user || !newWishlistName.trim()) return;
    
    const userDocRef = doc(db, 'users', user.email);

    try {
      // Check if the document exists.
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If the document doesn't exist, initialize it with the basic structure and new wishlist.
        await setDoc(userDocRef, {
          email: user.email,
          username: user.displayName || 'Anonymous',
          profilePicture: user.photoURL || '/assets/default-avatar.png',
          createdAt: serverTimestamp(),
          favorites: [],
          wishlists: {
            [newWishlistName]: []
          }
        });
      } else {
        await updateDoc(userDocRef, {
          [`wishlists.${newWishlistName}`]: []
        });
      }

      setWishlists({
        ...wishlists,
        [newWishlistName]: []
      });
      setNewWishlistName('');

    } catch (error) {
      console.error("Error creating/updating wishlist:", error);
    }
  };

  // Remove fragrance from Favorites.
  const removeFromFavorites = async (fragranceId: string) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.email);
    await updateDoc(userDocRef, {
      favorites: arrayRemove(fragranceId)
    });
    setFavorites(favorites.filter(id => id !== fragranceId));
  };

  // Remove fragrance from a wishlist.
  const removeFromWishlist = async (wishlistName: string, fragranceId: string) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.email);
    const updatedWishlist = wishlists[wishlistName].filter(id => id !== fragranceId);
    const updatedWishlists = { ...wishlists, [wishlistName]: updatedWishlist };

    await updateDoc(userDocRef, { wishlists: updatedWishlists });
    setWishlists(updatedWishlists);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Your Lists</h1>

      {/* Favorites Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Favorites</h2>
        <ul className="bg-gray-100 p-4 rounded-lg shadow-md">
          {favorites.length === 0 ? (
            <p>No fragrances in Favorites.</p>
          ) : (
            favorites.map((fragranceId, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{fragranceId}</span>
                <button
                  onClick={() => removeFromFavorites(fragranceId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Wishlists Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Wishlists</h2>
        <div className="mb-4">
          {Object.keys(wishlists).map((wishlistName) => (
            <div key={wishlistName} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{wishlistName}</h3>
              <ul className="bg-gray-100 p-4 rounded-lg shadow-md">
                {wishlists[wishlistName].length === 0 ? (
                  <p>No fragrances in this wishlist.</p>
                ) : (
                  wishlists[wishlistName].map((fragranceId, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                      <span>{fragranceId}</span>
                      <button
                        onClick={() => removeFromWishlist(wishlistName, fragranceId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Create New Wishlist */}
        <div className="mt-4">
          <input
            type="text"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            placeholder="New Wishlist Name"
            className="mr-2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addWishlist}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Create Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourListsPage;

/*
Documentation Summary:
- `YourListsPage` is a React functional component that allows users to manage their fragrance lists.
- The component provides functionality to view and remove fragrances from the "Favorites" list and custom wishlists.
- Users can also create new wishlists, which are added to Firestore.
- The component interacts with Firestore for CRUD operations on user's lists, including adding and removing fragrances.
*/