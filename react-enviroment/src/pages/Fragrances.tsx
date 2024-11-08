// src/pages/Fragrances.tsx
import React, { useState } from 'react';
import FilteredList from '../components/FilteredList';
import FragranceGrid from '../components/FragranceGrid';
import { FilterCriteria } from '../types/types';

const Fragrances: React.FC = () => {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });
  const [nameQuery, setNameQuery] = useState('');

  return (
    <div className="w-full mx-auto px-4 py-10">
      <h2 className="text-4xl mb-8 font-title text-center">Fragrances</h2>
      
      {/* Flex container for the sidebar and main content */}
      <div className="flex flex-col md:flex-row">
        
        {/* Filter Sidebar */}
        <div className="md:w-1/4 mb-8 md:mb-0 md:mr-8">
          <FilteredList 
            onFilterChange={setFilterCriteria}
            onNameQueryChange={setNameQuery}
          />
        </div>
        
        {/* Fragrance Grid */}
        <div className="md:w-3/4">
          <FragranceGrid filterCriteria={filterCriteria} nameQuery={nameQuery} />
        </div>
      </div>
    </div>
  );
};

export default Fragrances;
