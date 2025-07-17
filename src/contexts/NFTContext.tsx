// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { NFT, NFTCollection, NFTCategory, AmmyiTierName } from "../types";
// import { mockNFTs, ammyiTiers } from "../data/mockData";

// interface NFTContextType {
//   nfts: NFT[];
//   featuredNFTs: NFT[];
//   collections: NFTCollection[];
//   categories: NFTCategory[];
//   ammyiTiers: typeof ammyiTiers;
//   isLoading: boolean;
//   fetchNFTs: (filters?: any) => Promise<NFT[]>;
//   fetchNFTById: (id: string) => Promise<NFT | null>;
//   fetchAmmyiNFTs: (tier?: AmmyiTierName) => Promise<NFT[]>;
//   mintNFT: (nftData: Partial<NFT>) => Promise<boolean>;
//   purchaseNFT: (id: string) => Promise<boolean>;
// }

// const NFTContext = createContext<NFTContextType>({
//   nfts: [],
//   featuredNFTs: [],
//   collections: [],
//   categories: [],
//   ammyiTiers: [],
//   isLoading: true,
//   fetchNFTs: async () => [],
//   fetchNFTById: async () => null,
//   fetchAmmyiNFTs: async () => [],
//   mintNFT: async () => false,
//   purchaseNFT: async () => false,
// });

// export const useNFT = () => useContext(NFTContext);

// interface NFTProviderProps {
//   children: ReactNode;
// }

// export const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
//   const [nfts, setNFTs] = useState<NFT[]>([]);
//   const [featuredNFTs, setFeaturedNFTs] = useState<NFT[]>([]);
//   const [collections, setCollections] = useState<NFTCollection[]>([]);
//   const [categories, setCategories] = useState<NFTCategory[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initializeData = async () => {
//       setIsLoading(true);

//       // In a real app, this would be fetched from an API or smart contract
//       setNFTs(mockNFTs);

//       // Set featured NFTs (top 5 by price)
//       const featured = [...mockNFTs]
//         .sort((a, b) => Number(b.price) - Number(a.price))
//         .slice(0, 5);
//       setFeaturedNFTs(featured);

//       // Extract unique collections
//       const uniqueCollections = Array.from(
//         new Set(mockNFTs.map((nft) => nft.collection))
//       ).map((collectionName) => {
//         const collectionNFTs = mockNFTs.filter(
//           (nft) => nft.collection === collectionName
//         );
//         return {
//           name: collectionName,
//           image: collectionNFTs[0]?.image || "",
//           itemCount: collectionNFTs.length,
//           floorPrice: Math.min(
//             ...collectionNFTs.map((nft) => Number(nft.price))
//           ).toString(),
//           creator: collectionNFTs[0]?.creator || {
//             name: "Unknown",
//             username: "unknown",
//             avatar: "",
//           },
//         };
//       });

//       setCollections(uniqueCollections);

//       // Extract categories (including both tier names and regular categories)
//       const uniqueCategories = Array.from(
//         new Set(mockNFTs.map((nft) => nft.category))
//       ).map((categoryName) => {
//         const categoryNFTs = mockNFTs.filter(
//           (nft) => nft.category === categoryName
//         );
//         return {
//           name: categoryName,
//           image: categoryNFTs[0]?.image || "",
//           itemCount: categoryNFTs.length,
//         };
//       });

//       setCategories(uniqueCategories);
//       setIsLoading(false);
//     };

//     initializeData();
//   }, []);

//   const fetchNFTs = async (filters?: any): Promise<NFT[]> => {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     if (!filters) return nfts;

//     // Apply filters
//     let filteredNFTs = [...nfts];

//     if (filters.category) {
//       filteredNFTs = filteredNFTs.filter(
//         (nft) => nft.category.toLowerCase() === filters.category.toLowerCase()
//       );
//     }

//     if (filters.collection) {
//       filteredNFTs = filteredNFTs.filter(
//         (nft) =>
//           nft.collection.toLowerCase() === filters.collection.toLowerCase()
//       );
//     }

//     if (filters.tier) {
//       filteredNFTs = filteredNFTs.filter((nft) => nft.tier === filters.tier);
//     }

//     if (filters.minPrice !== undefined) {
//       filteredNFTs = filteredNFTs.filter(
//         (nft) => Number(nft.price) >= filters.minPrice
//       );
//     }

//     if (filters.maxPrice !== undefined) {
//       filteredNFTs = filteredNFTs.filter(
//         (nft) => Number(nft.price) <= filters.maxPrice
//       );
//     }

//     if (filters.creator) {
//       filteredNFTs = filteredNFTs.filter(
//         (nft) =>
//           nft.creator.username.toLowerCase() === filters.creator.toLowerCase()
//       );
//     }

//     return filteredNFTs;
//   };

//   const fetchAmmyiNFTs = async (tier?: AmmyiTierName): Promise<NFT[]> => {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 300));

//     let ammyiNFTs = nfts.filter(
//       (nft) => nft.tier && nft.collection === "AMMYI Preminted"
//     );

//     if (tier) {
//       ammyiNFTs = ammyiNFTs.filter((nft) => nft.tier === tier);
//     }

//     return ammyiNFTs;
//   };

//   const fetchNFTById = async (id: string): Promise<NFT | null> => {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 300));

//     const nft = nfts.find((nft) => nft.id === id) || null;
//     return nft;
//   };

//   const mintNFT = async (nftData: Partial<NFT>): Promise<boolean> => {
//     try {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // In a real app, this would interact with a smart contract
//       const newNFT: NFT = {
//         id: `nft-${Date.now()}`,
//         name: nftData.name || "Untitled NFT",
//         description: nftData.description || "",
//         image: nftData.image || "https://via.placeholder.com/500",
//         price: nftData.price || 0.01,
//         currency: nftData.currency || "AMMYI",
//         creator: nftData.creator || {
//           name: "Unknown",
//           username: "unknown",
//           avatar: "",
//         },
//         owner: nftData.creator || {
//           name: "Unknown",
//           username: "unknown",
//           avatar: "",
//         },
//         collection: nftData.collection || "Uncategorized",
//         category: nftData.category || "Other",
//         tier: nftData.tier,
//         status: "Minted",
//         likes: 0,
//         createdAt: new Date().toISOString(),
//         tokenId: `${Math.floor(Math.random() * 1000000)}`,
//         blockchain: "Polygon",
//         attributes: nftData.attributes || [],
//       };

//       setNFTs((prev) => [...prev, newNFT]);
//       return true;
//     } catch (error) {
//       console.error("Error minting NFT:", error);
//       return false;
//     }
//   };

//   const purchaseNFT = async (id: string): Promise<boolean> => {
//     try {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // In a real app, this would interact with a smart contract
//       setNFTs((prev) =>
//         prev.map((nft) =>
//           nft.id === id
//             ? {
//                 ...nft,
//                 status: "Sold",
//                 owner: { name: "You", username: "you", avatar: "" },
//               }
//             : nft
//         )
//       );

//       return true;
//     } catch (error) {
//       console.error("Error purchasing NFT:", error);
//       return false;
//     }
//   };

//   return (
//     <NFTContext.Provider
//       value={{
//         nfts,
//         featuredNFTs,
//         collections,
//         categories,
//         ammyiTiers,
//         isLoading,
//         fetchNFTs,
//         fetchNFTById,
//         fetchAmmyiNFTs,
//         mintNFT,
//         purchaseNFT,
//       }}
//     >
//       {children}
//     </NFTContext.Provider>
//   );
// };


import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  NFT,
  NFTCollection,
  NFTCategory,
  AmmyiTierName,
  User,
} from "../types";
import { mockNFTs, ammyiTiers } from "../data/mockData";

interface NFTContextType {
  nfts: NFT[];
  featuredNFTs: NFT[];
  collections: NFTCollection[];
  categories: NFTCategory[];
  ammyiTiers: typeof ammyiTiers;
  isLoading: boolean;
  fetchNFTs: (filters?: any) => Promise<NFT[]>;
  fetchNFTById: (id: string) => Promise<NFT | null>;
  fetchAmmyiNFTs: (tier?: AmmyiTierName) => Promise<NFT[]>;
  mintNFT: (nftData: Partial<NFT>) => Promise<boolean>;
  purchaseNFT: (id: string) => Promise<boolean>;
  fetchTokens?: () => Promise<NFT[]>; // Optional fetchTokens added
}

const NFTContext = createContext<NFTContextType>({
  nfts: [],
  featuredNFTs: [],
  collections: [],
  categories: [],
  ammyiTiers: [],
  isLoading: true,
  fetchNFTs: async () => [],
  fetchNFTById: async () => null,
  fetchAmmyiNFTs: async () => [],
  mintNFT: async () => false,
  purchaseNFT: async () => false,
  fetchTokens: async () => [], // Optional default
});

export const useNFT = () => useContext(NFTContext);

interface NFTProviderProps {
  children: ReactNode;
}

export const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [featuredNFTs, setFeaturedNFTs] = useState<NFT[]>([]);
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [categories, setCategories] = useState<NFTCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      setNFTs(mockNFTs);

      const featured = [...mockNFTs]
        .sort((a, b) => Number(b.price) - Number(a.price))
        .slice(0, 5);
      setFeaturedNFTs(featured);

      const uniqueCollections = Array.from(
        new Set(mockNFTs.map((nft) => nft.collection))
      ).map((collectionName) => {
        const collectionNFTs = mockNFTs.filter(
          (nft) => nft.collection === collectionName
        );
        return {
          name: collectionName,
          image: collectionNFTs[0]?.image || "",
          itemCount: collectionNFTs.length,
          floorPrice: Math.min(
            ...collectionNFTs.map((nft) => Number(nft.price))
          ), // 🔧 changed to number
          creator: collectionNFTs[0]?.creator || {
            name: "Unknown",
            username: "unknown",
            avatar: "",
          },
        };
      });

      setCollections(uniqueCollections);

      const uniqueCategories = Array.from(
        new Set(mockNFTs.map((nft) => nft.category))
      ).map((categoryName) => {
        const categoryNFTs = mockNFTs.filter(
          (nft) => nft.category === categoryName
        );
        return {
          name: categoryName,
          image: categoryNFTs[0]?.image || "",
          itemCount: categoryNFTs.length,
        };
      });

      setCategories(uniqueCategories);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  const fetchNFTs = async (filters?: any): Promise<NFT[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!filters) return nfts;

    let filteredNFTs = [...nfts];

    if (filters.category) {
      filteredNFTs = filteredNFTs.filter(
        (nft) => nft.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.collection) {
      filteredNFTs = filteredNFTs.filter(
        (nft) =>
          nft.collection.toLowerCase() === filters.collection.toLowerCase()
      );
    }

    if (filters.tier) {
      filteredNFTs = filteredNFTs.filter((nft) => nft.tier === filters.tier);
    }

    if (filters.minPrice !== undefined) {
      filteredNFTs = filteredNFTs.filter(
        (nft) => Number(nft.price) >= filters.minPrice
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredNFTs = filteredNFTs.filter(
        (nft) => Number(nft.price) <= filters.maxPrice
      );
    }

    if (filters.creator) {
      filteredNFTs = filteredNFTs.filter(
        (nft) =>
          nft.creator.username.toLowerCase() === filters.creator.toLowerCase()
      );
    }

    return filteredNFTs;
  };

  const fetchAmmyiNFTs = async (tier?: AmmyiTierName): Promise<NFT[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let ammyiNFTs = nfts.filter(
      (nft) => nft.tier && nft.collection === "AMMYI Preminted"
    );

    if (tier) {
      ammyiNFTs = ammyiNFTs.filter((nft) => nft.tier === tier);
    }

    return ammyiNFTs;
  };

  const fetchNFTById = async (id: string): Promise<NFT | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return nfts.find((nft) => nft.id === id) || null;
  };

  const mintNFT = async (nftData: Partial<NFT>): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newNFT: NFT = {
        id: `nft-${Date.now()}`,
        name: nftData.name || "Untitled NFT",
        description: nftData.description || "",
        image: nftData.image ?? "https://via.placeholder.com/500", // 🔧 fix for null
        price: nftData.price || 0.01,
        currency: nftData.currency || "AMMYI",
        creator: nftData.creator || {
          name: "Unknown",
          username: "unknown",
          avatar: "",
        },
        owner: nftData.creator || {
          name: "Unknown",
          username: "unknown",
          avatar: "",
        },
        collection: nftData.collection || "Uncategorized",
        category: nftData.category || "Other",
        tier: nftData.tier,
        status: "Minted",
        likes: 0,
        createdAt: new Date().toISOString(),
        tokenId: `${Math.floor(Math.random() * 1000000)}`,
        blockchain: "Polygon",
        attributes: nftData.attributes || [],
      };

      setNFTs((prev) => [...prev, newNFT]);
      return true;
    } catch (error) {
      console.error("Error minting NFT:", error);
      return false;
    }
  };

  const purchaseNFT = async (id: string): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNFTs((prev) =>
        prev.map((nft) =>
          nft.id === id
            ? {
                ...nft,
                status: "Sold",
                owner: { name: "You", username: "you", avatar: "" },
              }
            : nft
        )
      );

      return true;
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      return false;
    }
  };

  const fetchTokens = async (): Promise<NFT[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return nfts;
  };

  return (
    <NFTContext.Provider
      value={{
        nfts,
        featuredNFTs,
        collections,
        categories,
        ammyiTiers,
        isLoading,
        fetchNFTs,
        fetchNFTById,
        fetchAmmyiNFTs,
        mintNFT,
        purchaseNFT,
        fetchTokens,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

