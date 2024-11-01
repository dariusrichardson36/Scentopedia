import React, { useState } from 'react';
import FilteredList from '../components/FilteredList';
import FragranceList from '../components/FragranceList';
import { FilterCriteria } from '../types/types';

const TestPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });

  return (
    <div>
      <FilteredList onFilterChange={setFilters} />
      <FragranceList filters={filters} />
    </div>
  );
};

export default TestPage;
