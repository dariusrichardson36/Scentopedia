// src/components/FragranceGrid.tsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FragranceCard from './FragranceCard';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria, FragranceData } from '../types/types';

type FragranceGridProps = {
  filterCriteria: FilterCriteria;
  nameQuery: string;
  currentPage: number;
  itemsPerPage: number;
};

const FragranceGrid: React.FC<FragranceGridProps> = ({ filterCriteria, nameQuery, currentPage, itemsPerPage }) => {
  const { fragrances, loading } = useFragrances();

  if (loading) return <p>Loading fragrances...</p>;

  const filteredFragrances = fragrances.filter(f => {
    const matchesName = f.fragranceName?.toLowerCase().includes(nameQuery.toLowerCase()) ?? true;
    const matchesBrand = filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '');
    const matchesPerfumer = filterCriteria.perfumers.length === 0 || filterCriteria.perfumers.includes(f.perfumer || '');
    const matchesNotes = filterCriteria.notes.length === 0 || filterCriteria.notes.every(note => (f.combNotes || []).includes(note));
    const matchesAccords = filterCriteria.accords.length === 0 || filterCriteria.accords.every(accord => (f.accords || []).includes(accord));

    return matchesName && matchesBrand && matchesPerfumer && matchesNotes && matchesAccords;
  });

  // Determine the items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFragrances = filteredFragrances.slice(startIndex, endIndex);

  return (
    <Row className="gx-4 gy-4" style={{ alignItems: 'stretch' }}>
      {paginatedFragrances.map((fragrance: FragranceData, index) => (
        <Col key={index} sm={6} md={4} lg={3} className="d-flex">
          <FragranceCard fragrance={fragrance} />
        </Col>
      ))}
    </Row>
  );
};

export default FragranceGrid;
