
// src/pages/About.tsx
import React, { useEffect } from 'react';

const Fragrances: React.FC = () => {
  return (
    <div className="text-black py-10">
      <h2 className="text-4xl ml-52 mb-4 mt-10" style={{ fontFamily: 'Bebas Neue, normal' }}>Fragrances</h2>
      <div className="container mx-auto py-10">
      {/* Grid container with 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src="/path/to/image1.jpg" alt="Fragrance 1" className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h2 className="text-2xl font-bold mb-4">Fragrance 1</h2>
          <p>This is content for the first fragrance.</p>
        </div>

        {/* Column 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src="/path/to/image2.jpg" alt="Fragrance 2" className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h2 className="text-2xl font-bold mb-4">Fragrance 2</h2>
          <p>This is content for the second fragrance.</p>
        </div>

        {/* Column 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src="/path/to/image3.jpg" alt="Fragrance 3" className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h2 className="text-2xl font-bold mb-4">Fragrance 3</h2>
          <p>This is content for the third fragrance.</p>
        </div>
      </div>
    </div>
      </div>
    
  );
};

export default Fragrances;
