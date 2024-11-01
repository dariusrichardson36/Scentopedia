import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FragranceData } from '../types/types';

/**
 * Custom Hook: useFragrances
 *
 * Purpose:
 * The `useFragrances` hook is designed to fetch fragrance data from a Firestore database
 * and manage the loading state of that data. It provides an easy way for components
 * to access an array of fragrances and a loading indicator, allowing them to handle data
 * fetching and display logic more seamlessly. This hook centralizes data retrieval logic,
 * making the component code cleaner and more focused on rendering.
 *
 * Functionality:
 * - On initial render, it fetches all documents from the 'Fragrance' collection in Firestore.
 * - It then maps the fetched data into an array of `FragranceData` objects, which are defined by a TypeScript interface.
 * - The hook manages two pieces of state:
 *   - `fragrances`: Stores the array of fragrance data retrieved from Firestore.
 *   - `loading`: Indicates whether the data is still being fetched (true) or has been fully loaded (false).
 *
 * Return:
 * The hook returns an object containing:
 * - `fragrances`: An array of fragrance data, each conforming to the `FragranceData` interface.
 * - `loading`: A boolean indicating the loading state.
 *
 * Usage:
 * This hook can be used in any component that needs to display or process fragrance data.
 * By destructuring `{ fragrances, loading }` from the hook, a component can render a loading
 * indicator while data is being fetched and then render the actual fragrance data once it's available.
 *
 * Example:
 * const { fragrances, loading } = useFragrances();
 * if (loading) return <p>Loading...</p>;
 * return <FragranceList data={fragrances} />;
 */

const useFragrances = () => {
  // State to store the array of fragrance data
  const [fragrances, setFragrances] = useState<FragranceData[]>([]);
  // State to track whether the data is currently being loaded
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data from Firestore on component mount
  useEffect(() => {
    const fetchFragrances = async () => {
      try {
        // Reference to the 'Fragrance' collection in Firestore
        const fragrancesCollection = collection(db, 'Fragrance');
        // Fetch all documents from the 'Fragrance' collection
        const fragranceSnapshot = await getDocs(fragrancesCollection);
        // Map each document to a `FragranceData` object
        const fragranceData = fragranceSnapshot.docs.map(doc => doc.data() as FragranceData);
        // Update state with the fetched data
        setFragrances(fragranceData);
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      } finally {
        // Set loading to false once data fetching is complete
        setLoading(false);
      }
    };

    // Call the async fetch function
    fetchFragrances();
  }, []); // Empty dependency array ensures this effect runs only once

  // Return the fragrance data and loading state to be used by consuming components
  return { fragrances, loading };
};

export default useFragrances;
