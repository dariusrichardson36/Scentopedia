import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import FragranceCard from './FragranceCard';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria } from '../types/types';

const FragranceGrid: React.FC<{ filterCriteria: FilterCriteria }> = ({ filterCriteria }) => {
  const { fragrances, loading } = useFragrances();

  if (loading) return <p>Loading fragrances...</p>;

  const filteredFragrances = fragrances.filter(f => {
    return (
      (filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '')) &&
      (filterCriteria.perfumers.length === 0 || filterCriteria.perfumers.includes(f.perfumer || '')) &&
      (filterCriteria.notes.length === 0 || filterCriteria.notes.some(note => (f.notes?.base_notes || []).includes(note) || (f.notes?.middle_notes || []).includes(note) || (f.notes?.top_notes || []).includes(note))) &&
      (filterCriteria.accords.length === 0 || filterCriteria.accords.some(accord => f.accords?.includes(accord)))
    );
  });

  return (
    <Row>
      {filteredFragrances.map((fragrance, index) => (
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
