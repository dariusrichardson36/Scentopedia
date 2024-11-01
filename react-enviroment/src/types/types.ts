/**
 * Interface: FragranceData
 *
 * Purpose:
 * The `FragranceData` interface defines the structure of each fragrance object retrieved
 * from the Firestore database. This interface provides a standardized way to represent fragrance data,
 * making it easier to manage and work with these objects across different components and hooks.
 *
 * Example Usage:
 * This interface is used in conjunction with Firestore data fetching. Each document in the 'Fragrance' collection
 * can be mapped to a `FragranceData` object, enabling components to display fragrance details in a structured way.
 */

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
  
  /**
   * Interface: FilterCriteria
   *
   * Purpose:
   * The `FilterCriteria` interface defines the structure of the filter criteria used to filter fragrances
   * based on various attributes like brand, perfumer, notes, accords, and price range. It standardizes the filter
   * parameters, allowing components to apply filtering consistently and efficiently.
   *
   * Example Usage:
   * This interface is commonly used as the type for filter state in components, enabling them to store
   * and manage user-selected filter options. When combined with fragrance data, it allows the app to
   * display only those fragrances that match the user's selected criteria.
   */
  
  export interface FilterCriteria {
    brands: string[];          // Array of selected brands for filtering
    perfumers: string[];       // Array of selected perfumers for filtering
    notes: string[];           // Array of selected notes for filtering
    accords: string[];         // Array of selected accords for filtering
    priceRange?: [number, number]; // Optional price range for filtering
  }
  