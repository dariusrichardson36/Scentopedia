// src/hooks/useFragrances.ts

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

// Define TypeScript interface for structure of Fragrance data from Firestore
interface FragranceData {
  name: string;
  brandName: string;
  perfumer?: string;
  accords?: string[];
  brandImg?: string;
  image?: string;
  description?: string;
  notes: {
    base_notes?: string[];
    middle_notes?: string[];
    top_notes?: string[];
  };
}

// Define the structure of data returned from the hook
interface UseFragrancesReturn {
  fragrances: FragranceData[];
  uniqueNotes: string[]; // For filtering in FilteredList
  loading: boolean;
}

// Hook to fetch fragrance data from Firestore
const useFragrances = (): UseFragrancesReturn => {
  const [fragrances, setFragrances] = useState<FragranceData[]>([]);
  const [uniqueNotes, setUniqueNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFragrances = async () => {
      try {
        const fragrancesCollection = collection(db, 'Fragrance');
        const fragranceSnapshot = await getDocs(fragrancesCollection);
        
        // Map documents into FragranceData structure
        const fragranceData = fragranceSnapshot.docs.map(doc => doc.data() as FragranceData);
        
        setFragrances(fragranceData);
        
        // Extract and deduplicate all notes for general filtering
        const allNotes = fragranceData.flatMap(fragrance => [
          ...(fragrance.notes.base_notes || []),
          ...(fragrance.notes.middle_notes || []),
          ...(fragrance.notes.top_notes || []),
        ]);
        setUniqueNotes(Array.from(new Set(allNotes))); // Remove duplicates
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fragrance data:", error);
        setLoading(false);
      }
    };

    fetchFragrances();
  }, []);

  return { fragrances, uniqueNotes, loading };
};

export default useFragrances;
export type { FragranceData };
