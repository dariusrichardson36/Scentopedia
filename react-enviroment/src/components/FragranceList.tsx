import React, { useState, useEffect } from 'react';
import FragranceCard from './FragranceCard';
import { Row, Col } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FragranceData, FilterCriteria } from '../types/types';

type FragranceListProps = {
  filters: FilterCriteria;
};

const FragranceList: React.FC<FragranceListProps> = ({ filters }) => {
  const [fragrances, setFragrances] = useState<FragranceData[]>([]);
  const [filteredFragrances, setFilteredFragrances] = useState<FragranceData[]>([]);

  // Fetch fragrance data from Firestore
  useEffect(() => {
    const fetchFragrances = async () => {
      const fragrancesCollection = collection(db, 'Fragrance');
      const fragranceSnapshot = await getDocs(fragrancesCollection);
      const fragranceData = fragranceSnapshot.docs.map(doc => doc.data() as FragranceData);
      setFragrances(fragranceData);
      setFilteredFragrances(fragranceData); // Initialize with all fragrances
    };

    fetchFragrances();
  }, []);

  // Apply filters whenever `filters` or `fragrances` change
  useEffect(() => {
    const applyFilters = () => {
      const filtered = fragrances.filter(fragrance => {
        const brandMatch = filters.brands.length === 0 || filters.brands.includes(fragrance.brandName || '');
        const perfumerMatch = filters.perfumers.length === 0 || filters.perfumers.includes(fragrance.perfumer || '');
        const notesMatch = filters.notes.length === 0 || fragrance.notes?.some(note => filters.notes.includes(note));
        const accordsMatch = filters.accords.length === 0 || fragrance.accords?.some(accord => filters.accords.includes(accord));

        return brandMatch && perfumerMatch && notesMatch && accordsMatch;
      });

      setFilteredFragrances(filtered);
    };

    applyFilters();
  }, [filters, fragrances]);

  return (
    <Row>
      {filteredFragrances.map((fragrance, index) => (
        <Col key={index} sm={6} md={4} lg={3} className="mb-4">
          <FragranceCard
            imageUrl={fragrance.image || 'placeholder.jpg'} 
            name={fragrance.name || "Unknown"}              
            brand={fragrance.brandName || "Unknown"}
            onImageClick={() => console.log(`Clicked on ${fragrance.name}`)}
            onBrandClick={() => console.log(`Clicked on ${fragrance.brandName}`)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FragranceList;
