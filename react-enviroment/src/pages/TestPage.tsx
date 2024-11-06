import React, { useState } from 'react';
import FilteredList from '../components/FilteredList';
import FragranceGrid from '../components/FragranceGrid';
import { FilterCriteria } from '../types/types';

const TestPage: React.FC = () => {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });

  return (
    <div>
      <FilteredList onFilterChange={setFilterCriteria} />
      <FragranceGrid filterCriteria={filterCriteria} />
    </div>
  );
};

export default TestPage;
