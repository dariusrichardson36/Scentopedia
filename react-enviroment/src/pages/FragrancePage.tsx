// src/pages/FragrancePage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/AuthProvider'; // Import useAuth
import { db } from '../lib/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import useFragrances from '../hooks/useFragrances';
import { Button } from '@mui/material';

const FragrancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fragrances } = useFragrances();
  const { user } = useAuth(); // Get user from auth context
  const [loading, setLoading] = useState(false);

  // Find fragrance by document ID instead of fragranceName
  const fragrance = fragrances.find((f) => f.fragranceName === id);

  if (!fragrance) {
    return <p>Fragrance not found</p>;
  }

  // Function to add fragrance to favorites
  const addToFavorites = async () => {
    if (!user || !id) return; // Check if user is logged in and fragrance ID is valid
    setLoading(true);
    const userDocRef = doc(db, 'users', user.email); // Reference to the user's document in Firestore
    try {
      await updateDoc(userDocRef, {
        favorites: arrayUnion(id), // Use arrayUnion to avoid duplicates
      });
      alert("Added to Favorites");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-3xl font-title">{fragrance.fragranceName}</h2>
      <p>{fragrance.description}</p>
      <img src={fragrance.image} alt={fragrance.fragranceName} />

      {/* Add to Favorites Button */}
      {user && (
        <Button
          variant="contained"
          color="primary"
          onClick={addToFavorites}
          disabled={loading}
          sx={{ mt: 4 }}
        >
          {loading ? 'Adding...' : 'Add to Favorites'}
        </Button>
      )}
    </div>
  );
};

export default FragrancePage;
