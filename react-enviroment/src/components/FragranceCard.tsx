// src/components/FragranceCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type FragranceCardProps = {
  imageUrl: string;
  fragranceName: string;
  brand: string;
};

const FragranceCard: React.FC<FragranceCardProps> = ({ imageUrl, fragranceName, brand }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/fragrance/${fragranceName}`); // Use document ID (fragranceName) for routing
  };

  return (
    <Card className="m-3 shadow-md font-title text-center" style={{ width: '18rem' }}>
      {/* Image Button */}
      <Button variant="link" onClick={handleImageClick} className="p-0 border-0">
        <Card.Img variant="top" src={imageUrl} alt={fragranceName} />
      </Button>
      <Card.Body>
        {/* Fragrance Name */}
        <Card.Title>{fragranceName}</Card.Title>
        {/* Brand */}
        <p>{brand}</p>
      </Card.Body>
    </Card>
  );
};

export default FragranceCard;
