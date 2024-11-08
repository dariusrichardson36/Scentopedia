// src/components/FragranceGrid.tsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Fuse from 'fuse.js';
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

  // Initialize Fuse for fuzzy searching on fragrance names
  const fuse = new Fuse(fragrances, {
    keys: ['fragranceName'],
    threshold: 0.3,
    distance: 100,
  });

  // Apply fuzzy search if there's a nameQuery; otherwise, use all fragrances
  const fuzzyResults = nameQuery ? fuse.search(nameQuery).map(result => result.item) : fragrances;

  // Enhanced filtering logic for brands (OR) and notes/accords (AND)
  const filteredFragrances = fuzzyResults.filter(f => {
    // Brand filtering (OR): match if brandName is in selected brands, or no brands are selected
    const matchesBrand = filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '');

    // Notes filtering (AND): only show if fragrance has all selected notes in combNotes
    const matchesNotes =
      filterCriteria.notes.length === 0 ||
      filterCriteria.notes.every(note => f.combNotes?.includes(note));

    // Accords filtering (AND): only show if fragrance has all selected accords
    const matchesAccords =
      filterCriteria.accords.length === 0 ||
      filterCriteria.accords.every(accord => f.accords?.includes(accord));

    return matchesBrand && matchesNotes && matchesAccords;
  });

  return (
    <Row>
      {filteredFragrances.map((fragrance, index) => (
        <Col key={index} sm={6} md={4} lg={3} className="mb-4">
          <FragranceCard
            imageUrl={fragrance.image || 'placeholder.jpg'}
            fragranceName={fragrance.fragranceName || 'Unknown'}
            brand={fragrance.brandName || 'Unknown'}
            onImageClick={() => console.log(`Clicked on ${fragrance.fragranceName}`)}
            onBrandClick={() => console.log(`Clicked on ${fragrance.brandName}`)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FragranceGrid;
