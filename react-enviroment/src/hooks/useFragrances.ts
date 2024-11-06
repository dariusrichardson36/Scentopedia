// src/hooks/useFragrances.ts

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FragranceData } from '../types/types';

// Hook to fetch fragrance data from Firestore
const useFragrances = () => {
  const [fragrances, setFragrances] = useState<FragranceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFragrances = async () => {
      try {
        const fragrancesCollection = collection(db, 'Fragrance');
        const fragranceSnapshot = await getDocs(fragrancesCollection);
        
        // Map documents into FragranceData structure directly
        const fragranceData = fragranceSnapshot.docs.map(doc => doc.data() as FragranceData);
        
        setFragrances(fragranceData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fragrance data:", error);
        setLoading(false);
      }
    };

    fetchFragrances();
  }, []);

  return { fragrances, loading };
};

export default useFragrances;
