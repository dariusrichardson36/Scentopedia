// src/components/FragranceCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FragranceData } from '../types/types';

type FragranceCardProps = {
  fragrance: FragranceData;
};

const FragranceCard: React.FC<FragranceCardProps> = ({ fragrance }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/fragrance/${fragrance.fragranceName}`); // Use document ID (fragranceName) for routing
  };

  return (
    <Card className="m-3 shadow-md font-title text-center" style={{ width: '18rem' }}>
      {/* Image Button */}
      <Button variant="link" onClick={handleImageClick} className="p-0 border-0">
        <Card.Img variant="top" src={fragrance.image || '/placeholder.jpg'} alt={fragrance.fragranceName} />
      </Button>
      <Card.Body>
        {/* Fragrance Name */}
        <Card.Title>{fragrance.fragranceName}</Card.Title>
        {/* Brand */}
        <p>{fragrance.brandName}</p>
      </Card.Body>
    </Card>
  );
};

export default FragranceCard;
