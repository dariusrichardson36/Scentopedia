import React, { useState, useEffect } from 'react';
import { Accordion, ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import './FilteredList.scss';
import { db } from '../../firebase';

interface FragranceData {
  brandName?: string;
  perfumer?: string;
  notes?: string[];
  accords?: string[];
}

const FilteredList: React.FC = () => {
  // State management with type annotations
  const [brands, setBrands] = useState<string[]>([]);
  const [perfumers, setPerfumers] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [accords, setAccords] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPerfumers, setSelectedPerfumers] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedAccords, setSelectedAccords] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100]);

  // Search states for each filter section
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [perfumerSearch, setPerfumerSearch] = useState<string>('');
  const [noteSearch, setNoteSearch] = useState<string>('');
  const [accordSearch, setAccordSearch] = useState<string>('');

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const fragrancesCollection = collection(db, 'Fragrance');
      const fragranceSnapshot = await getDocs(fragrancesCollection);
      const fragranceData = fragranceSnapshot.docs.map(doc => doc.data() as FragranceData);

      // Extract unique data for filters with type checking
      setBrands([...new Set(fragranceData.map(item => item.brandName).filter((brand): brand is string => Boolean(brand)))]);
      setPerfumers([...new Set(fragranceData.map(item => item.perfumer).filter((perfumer): perfumer is string => Boolean(perfumer)))]);
      setNotes([...new Set(fragranceData.flatMap(item => item.notes ?? []).filter((note): note is string => Boolean(note)))]);
      setAccords([...new Set(fragranceData.flatMap(item => item.accords ?? []).filter((accord): accord is string => Boolean(accord)))]);
    };

    fetchData();
  }, []);

  // Checkbox handler
  const handleCheckboxChange = (
    selectedState: string[],
    setSelectedState: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setSelectedState(
      selectedState.includes(value)
        ? selectedState.filter(item => item !== value)
        : [...selectedState, value]
    );
  };

  // Filtered lists with search functionality
  const filteredBrands = brands.filter(
    brand => brand && brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredPerfumers = perfumers.filter(
    perfumer => perfumer && perfumer.toLowerCase().includes(perfumerSearch.toLowerCase())
  );

  const filteredNotes = notes.filter(
    note => note && note.toLowerCase().includes(noteSearch.toLowerCase())
  );

  const filteredAccords = accords.filter(
    accord => accord && accord.toLowerCase().includes(accordSearch.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>Filter Fragrances</h3>
      <Accordion defaultActiveKey="0">
        
        {/* Fragrance Brand Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Fragrance Brand</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Brands"
                onChange={(e) => setBrandSearch(e.target.value)}
              />
            </InputGroup>
            <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
              {filteredBrands.map((brand, index) => (
                <ListGroup.Item key={index}>
                  <Form.Check
                    type="checkbox"
                    label={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleCheckboxChange(selectedBrands, setSelectedBrands, brand)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        {/* Perfumer Accordion */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Perfumer</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Perfumers"
                onChange={(e) => setPerfumerSearch(e.target.value)}
              />
            </InputGroup>
            <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
              {filteredPerfumers.map((perfumer, index) => (
                <ListGroup.Item key={index}>
                  <Form.Check
                    type="checkbox"
                    label={perfumer}
                    checked={selectedPerfumers.includes(perfumer)}
                    onChange={() => handleCheckboxChange(selectedPerfumers, setSelectedPerfumers, perfumer)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        {/* Notes Accordion */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Notes</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Notes"
                onChange={(e) => setNoteSearch(e.target.value)}
              />
            </InputGroup>
            <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
              {filteredNotes.map((note, index) => (
                <ListGroup.Item key={index}>
                  <Form.Check
                    type="checkbox"
                    label={note}
                    checked={selectedNotes.includes(note)}
                    onChange={() => handleCheckboxChange(selectedNotes, setSelectedNotes, note)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        {/* Accords Accordion */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Accords</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Accords"
                onChange={(e) => setAccordSearch(e.target.value)}
              />
            </InputGroup>
            <ListGroup className="overflow-auto" style={{ maxHeight: '150px' }}>
              {filteredAccords.map((accord, index) => (
                <ListGroup.Item key={index}>
                  <Form.Check
                    type="checkbox"
                    label={accord}
                    checked={selectedAccords.includes(accord)}
                    onChange={() => handleCheckboxChange(selectedAccords, setSelectedAccords, accord)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        {/* Price Range Accordion */}
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
