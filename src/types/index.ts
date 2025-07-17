


// // NFT related types
// export interface NFTContextType {
//   fetchNFTs: (filters: NFTFilters) => Promise<NFT[]>;
//   fetchTokens: (filters: TokenFilters) => Promise<NFT[]>; // Changed from any[] to NFT[]
// }

// export interface NFT {
//   id: string;
//   name: string;
//   description: string;
//   image: string | undefined;
//   price: number; // 
//   currency: string;
//   creator: {
//     name: string;
//     username: string;
//     avatar: string;
//   };
//   owner?: {
//     name: string;
//     username: string;
//     avatar: string;
//   };
//   collection: string;
//   category: string;
//   status?: string;
//   likes: number;
//   createdAt: string;
//   tokenId: string;
//   blockchain: string;
//   attributes: Array<{
//     trait_type: string;
//     value: string;
//   }>;
//   tier?: string;
//   endsIn?: string;
//   history?: NFTHistoryItem[]; // ✅ Added based on error in `nft.history.map(...)`
//   bio?: string; // If you access bio directly from NFT object
// }

// export interface NFTAttribute {
//   trait_type: string;
//   value: string | number;
// }

// export interface NFTHistoryItem {
//   id: string;
//   type: 'Mint' | 'List' | 'Sale' | 'Transfer' | 'Bid';
//   from: string;
//   to: string;
//   price: number;
//   currency?: string;
//   timestamp: string;
//   txHash?: string;
// }

// export interface NFTCollection {
//   name: string;
//   image: string | undefined;
//   itemCount: number;
//   floorPrice: number;
//   creator: {
//     name: string;
//     username: string;
//     avatar: string;
//   };
// }

// export interface NFTCategory {
//   name: string;
//   image?: string;
//   itemCount?: number;
//   description?: string;
// }

// // AMMYI Tier types
// export type AmmyiTierName = "all" | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

// export interface AmmyiTier {
//   name: AmmyiTierName;
//   price: number;
//   purpose: string;
//   visualContent: string;
//   color: {
//     primary: string;
//     secondary: string;
//     gradient: string;
//   };
//   icon: string;
//   benefits?: string[]; // ✅ Added to fix errors in NFTDetailsPage2
// }

// // User related types
// export interface User {
//   address: string;
//   username: string;
//   avatar: string;
//   bio?: string;
//   website?: string;
//   twitter?: string;
//   instagram?: string;
//   isVerified: boolean;
// }

// // Filter types
// export interface NFTFilters {
//   category?: string;
//   collection?: string;
//   tier?: AmmyiTierName;
//   minPrice?: number;
//   maxPrice?: number;
//   creator?: string;
//   status?: string;
//   search?: string;
//   type?: string;
// }

// export interface TokenFilters {
//   search?: string;
//   type?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   category?: string; // ✅ Add to fix ExplorePage category errors
//   collection?: string; // ✅ Add to fix ExplorePage collection errors
// }

// // Mint related types
// export interface MintFormData {
//   name: string;
//   description: string;
//   image: File | null;
//   imagePreview: string | null;
//   price: number;
//   currency: string;
//   collection: string;
//   category: string;
//   tier?: AmmyiTierName;
//   royalty: string;
// }

// // Used in tier categories
// export interface TiercatData {
//   id: string;
//   name: string;
//   description: string;
//   image: string | undefined;
//   tier: string;
//   category: string;
//   price: number; // ✅ Changed to string to match NFT price format
//   currency: string;
//   likes: number;
//   createdAt: string;
//   collection: string;
//   creator: {
//     id: string;
//     name: string;
//     username: string;
//     avatar: string;
//   };
//   attributes: {
//     trait_type: string;
//     value: string;
//   }[];
//   status?: string;
//   owner?: {
//     id: string;
//     name: string;
//     username: string;
//     avatar: string;
//   };
//   tokenId: string; // ✅ Uncommented to match NFT
//   blockchain: string; // ✅ Uncommented to match NFT
// }

// // Category Type
// export interface Category {
//   name: string;
//   image: string;
//   itemCount: number;
//   description?: string;
// }

// // types/index.ts
// export interface Creator {
//   id?: string; // ✅ Add this
//   name: string;
//   username: string;
//   avatar: string;
// }


// // NFT related types
// export interface NFTContextType {
//   fetchNFTs: (filters: NFTFilters) => Promise<NFT[]>;
//   fetchTokens: (filters: TokenFilters) => Promise<NFT[]>;
// }

// export interface NFT {
//   id: string;
//   name: string;
//   description: string;
//   image: string | null; // Allow null
//   price: number;
//   currency: string;
//   creator: {
//     name: string;
//     username: string;
//     avatar: string;
//   };
//   owner?: {
//     name: string;
//     username: string;
//     avatar: string;
//   };
//   collection: string;
//   category: string;
//   status?: string;
//   likes: number;
//   createdAt: string;
//   tokenId: string;
//   blockchain: string;
//   attributes: Array<{
//     trait_type: string;
//     value: string;
//   }>;
//   tier?: string;
//   endsIn?: string;
//   history?: NFTHistoryItem[];
//   bio?: string;
// }

// export interface TiercatData extends NFT {
//   perks: string[];
//   tier: AmmyiTierName;
//   creator: Creator;
// }

// export interface NFTCategory {
//   name: string;
//   image: string;
//   itemCount: number;
//   description?: string;
// }

// export interface NFTAttribute {
//   trait_type: string;
//   value: string | number;
// }

// export interface NFTHistoryItem {
//   id: string;
//   type: 'Mint' | 'List' | 'Sale' | 'Transfer' | 'Bid';
//   from: string;
//   to: string;
//   price: number;
//   currency?: string;
//   timestamp: string;
//   txHash?: string;
// }

// export interface NFTCollection {
//   name: string;
//   image: string;
//   itemCount: number;
//   floorPrice: number;
//   creator: {
//     name: string;
//     username: string;
//     avatar: string;
//   };
// }

// export type AmmyiTierName = "all" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

// export interface AmmyiTier {
//   name: AmmyiTierName;
//   price: number;
//   purpose: string;
//   visualContent: string;
//   color: {
//     primary: string;
//     secondary: string;
//     gradient: string;
//   };
//   icon: string;
//   benefits?: string[];
// }

// // export interface User {
// //   address: string;
// //   username: string;
// //   avatar: string;
// //   bio?: string;
// //   website?: string;
// //   twitter?: string;
// //   instagram?: string;
// //   isVerified: boolean;
// // }
// export interface User {
//   _id: string;
//   username: string;
//   email: string;
//   avatarUrl?: string;
//   // ✅ Add these fields:
//   bio?: string;
//   website?: string;
//   twitter?: string;
// }


// export interface NFTFilters {
//   category?: string;
//   collection?: string;
//   tier?: AmmyiTierName;
//   minPrice?: number;
//   maxPrice?: number;
//   creator?: string;
//   status?: string;
//   search?: string;
//   type?: string;
// }

// export interface TokenFilters {
//   search?: string;
//   type?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   category?: string;
//   collection?: string;
// }

// export interface MintFormData {
//   name: string;
//   description: string;
//   image: File | null;
//   imagePreview: string | null;
//   price: number;
//   currency: string;
//   collection: string;
//   category: string;
//   tier?: AmmyiTierName;
//   royalty: string;
// }


// export interface User {
//   address: string;
//   username: string;
//   avatar: string;
//   isVerified: boolean;
//   bio?: string;
//   website?: string;
//   twitter?: string;
//   instagram?: string;
// }


// types/index.ts

// ----------------------------
// General Types
// ----------------------------

export type AmmyiTierName = "all" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTHistoryItem {
  id: string;
  type: 'Mint' | 'List' | 'Sale' | 'Transfer' | 'Bid';
  from: string;
  to: string;
  price: number;
  currency?: string;
  timestamp: string;
  txHash?: string;
}

export interface Creator {
  id?: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Category {
  name: string;
  image: string;
  itemCount: number;
  description?: string;
}

// ----------------------------
// User Type
// ----------------------------

export interface User {
  _id?: string;
  address?: string;
  username: string;
  email?: string;
  avatar?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  bio?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
}

// ----------------------------
// NFT Types
// ----------------------------

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string | null; // Allow null or string
  price: number;
  currency: string;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
  owner?: {
    name: string;
    username: string;
    avatar: string;
  };
  collection: string;
  category: string;
  status?: string;
  likes: number;
  createdAt: string;
  tokenId: string;
  blockchain: string;
  attributes: Array<NFTAttribute>;
  tier?: AmmyiTierName;
  endsIn?: string;
  history?: NFTHistoryItem[];
  bio?: string; // Optional if needed
}

// Used in tier categories
export interface TiercatData extends NFT {
  perks: string[];
  tier: AmmyiTierName;
  creator: Creator;
}

// ----------------------------
// NFT Collection and Category
// ----------------------------

export interface NFTCollection {
  name: string;
  image: string;
  itemCount: number;
  floorPrice: number;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
}

export interface NFTCategory {
  name: string;
  image: string;
  itemCount: number;
  description?: string;
}

// ----------------------------
// Tier Definition
// ----------------------------

export interface AmmyiTier {
  name: AmmyiTierName;
  price: number;
  purpose: string;
  visualContent: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  icon: string;
  benefits?: string[];
}

// ----------------------------
// Contexts and Filters
// ----------------------------

export interface NFTContextType {
  fetchNFTs: (filters: NFTFilters) => Promise<NFT[]>;
  fetchTokens: (filters: TokenFilters) => Promise<NFT[]>;
}

export interface NFTFilters {
  category?: string;
  collection?: string;
  tier?: AmmyiTierName;
  minPrice?: number;
  maxPrice?: number;
  creator?: string;
  status?: string;
  search?: string;
  type?: string;
}

export interface TokenFilters {
  search?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  collection?: string;
}

// ----------------------------
// Mint
// ----------------------------

export interface MintFormData {
  name: string;
  description: string;
  image: File | null;
  imagePreview: string | null;
  price: number;
  currency: string;
  collection: string;
  category: string;
  tier?: AmmyiTierName;
  royalty: string;
}
