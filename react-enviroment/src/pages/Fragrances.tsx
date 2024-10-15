import React from 'react';
import FilteredList from '../components/FilteredList';

const Fragrances: React.FC = () => {
  return (
    <div>
      {/* Header Section Centered */}
      <div className="text-black text-center py-10">
        <h2 className="text-4xl mb-4" style={{ fontFamily: 'Bebas Neue, normal' }}>Fragrances</h2>
        <p className="text-2xl">Find the fragrance for you.</p>
      </div>

      {/* FilteredList aligned to the left and positioned under the header */}
      <div className="filtered-list-wrapper">
        <FilteredList /> 
      </div>
    </div>
  );
};

export default Fragrances;
