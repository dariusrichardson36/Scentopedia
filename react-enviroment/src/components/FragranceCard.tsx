import React from 'react';
import { Card, Button } from 'react-bootstrap';

type FragranceCardProps = {
  imageUrl: string;
  name: string;
  brand: string;
  onImageClick: () => void;
  onBrandClick: () => void;
};

const FragranceCard: React.FC<FragranceCardProps> = ({ imageUrl, name, brand, onImageClick, onBrandClick }) => {
  return (
    <Card style={{ width: '18rem', textAlign: 'center' }} className="m-3 shadow">
      {/* Image Button */}
      <Button variant="link" onClick={onImageClick} className="p-0 border-0 bg-transparent">
        <Card.Img variant="top" src={imageUrl} alt={name} />
      </Button>
      <Card.Body>
        {/* Fragrance Name */}
        <Card.Title>{name}</Card.Title>
        {/* Brand Button */}
        <Button variant="link" onClick={onBrandClick} className="text-muted p-0">
          {brand}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FragranceCard;
