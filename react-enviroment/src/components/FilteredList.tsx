import React, { useState, useEffect, useMemo } from 'react';
import { Accordion, ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import './FilteredList.scss';
import { db } from '../../firebase.ts';
import { FilterCriteria } from '../types/types.ts';

// Define TypeScript interface for structure of Fragrance data from Firestore
interface FragranceData {
  brandName?: string;
  perfumer?: string;
  notes?: string[];
  accords?: string[];
}

// Consolidated state type for search inputs and selected filters
interface FilterState {
  search: string;
  selected: string[];
}

type FilteredListProps = {
  onFilterChange: (filters: FilterCriteria) => void;
};

const FilterSection: React.FC<{
  title: string;
  items: string[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}> = ({ title, items, filterState, setFilterState }) => {
  // Memoized filtered items based on search input
  const filteredItems = useMemo(
    () => items.filter(item => item.toLowerCase().includes(filterState.search.toLowerCase())),
    [items, filterState.search]
  );

  // Handler to toggle selected items
  const handleCheckboxChange = (value: string) => {
    setFilterState(prevState => ({
      ...prevState,
      selected: prevState.selected.includes(value)
        ? prevState.selected.filter(item => item !== value)
        : [...prevState.selected, value]
    }));
  };

  return (
    <Accordion.Item eventKey={title}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={`Search ${title}`}
            value={filterState.search}
            onChange={(e) => setFilterState(prev => ({ ...prev, search: e.target.value }))}
          />
        </InputGroup>
        <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
          {filteredItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Form.Check
                type="checkbox"
                label={item}
                checked={filterState.selected.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const FilteredList: React.FC<FilteredListProps> = ({ onFilterChange }) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [perfumers, setPerfumers] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [accords, setAccords] = useState<string[]>([]);

  const [brandFilter, setBrandFilter] = useState<FilterState>({ search: '', selected: [] });
  const [perfumerFilter, setPerfumerFilter] = useState<FilterState>({ search: '', selected: [] });
  const [noteFilter, setNoteFilter] = useState<FilterState>({ search: '', selected: [] });
  const [accordFilter, setAccordFilter] = useState<FilterState>({ search: '', selected: [] });
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100]);

  // Fetch data from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fragrancesCollection = collection(db, 'Fragrance');
      const fragranceSnapshot = await getDocs(fragrancesCollection);
      const fragranceData = fragranceSnapshot.docs.map(doc => doc.data() as FragranceData);

      setBrands([...new Set(fragranceData.map(item => item.brandName).filter(Boolean) as string[])]);
      setPerfumers([...new Set(fragranceData.map(item => item.perfumer).filter(Boolean) as string[])]);
      setNotes([...new Set(fragranceData.flatMap(item => item.notes ?? []).filter(Boolean) as string[])]);
      setAccords([...new Set(fragranceData.flatMap(item => item.accords ?? []).filter(Boolean) as string[])]);
    };

    fetchData();
  }, []);

  // Update parent with current filter state whenever a filter changes
  useEffect(() => {
    onFilterChange({
      brands: brandFilter.selected,
      perfumers: perfumerFilter.selected,
      notes: noteFilter.selected,
      accords: accordFilter.selected,
      priceRange,
    });
  }, [brandFilter, perfumerFilter, noteFilter, accordFilter, priceRange]);

  return (
    <div className="container mt-4">
      <h3>Filter Fragrances</h3>
      <Accordion defaultActiveKey="0">
        
        <FilterSection
          title="Fragrance Brand"
          items={brands}
          filterState={brandFilter}
          setFilterState={setBrandFilter}
        />
        <FilterSection
          title="Perfumer"
          items={perfumers}
          filterState={perfumerFilter}
          setFilterState={setPerfumerFilter}
        />
        <FilterSection
          title="Notes"
          items={notes}
          filterState={noteFilter}
          setFilterState={setNoteFilter}
        />
        <FilterSection
          title="Accords"
          items={accords}
          filterState={accordFilter}
          setFilterState={setAccordFilter}
        />

        {/* Price Range Section */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Price Range</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="priceRangeSlider">
              <Form.Label>Price: ${priceRange[0]} - ${priceRange[1]}</Form.Label>
              <Form.Control
                type="range"
                min={10}
                max={300}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FilteredList;
