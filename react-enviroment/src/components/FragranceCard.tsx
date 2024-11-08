import React from 'react';
import { Card, Button } from 'react-bootstrap';

type FragranceCardProps = {
  imageUrl: string;
  fragranceName: string;
  brand: string;
  onImageClick: () => void;
  onBrandClick: () => void;
};

const FragranceCard: React.FC<FragranceCardProps> = ({ imageUrl, fragranceName, brand, onImageClick, onBrandClick }) => {
  return (
    <Card className="m-3 shadow-md font-title text-center" style={{ width: '18rem' }}>
      {/* Image Button */}
      <Button variant="link" onClick={onImageClick} className="p-0 border-0">
        <Card.Img variant="top" src={imageUrl} alt={fragranceName} />
      </Button>
      <Card.Body>
        {/* Fragrance Name */}
        <Card.Title>{fragranceName}</Card.Title>
        {/* Brand Button */}
        <Button variant="link" onClick={onBrandClick} className="text-black font-body p-0">
          {brand}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FragranceCard;
