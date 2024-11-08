// src/components/FragranceGrid.tsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Fuse from 'fuse.js';
import FragranceCard from './FragranceCard';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria } from '../types/types';

type FragranceGridProps = {
  filterCriteria: FilterCriteria;
  nameQuery: string;  // Add nameQuery to props
};

const FragranceGrid: React.FC<FragranceGridProps> = ({ filterCriteria, nameQuery }) => {
  const { fragrances, loading } = useFragrances();

  if (loading) return <p>Loading fragrances...</p>;

  // Initialize Fuse for fuzzy searching on fragrance names
  const fuse = new Fuse(fragrances, {
    keys: ['fragranceName'],
    threshold: 0.3,  // Adjust the threshold for more or less fuzziness
    distance: 100
  });

  // Apply fuzzy search if there's a nameQuery; otherwise, use all fragrances
  const fuzzyResults = nameQuery ? fuse.search(nameQuery).map(result => result.item) : fragrances;

  // Filter based on the combined criteria and fuzzy name search results
  const filteredFragrances = fuzzyResults.filter(f => {
    return (
      (filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '')) &&
      (filterCriteria.perfumers.length === 0 || filterCriteria.perfumers.includes(f.perfumer || '')) &&
      (filterCriteria.notes.length === 0 || filterCriteria.notes.some(note => 
        (f.notes?.base_notes || []).includes(note) || 
        (f.notes?.middle_notes || []).includes(note) || 
        (f.notes?.top_notes || []).includes(note)
      )) &&
      (filterCriteria.accords.length === 0 || filterCriteria.accords.some(accord => f.accords?.includes(accord)))
    );
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
