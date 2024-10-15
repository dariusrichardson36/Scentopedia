import React from 'react';
import FilteredList from '../components/FilteredList';

const Fragrances: React.FC = () => {
  return (
    <div className="text-black text-center py-10">
      <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bebas Neue, normal' }}>Fragrances</h2>
      <p className="text-2xl">Find the fragrance for you.</p>
      <FilteredList /> {/* Separate component */}
    </div>
  );
};

export default Fragrances;
