// src/pages/TestPage.tsx

import React from 'react';
import FilteredList from '../components/FilteredList';
import FragranceGrid from '../components/FragranceGrid';

const TestPage: React.FC = () => {
  return (
    <div>
      <FilteredList />
      <FragranceGrid />
    </div>
  );
};

export default TestPage;
