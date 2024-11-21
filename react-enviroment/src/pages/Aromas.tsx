// src/pages/Aromas.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Aromas: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to the Accord Detail page
  const goToAccordDetail = (accord: string) => {
    navigate(`/accord/${accord}`);
  };

  return (
    <div className="container mx-auto py-10 px-4 text-black bg-white min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center">Explore Aromas</h2>
      <div className="row g-5">
        {/* Aquatic Accord */}
        <div className="col-md-4">
          <div
            className="p-6 bg-gradient-to-t from-gray-100 to-gray-200 border border-black rounded-lg shadow-md hover:shadow-lg transition-all h-full cursor-pointer"
            onClick={() => goToAccordDetail('aquatic')}
          >
            <h5 className="text-2xl font-bold mb-4 text-black">Aquatic Accord</h5>
            <p className="text-base font-light">
              Aquatic accords capture the freshness of the sea and water elements.
            </p>
          </div>
        </div>

        {/* Woody Accord */}
        <div className="col-md-4">
          <div
            className="p-6 bg-gradient-to-t from-gray-100 to-gray-200 border border-black rounded-lg shadow-md hover:shadow-lg transition-all h-full cursor-pointer"
            onClick={() => goToAccordDetail('woody')}
          >
            <h5 className="text-2xl font-bold mb-4 text-black">Woody Accord</h5>
            <p className="text-base font-light">
              Woody accords evoke warmth and natural richness.
            </p>
          </div>
        </div>

        {/* Add more accord cards here */}
      </div>
    </div>
  );
};

export default Aromas;
