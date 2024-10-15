import React, { useState } from 'react';
import { ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';

// Sample data for testing
const sampleData = {
  brands: ['Brand A', 'Brand B', 'Brand C', 'Brand D'],
  perfumers: ['Perfumer X', 'Perfumer Y', 'Perfumer Z'],
  notes: ['Woody', 'Citrus', 'Floral', 'Spicy'],
  ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'],
};

const FilteredList: React.FC = () => {
  // State management
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPerfumers, setSelectedPerfumers] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100]);
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [perfumerSearch, setPerfumerSearch] = useState<string>('');

  // Generic handler for checkboxes
  const handleCheckboxChange = (selectedState: string[], setSelectedState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setSelectedState(
      selectedState.includes(value)
        ? selectedState.filter(item => item !== value)
        : [...selectedState, value]
    );
  };

  // Search filtering functions
  const filteredBrands = sampleData.brands.filter(brand => brand.toLowerCase().includes(brandSearch.toLowerCase()));
  const filteredPerfumers = sampleData.perfumers.filter(perfumer => perfumer.toLowerCase().includes(perfumerSearch.toLowerCase()));

  return (
    <div className="container mt-4">
      <h3>Filter Fragrances</h3>

      {/* Fragrance Brand with Search */}
      <h5>Fragrance Brand</h5>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search Brands"
          onChange={(e) => setBrandSearch(e.target.value)}
        />
      </InputGroup>
      <ListGroup>
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

      {/* Perfumer with Search */}
      <h5>Perfumer</h5>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search Perfumers"
          onChange={(e) => setPerfumerSearch(e.target.value)}
        />
      </InputGroup>
      <ListGroup>
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

      {/* Price Range Slider */}
      <h5>Price Range</h5>
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

      {/* Notes */}
      <h5>Notes</h5>
      <ListGroup>
        {sampleData.notes.map((note, index) => (
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

      {/* Ingredients */}
      <h5>Ingredients</h5>
      <ListGroup>
        {sampleData.ingredients.map((ingredient, index) => (
          <ListGroup.Item key={index}>
            <Form.Check
              type="checkbox"
              label={ingredient}
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleCheckboxChange(selectedIngredients, setSelectedIngredients, ingredient)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FilteredList;
