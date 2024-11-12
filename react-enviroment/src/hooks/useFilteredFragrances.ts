// src/hooks/useFilteredFragrances.ts
import { useMemo } from 'react';
import { FilterCriteria, FragranceData } from '../types/types';

const useFilteredFragrances = (
  fragrances: FragranceData[], 
  filterCriteria: FilterCriteria, 
  nameQuery: string
) => {
  const filteredFragrances = useMemo(() => {
    return fragrances.filter(f => {
      const matchesName = f.fragranceName?.toLowerCase().includes(nameQuery.toLowerCase()) ?? true;
      const matchesBrand = filterCriteria.brands.length === 0 || filterCriteria.brands.includes(f.brandName || '');
      const matchesPerfumer = filterCriteria.perfumers.length === 0 || filterCriteria.perfumers.includes(f.perfumer || '');
      const matchesNotes = filterCriteria.notes.length === 0 || filterCriteria.notes.every(note => (f.combNotes || []).includes(note));
      const matchesAccords = filterCriteria.accords.length === 0 || filterCriteria.accords.every(accord => (f.accords || []).includes(accord));

      return matchesName && matchesBrand && matchesPerfumer && matchesNotes && matchesAccords;
    });
  }, [fragrances, filterCriteria, nameQuery]);

  return {
    filteredFragrances,
    totalFilteredItems: filteredFragrances.length
  };
};

export default useFilteredFragrances;
