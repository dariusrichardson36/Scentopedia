// src/components/NavSearchBar.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFragrances from '../hooks/useFragrances';
import { FragranceData } from '../types/types';
import Fuse from 'fuse.js';

interface NavSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavSearchBar: React.FC<NavSearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const { fragrances } = useFragrances();
  const [suggestions, setSuggestions] = useState<FragranceData[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const fuse = new Fuse(fragrances, {
      keys: ['fragranceName'],
      threshold: 0.4, // Adjust threshold for more or less fuzzy matches
    });

    const results = fuse.search(searchQuery);
    setSuggestions(results.slice(0, 3).map(result => result.item));
  }, [searchQuery, fragrances]);

  return (
    <div className="ml-10 pl-16 flex items-center font-body space-x-2 relative">
      <input
        type="text"
        className="block w-64 px-4 py-2 border-2 border-gray-700 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search fragrances..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        className="px-4 py-2 bg-white text-gray-900 rounded-md border-2 border-gray-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        Search
      </button>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              to={`/fragrance/${suggestion.fragranceName}`}
              className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <img
                src={suggestion.image || '/placeholder.jpg'}
                alt={suggestion.fragranceName}
                className="h-10 w-10 mr-4 rounded-md object-cover"
              />
              <span className="text-gray-900 text-sm font-medium">{suggestion.fragranceName}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;