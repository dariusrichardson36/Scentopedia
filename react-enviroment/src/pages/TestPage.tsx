import React from 'react';
import FragranceCard from '../components/FragranceCard';
import FilteredList from '../components/FilteredList';
import fragranceImage from '../placeholders/fragranceImage.jpg';

const TestPage: React.FC = () => {
  const handleImageClick = () => {
    alert('Image clicked!');
  };

  const handleBrandClick = () => {
    alert('Brand clicked!');
  };

  return (
    <div className="container">
      {/* FilteredList Component */}
      <FilteredList />

      {/* FragranceCard Component */}
      <FragranceCard
        imageUrl={fragranceImage}
        name="L'Eau de Parfum"
        brand="Maison Margiela"
        onImageClick={handleImageClick}
        onBrandClick={handleBrandClick}
      />
    </div>
  );
};

export default TestPage;
