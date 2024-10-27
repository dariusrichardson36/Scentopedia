import React from 'react';
import FragranceCard from '../components/FragranceCard';
import fragranceImage from '../placeholders/fragranceImage.jpg';

const TestPage: React.FC = () => {
  const handleImageClick = () => {
    alert('Image clicked!');
  };

  const handleBrandClick = () => {
    alert('Brand clicked!');
  };

  return (
    <FragranceCard
      imageUrl={fragranceImage}
      name="L'Eau de Parfum"
      brand="Maison Margiela"
      onImageClick={handleImageClick}
      onBrandClick={handleBrandClick}
    />
  );
};

export default TestPage;
