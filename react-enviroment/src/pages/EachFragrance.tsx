// src/pages/EachFragrance.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useFragrances from '../hooks/useFragrances';

const EachFragrance: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fragrances } = useFragrances();

  // Find fragrance by document ID instead of fragranceName
  const fragrance = fragrances.find((f) => f.fragranceName === id);

  if (!fragrance) {
    return <p>Fragrance not found</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-3xl font-title">{fragrance.fragranceName}</h2>
      <p>{fragrance.description}</p>
      <img src={fragrance.image} alt={fragrance.fragranceName} />
    </div>
  );
};

export default EachFragrance;
