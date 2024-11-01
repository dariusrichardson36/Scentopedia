import React, { useState, useEffect } from 'react';
import { Accordion, ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import './FilteredList.scss';
import { db } from '../../firebase';

// Define TypeScript interface for the structure of Fragrance data from Firestore
interface FragranceData {
  brandName?: string;   // Optional brand name of the fragrance
  perfumer?: string;    // Optional perfumer associated with the fragrance
  notes?: string[];     // Optional array of notes (e.g., floral, woody, etc.)
  accords?: string[];   // Optional array of accords (e.g., spicy, sweet, etc.)
}

const FilteredList: React.FC = () => {
  /**
   * State Variables:
   * These states store the data retrieved from Firestore and manage
   * selected filters, search inputs, and price range.
   */
  
  // States to hold unique filter options for brands, perfumers, notes, and accords
  const [brands, setBrands] = useState<string[]>([]);
  const [perfumers, setPerfumers] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [accords, setAccords] = useState<string[]>([]);

  // States to store selected filters for each category (Brands, Perfumers, etc.)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPerfumers, setSelectedPerfumers] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedAccords, setSelectedAccords] = useState<string[]>([]);

  // State to store the selected price range
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100]);

  // Search input states for filtering within each category dynamically
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [perfumerSearch, setPerfumerSearch] = useState<string>('');
  const [noteSearch, setNoteSearch] = useState<string>('');
  const [accordSearch, setAccordSearch] = useState<string>('');

  /**
   * Fetch data from Firestore when the component mounts.
   * The useEffect hook runs only once upon mounting due to the empty dependency array [].
   * 
   * It retrieves data from the "Fragrance" collection in Firestore and
   * extracts unique values for each category (brands, perfumers, notes, accords),
   * then updates the corresponding states.
   */
  useEffect(() => {
    const fetchData = async () => {
      // Reference the 'Fragrance' collection in Firestore
      const fragrancesCollection = collection(db, 'Fragrance');
      const fragranceSnapshot = await getDocs(fragrancesCollection);
      const fragranceData = fragranceSnapshot.docs.map(doc => doc.data() as FragranceData);

      // Extract unique values for each filter category, ensuring only non-null, non-undefined strings are kept
      setBrands([...new Set(fragranceData.map(item => item.brandName).filter((brand): brand is string => Boolean(brand)))]);
      setPerfumers([...new Set(fragranceData.map(item => item.perfumer).filter((perfumer): perfumer is string => Boolean(perfumer)))]);
      setNotes([...new Set(fragranceData.flatMap(item => item.notes ?? []).filter((note): note is string => Boolean(note)))]);
      setAccords([...new Set(fragranceData.flatMap(item => item.accords ?? []).filter((accord): accord is string => Boolean(accord)))]);
    };

    fetchData();
  }, []);

  /**
   * Checkbox selection handler for each filter category (Brands, Perfumers, Notes, Accords).
   * 
   * @param selectedState - Current state of selected items (e.g., selectedBrands).
   * @param setSelectedState - Function to update the selected state.
   * @param value - The selected value to toggle.
   */
  const handleCheckboxChange = (
    selectedState: string[],
    setSelectedState: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    // If the value is already selected, remove it; otherwise, add it to the selected items
    setSelectedState(
      selectedState.includes(value)
        ? selectedState.filter(item => item !== value) // Remove item if already selected
        : [...selectedState, value]                   // Add item if not selected
    );
  };

  /**
   * Filtered lists based on user search input.
   * These lists are updated in real-time as the user types in each search box.
   */
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
        
        {/* Brand Filter Section */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Fragrance Brand</Accordion.Header>
          <Accordion.Body>
            {/* Search input for dynamically filtering brands */}
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Brands"
                onChange={(e) => setBrandSearch(e.target.value)}
              />
            </InputGroup>
            {/* Display filtered brands with checkboxes for selection */}
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

        {/* Perfumer Filter Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Perfumer</Accordion.Header>
          <Accordion.Body>
            {/* Search input for dynamically filtering perfumers */}
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Perfumers"
                onChange={(e) => setPerfumerSearch(e.target.value)}
              />
            </InputGroup>
            {/* Display filtered perfumers with checkboxes for selection */}
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

        {/* Notes Filter Section */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Notes</Accordion.Header>
          <Accordion.Body>
            {/* Search input for dynamically filtering notes */}
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Notes"
                onChange={(e) => setNoteSearch(e.target.value)}
              />
            </InputGroup>
            {/* Display filtered notes with checkboxes for selection */}
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

        {/* Accords Filter Section */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Accords</Accordion.Header>
          <Accordion.Body>
            {/* Search input for dynamically filtering accords */}
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Accords"
                onChange={(e) => setAccordSearch(e.target.value)}
              />
            </InputGroup>
            {/* Display filtered accords with checkboxes for selection */}
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

        {/* Price Range Filter Section */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Price Range</Accordion.Header>
          <Accordion.Body>
            {/* Range slider for adjusting the price range */}
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
