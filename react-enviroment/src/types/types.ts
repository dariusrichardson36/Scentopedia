// src/types/types.ts

// src/types/types.ts

// src/types/types.ts

export interface FragranceData {
  fragranceName?: string;       // Change from name to fragranceName
  brandName?: string;
  perfumer?: string;
  accords?: string[];
  brandImg?: string;
  image?: string;
  description?: string;
  notes?: {
    base_notes?: string[];
    middle_notes?: string[];
    top_notes?: string[];
  };
  combNotes?: string[];
}




// src/types/types.ts

export interface FilterCriteria {
  brands: string[];                // Array of selected brands for filtering
  perfumers: string[];             // Array of selected perfumers for filtering
  notes: string[];                 // Array of selected notes for filtering
  accords: string[];               // Array of selected accords for filtering
  priceRange?: [number, number];   // Optional price range for filtering
}

