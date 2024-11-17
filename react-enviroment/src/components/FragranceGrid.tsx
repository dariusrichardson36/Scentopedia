// src/components/FragranceGrid.tsx

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FragranceCard from './FragranceCard';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria, FragranceData } from '../types/types';

// Define the props type for the FragranceGrid component.
// - filterCriteria: The criteria used to filter fragrances (e.g., brand, perfumer, notes, accords).
// - nameQuery: The search query for filtering by fragrance name.
// - currentPage: The current page number used for pagination.
// - itemsPerPage: The number of items to display per page.
type FragranceGridProps = {
  filterCriteria: FilterCriteria;
  nameQuery: string;
  currentPage: number;
  itemsPerPage: number;
};

// FragranceGrid Component
// This component is responsible for displaying a grid of fragrance cards that match the given filter criteria and search query.
// It also implements pagination to determine which items to display on the current page.
// Props:
// - filterCriteria: The filtering criteria to determine which fragrances to display.
// - nameQuery: The search query used to filter fragrances by their name.
// - currentPage: The current page for pagination purposes.
// - itemsPerPage: The number of fragrance cards to display per page.
const FragranceGrid: React.FC<FragranceGridProps> = ({ filterCriteria, nameQuery, currentPage, itemsPerPage }) => {
  // useFragrances hook provides the fragrances data and the loading state.
  const { fragrances, loading } = useFragrances();

  // Display loading message while data is being fetched.
  if (loading) return <p>Loading fragrances...</p>;

  // Filter the fragrances based on the filter criteria and search query.
  const filteredFragrances = fragrances.filter(f => {
    const matchesName = f.fragranceName?.toLowerCase().includes(nameQuery.toLowerCase()) ?? true;
    const matchesBrand = filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '');
    const matchesPerfumer = filterCriteria.perfumers.length === 0 || filterCriteria.perfumers.includes(f.perfumer || '');
    const matchesNotes = filterCriteria.notes.length === 0 || filterCriteria.notes.every(note => (f.combNotes || []).includes(note));
    const matchesAccords = filterCriteria.accords.length === 0 || filterCriteria.accords.every(accord => (f.accords || []).includes(accord));

    return matchesName && matchesBrand && matchesPerfumer && matchesNotes && matchesAccords;
  });

  // Determine the items to display for the current page.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFragrances = filteredFragrances.slice(startIndex, endIndex);

  // Render the grid of fragrance cards using Bootstrap's Row and Col components.
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

/*
Documentation Summary:
- This component displays a grid of fragrance cards based on the provided filter criteria and search query.
- It uses the `useFragrances` hook to get the fragrance data and manages loading states.
- The fragrances are filtered based on brand, perfumer, notes, accords, and the search query for fragrance names.
- Pagination is implemented to control the number of items displayed per page.
- Bootstrap's `Row` and `Col` components are used to create a responsive grid layout.
*/
