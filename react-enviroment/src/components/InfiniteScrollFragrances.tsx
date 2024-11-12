// src/components/InfiniteScrollFragrances.tsx
import React, { useEffect, useState } from 'react';
import FragranceCard from './FragranceCard';
import useFragrances from '../hooks/useFragrances';
import { FragranceData } from '../types/types';
import './InfiniteScrollFragrances.css';

const InfiniteScrollFragrances: React.FC = () => {
  const { fragrances } = useFragrances();
  const [randomFragrances, setRandomFragrances] = useState<FragranceData[]>([]);

  useEffect(() => {
    if (fragrances.length > 0) {
      const shuffled = [...fragrances].sort(() => 0.5 - Math.random());
      setRandomFragrances(shuffled.slice(0, 10)); // Get 10 random fragrances
    }
  }, [fragrances]);

  return (
    <div className="scroll-container mt-20 pb-10">
      <div className="scroll-content">
        {randomFragrances.concat(randomFragrances).map((fragrance: FragranceData, index) => (
          <div
            key={index}
            className="snap-start mx-4 card-wrapper"
            style={{ height: '28rem', width: '18rem', display: 'flex', alignItems: 'stretch' }}
          >
            <FragranceCard fragrance={fragrance} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollFragrances;
