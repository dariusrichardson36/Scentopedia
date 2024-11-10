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

    // Brand filtering (OR logic)
    const matchesBrand = 
      filterCriteria.brands.length === 0 || 
      filterCriteria.brands.includes(f.brandName || '');

    // Perfumer filtering (OR logic)
    const matchesPerfumer = 
      filterCriteria.perfumers.length === 0 || 
      filterCriteria.perfumers.includes(f.perfumer || '');

    // Notes filtering (AND logic)
    const matchesNotes = 
      filterCriteria.notes.length === 0 || 
      filterCriteria.notes.every(note => (f.combNotes || []).includes(note));

    // Accords filtering (AND logic)
    const matchesAccords = 
      filterCriteria.accords.length === 0 || 
      filterCriteria.accords.every(accord => (f.accords || []).includes(accord));

    // Combine all filters
    return matchesName && matchesBrand && matchesPerfumer && matchesNotes && matchesAccords;
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
