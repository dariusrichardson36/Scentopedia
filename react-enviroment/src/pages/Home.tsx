// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FragranceCard from '../components/FragranceCard';
import useFragrances from '../hooks/useFragrances';
import { FragranceData } from '../types/types';
import './Home.css'; // Import a CSS file for the infinite scrolling effect

const Home: React.FC = () => {
  const { fragrances } = useFragrances();
  const [randomFragrances, setRandomFragrances] = useState<FragranceData[]>([]);

  useEffect(() => {
    if (fragrances.length > 0) {
      const shuffled = [...fragrances].sort(() => 0.5 - Math.random());
      setRandomFragrances(shuffled.slice(0, 10)); // Get 10 random fragrances
    }
  }, [fragrances]);

  return (
    <div className="overflow-hidden">
      {/* Section 1: Background Image */}
      <div className="bg-[url('/parfums-de-marly-layton-featured-image-1024x640.png.jpeg')] bg-cover bg-no-repeat bg-center w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-center mt-28 font-title text-8xl">
          Welcome to the world of fragrance
        </h1>
        <div className="py-10">
          <p className="text-white text-center text-8xl pb-10 font-title">
            Find the scent for you
          </p>
          <div className="text-center mt-8">
            <Link to="/fragrances">
              <button
                className="bg-white text-black font- py-4 px-8 rounded-none font-title text-xl hover:bg-gray-200 transition duration-300 ease-in-out"
              >
                Find a Fragrance
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2: New Background with Content and Fragrance Cards Scrolling */}
      <div className="w-full min-h-screen bg-gray-100 pt-20">
        <h2 className="text-black font-title text-center text-5xl py-20">
          Discover More Fragrances
        </h2>
        <p className="text-black text-center font-body max-w-3xl mx-auto text-2xl pb-10">
          Explore our wide collection of fragrances. Find something that suits your style and personality.
        </p>
        <div className="scroll-container mt-20 pb-10">
          <div className="scroll-content">
            {randomFragrances.concat(randomFragrances).map((fragrance: FragranceData, index) => (
              <div key={index} className="snap-start mx-4">
                <FragranceCard fragrance={fragrance} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Additional Content */}
      <div className="w-full min-h-screen bg-black pt-20">
        <h2 className="text-white text-center font-title text-5xl py-20">
          Join the Scentopedia Community
        </h2>
        <p className="text-white text-center max-w-3xl font-body mx-auto text-2xl pb-10">
          Become part of a community that shares your passion for fragrances. Discover new scents, share your experiences, and connect with others.
        </p>
      </div>
    </div>
  );
};

export default Home;
