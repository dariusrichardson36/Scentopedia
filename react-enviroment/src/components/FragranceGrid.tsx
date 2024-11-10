// src/components/FragranceGrid.tsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FragranceCard from './FragranceCard';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria } from '../types/types';

type FragranceGridProps = {
  filterCriteria: FilterCriteria;
  nameQuery: string;
};

const FragranceGrid: React.FC<FragranceGridProps> = ({ filterCriteria, nameQuery }) => {
  const { fragrances, loading } = useFragrances();

  if (loading) return <p>Loading fragrances...</p>;

  const filteredFragrances = fragrances.filter(f => {
    const matchesName = f.fragranceName?.toLowerCase().includes(nameQuery.toLowerCase()) ?? true;
    return (
      matchesName &&
      (filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '')) &&
      (filterCriteria.perfumers.length === 0 || filterCriteria.perfumers.includes(f.perfumer || '')) &&
      (filterCriteria.notes.length === 0 || filterCriteria.notes.some(note => 
        (f.combNotes || []).includes(note)
      )) &&
      (filterCriteria.accords.length === 0 || filterCriteria.accords.every(accord => f.accords?.includes(accord)))
    );
  });

  return (
    <Row className="gx-4 gy-4" style={{ alignItems: 'stretch' }}>
      {filteredFragrances.map((fragrance, index) => (
        <Col key={index} sm={6} md={4} lg={3} className="d-flex">
          <FragranceCard
            imageUrl={fragrance.image || 'placeholder.jpg'}
            fragranceName={fragrance.fragranceName || 'Unknown'}
            brand={fragrance.brandName || 'Unknown'}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FragranceGrid;
