// src/components/FilteredList.tsx
import React, { useState, useMemo } from 'react';
import { Accordion, ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria } from '../types/types';

const FilterSection: React.FC<{ 
  title: string; 
  items: string[]; 
  selectedItems: string[]; 
  onChange: (item: string) => void; 
  searchQuery: string; 
  onSearchChange: (query: string) => void; 
}> = ({ title, items, selectedItems, onChange, searchQuery, onSearchChange }) => {
  const filteredItems = items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Accordion.Item eventKey={title}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        {/* Search Bar for Filtering Items */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder={`Search ${title}`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
        {/* List of Filtered Items */}
        <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
          {filteredItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Form.Check
                type="checkbox"
                label={item}
                checked={selectedItems.includes(item)}
                onChange={() => onChange(item)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const FilteredList: React.FC<{ onFilterChange: (criteria: FilterCriteria) => void }> = ({ onFilterChange }) => {
  const { fragrances, loading } = useFragrances();
  
  const brands = useMemo(() => [...new Set(fragrances.map(f => f.brandName).filter(Boolean) as string[])], [fragrances]);
  const perfumers = useMemo(() => [...new Set(fragrances.map(f => f.perfumer).filter(Boolean) as string[])], [fragrances]);
  const notes = useMemo(() => [...new Set(fragrances.flatMap(f => f.combNotes || []))], [fragrances]);
  const accords = useMemo(() => [...new Set(fragrances.flatMap(f => f.accords ?? []))], [fragrances]);

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });
  const [searchQueries, setSearchQueries] = useState({ brands: '', perfumers: '', notes: '', accords: '' });

  const handleCheckboxChange = (type: keyof FilterCriteria, item: string) => {
    setFilterCriteria(prev => {
      const selectedItems = (prev[type] || []) as string[];
      const updatedItems = selectedItems.includes(item)
        ? selectedItems.filter(i => i !== item)
        : [...selectedItems, item];
      
      const updatedCriteria = { ...prev, [type]: updatedItems };
      onFilterChange(updatedCriteria);
      return updatedCriteria;
    });
  };

  const handleSearchChange = (type: keyof typeof searchQueries, query: string) => {
    setSearchQueries(prev => ({ ...prev, [type]: query }));
  };

  if (loading) return <p>Loading fragrances...</p>;

  return (
    <div className="container mt-4">
      <h3 className="font-title text-3xl">Filter Fragrances</h3>
      <div className="font-body text-black">
        <Accordion defaultActiveKey="0">
          <FilterSection
            title="Brand"
            items={brands}
            selectedItems={filterCriteria.brands}
            onChange={(item) => handleCheckboxChange('brands', item)}
            searchQuery={searchQueries.brands}
            onSearchChange={(query) => handleSearchChange('brands', query)}
          />
          <FilterSection
            title="Perfumer"
            items={perfumers}
            selectedItems={filterCriteria.perfumers}
            onChange={(item) => handleCheckboxChange('perfumers', item)}
            searchQuery={searchQueries.perfumers}
            onSearchChange={(query) => handleSearchChange('perfumers', query)}
          />
          <FilterSection
            title="Notes"
            items={notes}
            selectedItems={filterCriteria.notes}
            onChange={(item) => handleCheckboxChange('notes', item)}
            searchQuery={searchQueries.notes}
            onSearchChange={(query) => handleSearchChange('notes', query)}
          />
          <FilterSection
            title="Accords"
            items={accords}
            selectedItems={filterCriteria.accords}
            onChange={(item) => handleCheckboxChange('accords', item)}
            searchQuery={searchQueries.accords}
            onSearchChange={(query) => handleSearchChange('accords', query)}
          />
        </Accordion>
      </div>
    </div>
  );
};

export default FilteredList;
