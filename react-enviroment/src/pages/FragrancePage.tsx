// src/pages/FragrancePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/AuthProvider';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import useFragrances from '../hooks/useFragrances';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';

const FragrancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fragrances } = useFragrances();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [wishlists, setWishlists] = useState<{ [key: string]: string[] }>({});
  const [selectedWishlists, setSelectedWishlists] = useState<{ [key: string]: boolean }>({});

  // Find fragrance by document ID
  const fragrance = fragrances.find((f) => f.fragranceName === id);

  useEffect(() => {
    // Fetch user's wishlists from Firestore
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

  // Toggle modal
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedWishlists({}); // Clear selection on close
  };

  // Handle checkbox changes
  const handleCheckboxChange = (wishlistName: string) => {
    setSelectedWishlists((prev) => ({
      ...prev,
      [wishlistName]: !prev[wishlistName],
    }));
  };

  // Add to selected wishlists
  const addToWishlists = async () => {
    if (!user || !id) return;
    setLoading(true);

    const userDocRef = doc(db, 'users', user.email);

    try {
      // Update each selected wishlist
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

      {/* Add to Favorites Button */}
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