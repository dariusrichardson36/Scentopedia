// src/components/FilteredList.tsx
import React, { useState, useMemo } from 'react';
import { Accordion, ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';
import useFragrances from '../hooks/useFragrances';

// Define a helper function to flatten notes
const flattenNotes = (fragrances: any[]) => {
  const notesSet = new Set<string>();
  
  fragrances.forEach(f => {
    if (f.notes) {
      const { base_notes = [], middle_notes = [], top_notes = [] } = f.notes;
      [...base_notes, ...middle_notes, ...top_notes].forEach(note => notesSet.add(note));
    }
  });

  return Array.from(notesSet);
};

const FilterSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <Accordion.Item eventKey={title}>
    <Accordion.Header>{title}</Accordion.Header>
    <Accordion.Body>
      <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
        {items.map((item, index) => (
          <ListGroup.Item key={index}>
            <Form.Check type="checkbox" label={item} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Accordion.Body>
  </Accordion.Item>
);

const FilteredList: React.FC = () => {
  const { fragrances, loading } = useFragrances();

  // Collect unique values for each filter from the fragrances data
  const brands = useMemo(() => [...new Set(fragrances.map(f => f.brandName).filter(Boolean) as string[])], [fragrances]);
  const perfumers = useMemo(() => [...new Set(fragrances.map(f => f.perfumer).filter(Boolean) as string[])], [fragrances]);
  const notes = useMemo(() => flattenNotes(fragrances), [fragrances]); // Flatten notes across all types
  const accords = useMemo(() => [...new Set(fragrances.flatMap(f => f.accords ?? []))], [fragrances]);

  if (loading) return <p>Loading fragrances...</p>;

  return (
    <div className="container mt-4">
      <h3>Filter Fragrances</h3>
      <Accordion defaultActiveKey="0">
        <FilterSection title="Fragrance Brand" items={brands} />
        <FilterSection title="Perfumer" items={perfumers} />
        <FilterSection title="Notes" items={notes} />
        <FilterSection title="Accords" items={accords} />
      </Accordion>
    </div>
  );
};

export default FilteredList;
