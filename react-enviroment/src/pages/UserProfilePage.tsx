import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext/AuthProvider';
import { db, storage } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserProfilePage: React.FC = () => {
  const { user, setProfilePicture, profilePicture } = useAuth(); // Use profilePicture from context
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

  // Fetch the existing user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || '');
        }
      }
    };
    fetchUserData();
  }, [user]);

  // Handle username updates
  const handleUsernameUpdate = async () => {
    if (!user || !newUsername.trim()) return;
    const userDocRef = doc(db, 'users', user.email);
    try {
      await updateDoc(userDocRef, { username: newUsername });
      setUsername(newUsername);
      setNewUsername('');
      alert('Username updated!');
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Failed to update username.');
    }
  };

  // Handle profile picture updates
  const handleProfilePictureUpdate = async () => {
    if (!user || !newProfilePicture) return;
    const storageRef = ref(storage, `profilePictures/${user.email}`);
    try {
      // Upload the new profile picture to Firebase Storage
      await uploadBytes(storageRef, newProfilePicture);
      const downloadURL = await getDownloadURL(storageRef);

      // Update the profilePicture field in Firestore
      const userDocRef = doc(db, 'users', user.email);
      await updateDoc(userDocRef, { profilePicture: downloadURL });

      // Update the profilePicture in context
      setProfilePicture(downloadURL);

      alert('Profile picture updated!');
      setNewProfilePicture(null);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Failed to update profile picture.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div
        className="p-10 rounded-lg shadow-lg text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900/?abstract')" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Your Profile</h1>
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="mb-6">
            <img
              src={profilePicture || '/default-avatar.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-lg"
            />
            <input
              type="file"
              onChange={(e) => setNewProfilePicture(e.target.files ? e.target.files[0] : null)}
              className="mt-4"
            />
            <button
              onClick={handleProfilePictureUpdate}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Update Profile Picture
            </button>
          </div>

          {/* Username */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">Current Username: {username}</p>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              className="mt-2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleUsernameUpdate}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Update Username
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
