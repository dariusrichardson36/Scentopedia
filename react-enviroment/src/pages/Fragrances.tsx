// src/pages/Fragrances.tsx
import React, { useState } from 'react';
import FilteredList from '../components/FilteredList';
import FragranceGrid from '../components/FragranceGrid';
import { FilterCriteria } from '../types/types';
import Pagination from 'react-bootstrap/Pagination';
import useFragrances from '../hooks/useFragrances';

const Fragrances: React.FC = () => {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });
  const [nameQuery, setNameQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { fragrances, loading } = useFragrances();

  // Filter fragrances based on the filter criteria and name query
  const filteredFragrances = fragrances.filter(f => {
    const matchesName = f.fragranceName?.toLowerCase().includes(nameQuery.toLowerCase()) ?? true;
    const matchesBrand = filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '');
    const matchesPerfumer = filterCriteria.perfumers.length === 0 || filterCriteria.perfumers.includes(f.perfumer || '');
    const matchesNotes = filterCriteria.notes.length === 0 || filterCriteria.notes.every(note => (f.combNotes || []).includes(note));
    const matchesAccords = filterCriteria.accords.length === 0 || filterCriteria.accords.every(accord => (f.accords || []).includes(accord));

    return matchesName && matchesBrand && matchesPerfumer && matchesNotes && matchesAccords;
  });

  const totalFilteredItems = filteredFragrances.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const handleFilterChange = (criteria: FilterCriteria) => {
    setFilterCriteria(criteria);
    setCurrentPage(1);  // Reset to the first page when filters are changed
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full mx-auto px-4 py-10">
      <h2 className="text-4xl mb-8 font-title text-center">Fragrances</h2>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-8 md:mb-0 md:mr-8">
          <FilteredList 
            onFilterChange={handleFilterChange} // Modified handler to reset pagination
            onNameQueryChange={setNameQuery}
          />
        </div>
        
        <div className="md:w-3/4">
          <FragranceGrid 
            filterCriteria={filterCriteria} 
            nameQuery={nameQuery} 
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />

          {/* Pagination Controls */}
          <Pagination className="mt-4 justify-content-center">
            <Pagination.Prev
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Pagination.Prev>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Pagination.Next>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Fragrances;
