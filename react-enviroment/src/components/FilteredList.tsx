// src/components/FilteredList.tsx
import React, { useState, useMemo } from 'react';
import { Accordion, ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';
import Fuse from 'fuse.js';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria } from '../types/types';

const FilterSection: React.FC<{ 
  title: string; 
  items: string[]; 
  selectedItems: string[]; 
  onChange: (item: string) => void; 
  searchQuery: string; 
  onSearchChange: (query: string) => void; 
}> = React.memo(({ title, items, selectedItems, onChange, searchQuery, onSearchChange }) => {
  // Memoize Fuse instance to avoid re-creating on each render
  const fuse = useMemo(() => new Fuse(items, { threshold: 0.4, distance: 100 }), [items]);
  const filteredItems = searchQuery ? fuse.search(searchQuery).map(result => result.item) : items;

  return (
    <Accordion.Item eventKey={title}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={`Search ${title}`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
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
});

const FilteredList: React.FC<{ onFilterChange: (criteria: FilterCriteria) => void; onNameQueryChange: (query: string) => void; }> = ({ onFilterChange, onNameQueryChange }) => {
  const { fragrances, loading } = useFragrances();

  // Memoize extracted filter lists to avoid recalculating on each render
  const brands = useMemo(() => [...new Set(fragrances.map(f => f.brandName).filter(Boolean) as string[])], [fragrances]);
  const perfumers = useMemo(() => [...new Set(fragrances.map(f => f.perfumer).filter(Boolean) as string[])], [fragrances]);
  const notes = useMemo(() => [...new Set(fragrances.flatMap(f => f.combNotes || []))], [fragrances]);
  const accords = useMemo(() => [...new Set(fragrances.flatMap(f => f.accords ?? []))], [fragrances]);

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });
  const [searchQueries, setSearchQueries] = useState({ brands: '', perfumers: '', notes: '', accords: '' });
  const [nameQuery, setNameQuery] = useState('');

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

  const handleNameQueryChange = (query: string) => {
    setNameQuery(query);
    onNameQueryChange(query);
  };

  if (loading) return <p>Loading fragrances...</p>;

  return (
    <div className="container mt-4">
      <h3 className="font-title text-3xl">Filter Fragrances</h3>
      {/* Fragrance Name Search Bar */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search Fragrance Names"
          value={nameQuery}
          onChange={(e) => handleNameQueryChange(e.target.value)}
        />
      </InputGroup>
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
