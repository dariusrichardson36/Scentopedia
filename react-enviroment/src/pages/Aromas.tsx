// src/pages/Aromas.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Accords.css'; // Import the existing CSS for styles

const Aromas: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to the Accord Detail page
  const goToAccordDetail = (accord: string) => {
    navigate(`/accord/${accord}`);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Video Background */}
      <video className="video-background fade-in-video" autoPlay loop muted playsInline>
        <source src="/AromaDude.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="container mx-auto py-6 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Explore Your Aromas</h2>
        <div className="row g-5">
          {/* Aquatic Accord */}
          <div className="col-md-4">
            <div
              className="p-6 bg-white bg-opacity-50 border border-black rounded-lg shadow-md hover:shadow-lg transition-all h-full cursor-pointer backdrop-blur-md"
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
              className="p-6 bg-white bg-opacity-50 border border-black rounded-lg shadow-md hover:shadow-lg transition-all h-full cursor-pointer backdrop-blur-md"
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
    </div>
  );
};

export default Aromas;
