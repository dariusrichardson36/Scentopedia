// src/pages/TestPage.tsx
import React, { useState } from 'react';
import FilteredList from '../components/FilteredList';
import FragranceGrid from '../components/FragranceGrid';
import { FilterCriteria } from '../types/FragranceTypes';

const TestPage: React.FC = () => {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });
  const [nameQuery, setNameQuery] = useState('');

  return (
    <div>
      {/* Pass both onFilterChange and onNameQueryChange props */}
      <FilteredList 
        onFilterChange={setFilterCriteria}
        onNameQueryChange={setNameQuery}
      />
      <FragranceGrid filterCriteria={filterCriteria} nameQuery={nameQuery} />
    </div>
  );
};

export default TestPage;
