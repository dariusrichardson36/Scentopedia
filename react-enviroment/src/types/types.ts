// src/types/types.ts

// src/types/types.ts

export interface FragranceData {
  name?: string;                // Fragrance name
  brandName?: string;           // Brand name
  perfumer?: string;            // Perfumer's name
  accords?: string[];           // Array of accords
  brandImg?: string;            // Main brand image URL
  image?: string;               // Alternate image URL
  description?: string;         // Description of the fragrance
  notes?: {
    base_notes?: string[];      // Base notes array
    middle_notes?: string[];    // Middle notes array
    top_notes?: string[];       // Top notes array
  };
  combNotes?: string[];         // Combined array of all notes for filtering
}



// src/types/types.ts

export interface FilterCriteria {
  brands: string[];                // Array of selected brands for filtering
  perfumers: string[];             // Array of selected perfumers for filtering
  notes: string[];                 // Array of selected notes for filtering
  accords: string[];               // Array of selected accords for filtering
  priceRange?: [number, number];   // Optional price range for filtering
}

