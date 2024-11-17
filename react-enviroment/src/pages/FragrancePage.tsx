// src/pages/FragrancePage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/AuthProvider';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import useFragrances from '../hooks/useFragrances';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';

// FragrancePage Component
// This component renders detailed information about a specific fragrance and allows users to add it to their wishlists or favorites.
const FragrancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get fragrance ID from URL params.
  const { fragrances } = useFragrances(); // Get all fragrances using the custom hook.
  const { user } = useAuth(); // Get user information from authentication context.
  const [loading, setLoading] = useState(false); // State for managing loading state when updating wishlists.
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility.
  const [wishlists, setWishlists] = useState<{ [key: string]: string[] }>({}); // State to store user's wishlists.
  const [selectedWishlists, setSelectedWishlists] = useState<{ [key: string]: boolean }>({}); // State for selected wishlists.

  // Find fragrance by document ID.
  const fragrance = fragrances.find((f) => f.fragranceName === id);

  // Fetch user's wishlists from Firestore.
  useEffect(() => {
    const fetchWishlists = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setWishlists(userData.wishlists || {});
        }
      }
    };

    fetchWishlists();
  }, [user]);

  if (!fragrance) {
    return <p>Fragrance not found</p>;
  }

  // Toggle modal visibility.
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedWishlists({}); // Clear selection on close.
  };

  // Handle changes in wishlist checkboxes.
  const handleCheckboxChange = (wishlistName: string) => {
    setSelectedWishlists((prev) => ({
      ...prev,
      [wishlistName]: !prev[wishlistName],
    }));
  };

  // Add fragrance to selected wishlists.
  const addToWishlists = async () => {
    if (!user || !id) return;
    setLoading(true);

    const userDocRef = doc(db, 'users', user.email);

    try {
      // Update each selected wishlist.
      for (const wishlistName in selectedWishlists) {
        if (selectedWishlists[wishlistName]) {
          await updateDoc(userDocRef, {
            [`wishlists.${wishlistName}`]: arrayUnion(id),
          });
        }
      }
      alert("Added to selected wishlists");
    } catch (error) {
      console.error("Error adding to wishlists:", error);
    } finally {
      setLoading(false);
      handleModalClose();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-3xl font-title">{fragrance.fragranceName}</h2>
      <p>{fragrance.description}</p>
      <img src={fragrance.image} alt={fragrance.fragranceName} />

      {/* Add to Favorites and Wishlist Buttons */}
      {user && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
            sx={{ mt: 4, mr: 2 }}
          >
            Add to Wishlist
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={async () => {
              setLoading(true);
              try {
                await updateDoc(doc(db, 'users', user.email), {
                  favorites: arrayUnion(id),
                });
                alert("Added to Favorites");
              } catch (error) {
                console.error("Error adding to favorites:", error);
              } finally {
                setLoading(false);
              }
            }}
            sx={{ mt: 4 }}
          >
            Add to Favorites
          </Button>
        </>
      )}

      {/* Modal for Selecting Wishlists */}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Select Wishlists</DialogTitle>
        <DialogContent>
          {Object.keys(wishlists).length === 0 ? (
            <p>No wishlists found. Create one first.</p>
          ) : (
            Object.keys(wishlists).map((wishlistName) => (
              <FormControlLabel
                key={wishlistName}
                control={
                  <Checkbox
                    checked={!!selectedWishlists[wishlistName]}
                    onChange={() => handleCheckboxChange(wishlistName)}
                    color="primary"
                  />
                }
                label={wishlistName}
              />
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addToWishlists} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add to List'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FragrancePage;

/*
Documentation Summary:
- `FragrancePage` is a React functional component that displays detailed information about a specific fragrance.
- It allows authenticated users to add the fragrance to their wishlists or mark it as a favorite.
- The component uses the `useParams` hook to get the fragrance ID from the URL and `useAuth` to get the current user.
- It also uses `useFragrances` to retrieve fragrance data and interacts with Firestore to update user-specific data.
- Key features include a modal dialog for selecting wishlists and buttons for adding fragrances to wishlists or favorites.
- Loading states and error handling are implemented to provide feedback during async operations.
*/
