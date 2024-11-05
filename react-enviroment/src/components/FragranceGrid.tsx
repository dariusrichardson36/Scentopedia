// src/components/FragranceGrid.tsx

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FragranceCard from './FragranceCard';
import useFragrances from '../hooks/useFragrances';

const FragranceGrid: React.FC = () => {
  const { fragrances, loading } = useFragrances();

  if (loading) return <p>Loading fragrances...</p>;

  return (
    <Row>
      {fragrances.map((fragrance, index) => (
        <Col key={index} sm={6} md={4} lg={3} className="mb-4">
          <FragranceCard
            imageUrl={fragrance.image || 'placeholder.jpg'}
            name={fragrance.name || 'Unknown'}
            brand={fragrance.brandName || 'Unknown'}
            onImageClick={() => console.log(`Clicked on ${fragrance.name}`)}
            onBrandClick={() => console.log(`Clicked on ${fragrance.brandName}`)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FragranceGrid;
