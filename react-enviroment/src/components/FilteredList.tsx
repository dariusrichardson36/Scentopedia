// src/components/FilteredList.tsx
import React, { useState, useMemo } from 'react';
import { Accordion, ListGroup, Form } from 'react-bootstrap';
import useFragrances from '../hooks/useFragrances';
import { FilterCriteria } from '../types/types';

const FilterSection: React.FC<{ title: string; items: string[]; selectedItems: string[]; onChange: (item: string) => void }> = ({ title, items, selectedItems, onChange }) => (
  <Accordion.Item eventKey={title}>
    <Accordion.Header>{title}</Accordion.Header>
    <Accordion.Body>
      <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
        {items.map((item, index) => (
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

const FilteredList: React.FC<{ onFilterChange: (criteria: FilterCriteria) => void }> = ({ onFilterChange }) => {
  const { fragrances, loading } = useFragrances();
  
  const brands = useMemo(() => [...new Set(fragrances.map(f => f.brandName).filter(Boolean) as string[])], [fragrances]);
  const perfumers = useMemo(() => [...new Set(fragrances.map(f => f.perfumer).filter(Boolean) as string[])], [fragrances]);
  const notes = useMemo(() => [...new Set(fragrances.flatMap(f => f.combNotes || []))], [fragrances]);
  const accords = useMemo(() => [...new Set(fragrances.flatMap(f => f.accords ?? []))], [fragrances]);

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ brands: [], perfumers: [], notes: [], accords: [] });

  const handleCheckboxChange = (type: keyof FilterCriteria, item: string) => {
    setFilterCriteria(prev => {
      const selectedItems = (prev[type] || []) as string[]; // Assert as string[]
      const updatedItems = selectedItems.includes(item)
        ? selectedItems.filter(i => i !== item)
        : [...selectedItems, item];
      
      const updatedCriteria = { ...prev, [type]: updatedItems };
      onFilterChange(updatedCriteria);
      return updatedCriteria;
    });
  };
  
  

  if (loading) return <p>Loading fragrances...</p>;

  return (
    <div className="container mt-4">
      <h3 className="font-title text-3xl ">Filter Fragrances</h3>
      <div className="font-body text-black ">
      <Accordion defaultActiveKey="0">
        <FilterSection title="Brand" items={brands} selectedItems={filterCriteria.brands} onChange={(item) => handleCheckboxChange('brands', item)} />
        <FilterSection title="Perfumer" items={perfumers} selectedItems={filterCriteria.perfumers} onChange={(item) => handleCheckboxChange('perfumers', item)} />
        <FilterSection title="Notes" items={notes} selectedItems={filterCriteria.notes} onChange={(item) => handleCheckboxChange('notes', item)} />
        <FilterSection title="Accords" items={accords} selectedItems={filterCriteria.accords} onChange={(item) => handleCheckboxChange('accords', item)} />
      </Accordion>
      </div>
    </div>
  );
};

export default FilteredList;
