export interface FragranceData {
    name?: string;             // Fragrance name
    brandName?: string;         // Brand name
    perfumer?: string;          // Perfumer's name
    notes?: string[];           // Array of notes
    accords?: string[];         // Array of accords
    brandImg?: string;          // Main brand image URL
    image?: string;             // Alternate image URL
    description?: string;       // Description of the fragrance
  }
  
  
  export interface FilterCriteria {
    brands: string[];
    perfumers: string[]; // Add perfumers property here
    notes: string[];
    accords: string[];
    priceRange?: [number, number]; // Optional if used for filtering price
  }
  