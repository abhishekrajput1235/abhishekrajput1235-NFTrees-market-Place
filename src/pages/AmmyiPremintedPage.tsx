import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useNFT } from "../contexts/NFTContext";
import { NFT, AmmyiTierName, TiercatData } from "../types";
import { ammyiTiers } from "../data/mockData";
import { tierCategoriesData } from "../data/mockData";

import {
  Crown,
  Zap,
  Filter,
  Grid,
  List,
  Search,
  X,
  Star,
  TrendingUp,
  Award,
  Image,
  Coins,
} from "lucide-react";
import NFTCard1 from "../components/NFTCard1";

// Tier categories with all possible NFT categories
const tierCategories = {
  Bronze: [
    "Cyberpunk Warrior",
    "Robot Dog",
    "Alien Creature",
    "Mystic Owl",
    "Astronaut Monkey",
    "Neon Cat",
    "Robot Fairy",
    "Graffiti Monkey",
    "Arctic Fox",
    "Jungle Hunter",
    "Zombie Punk",
    "Glowing Octopus",
    "Mechanical Spider",
    "Clockwork Rat",
    "Solar Bunny",
    "Shadow Giraffe",
    "Cyber Toad",
    "Toxic Rabbit",
    "Rain Frog",
    "Robot Ant",
    "Dream Elephant",
    "Mecha Sloth",
    "Fire Fox",
    "Pixel Wolf",
    "Cyber Bunny",
  ],
  Silver: [
    "Fantasy Elf",
    "Steampunk Engineer",
    "Space Cowboy",
    "Vampire Knight",
    "Samurai Panda",
    "Desert Wizard",
    "Moon Princess",
    "Electric Falcon",
    "Mushroom Mage",
    "Mermaid Hacker",
    "Cyber Pirate",
    "Ice Golem",
    "Dragonfly Drone",
    "Magic Deer",
    "Shadow Fairy",
    "Ice Serpent",
    "Neon Jellyfish",
    "Cloud Guardian",
    "AI Beast",
    "Robot Lizard",
    "Time Traveler",
    "Nuclear Bear",
    "Starfish King",
    "Sky Whale",
    "Flaming Lizard",
  ],
  Gold: [
    "Ancient Samurai",
    "Cyber Angel",
    "Ghost Ninja",
    "Dragon Mage",
    "Dark Elf",
    "Golden Tiger",
    "Golem Guardian",
    "Cursed Knight",
    "Mystic Leopard",
    "Android Samurai",
    "Eclipse Panther",
    "Ocean Guard",
    "Steel Rhino",
    "Woodland Spirit",
    "Glitch Demon",
    "Hologram Angel",
    "Iron Raven",
    "Lunar Tiger",
    "Virtual Wizard",
    "Shadow Hunter",
    "Night Wizard",
    "Mystic Cactus",
    "Magic Chameleon",
    "Electric Shark",
    "Burning Panda",
  ],
  Platinum: [
    "Dragon Shark",
    "Astral Phoenix",
    "Demon Slayer",
    "Lava Beast",
    "Sun God",
    "Sea Serpent",
    "Spark Phoenix",
    "Cyber Crow",
    "Bioluminescent Bat",
    "Warp Fox",
    "Ghost Robot",
    "Plasma Turtle",
    "Steel Eagle",
    "Quantum Serpent",
    "Titan Panther",
    "Rainbow Dragon",
    "Neon Bull",
    "Mecha Falcon",
    "Thunder Gorilla",
    "Shifting Seraph",
    "Solar Tiger",
    "Phantom Horse",
    "Glowing Raptor",
    "Firestorm Deer",
    "Bio Dragon",
  ],
  Diamond: [
    "Futuristic Samurai",
    "Ancient Pharaoh",
    "Alien Pharaoh",
    "Cosmic Shark",
    "Cyber Horse",
    "Mecha Lion",
    "Cyber Phoenix",
    "Samurai Dolphin",
    "Astronaut Dragon",
    "Godlike Panther",
    "Moonlight Yeti",
    "AI Overlord",
    "Techno Wizard",
    "Titan Robot",
    "Void Knight",
    "Radiant Golem",
    "Fire Phoenix God",
    "Quantum Leopard",
    "Eternal Serpent",
    "Ultra AI Beast",
    "Cyber Angel King",
    "Infinite Dragon",
    "Stellar Sorcerer",
    "AI Hydra",
    "Time Owl",
    "Hyper Nova Cat",
    "Supernova Rabbit",
    "Genesis Horse",
    "Holo Commander",
    "Singularity Wolf",
    "Omega Crow",
    "Celestial Tiger",
    "Galactic Unicorn",
    "Iron Phantom",
    "Legendary Griffin",
    "Meta Toad",
    "Primal Dragon",
    "Lightborn Deer",
    "Ultra Demon Fox",
    "Star Golem",
    "Gold Serpent",
    "Eternal Eagle",
    "Icebound Mecha",
    "Cosmic Titan",
    "Intergalactic Falcon",
    "Dawn Knight",
    "Void Elf",
    "Blaze Mecha Cat",
    "Divine Raptor",
    "Planet Killer",
    "Bold Beauties",
  ],
};

// Mock token data
const mockTokens = [
  {
    id: "1",
    name: "AMMYI Token",
    symbol: "AMMYI",
    logo: "/images/tokens/ammyi.png",
    price: 1.25,
    volume: 1250000,
    change: 5.2,
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    logo: "/images/tokens/ethereum.png",
    price: 1850.42,
    volume: 8500000,
    change: -1.8,
  },
  {
    id: "3",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/images/tokens/bitcoin.png",
    price: 29500.75,
    volume: 15000000,
    change: 2.4,
  },
];

const AmmyiPremintedPage = () => {
  const { fetchNFTs } = useNFT();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<AmmyiTierName | "all">(
    "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "price-low" | "price-high" | "newest" | "popular"
  >("newest");
  const [activeTab, setActiveTab] = useState<"nfts" | "tokens">("nfts");
  const [tokenSortBy, setTokenSortBy] = useState<
    "name" | "price" | "volume" | "change"
  >("name");
  const [tokenSortDirection, setTokenSortDirection] = useState<"asc" | "desc">(
    "asc"
  );

  // Use the imported tierCategoriesData as mockNFTs
  const mockNFTs = tierCategoriesData as TiercatData[];

  const fetchTokens = async () => {
    return mockTokens;
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      const tierParam = searchParams.get("tier") as AmmyiTierName;
      if (tierParam && ammyiTiers.find((t) => t.name === tierParam)) {
        setSelectedTier(tierParam);
      }

      if (activeTab === "nfts") {
        // Use the imported mockNFTs data
        const allNFTs = mockNFTs;

        let filtered = [...allNFTs];

        // Tier filter
        if (selectedTier !== "all") {
          filtered = filtered.filter((nft) => nft.tier === selectedTier);

          // If a category is selected, filter by it
          if (selectedCategory !== "all") {
            filtered = filtered.filter(
              (nft) => nft.category === selectedCategory
            );
          }
        }

        // Search filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (nft) =>
              nft.name.toLowerCase().includes(term) ||
              nft.description.toLowerCase().includes(term) ||
              nft.creator.name.toLowerCase().includes(term)
          );
        }

        // Apply sorting
        filtered.sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return Number(a.price) - Number(b.price);
            case "price-high":
              return Number(b.price) - Number(a.price);
            case "popular":
              return (b.likes || 0) - (a.likes || 0);
            case "newest":
            default:
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
          }
        });

        setFilteredNfts(filtered as unknown as NFT[]);
        setNfts(allNFTs as unknown as NFT[]);
      } else {
        // Token data loading
        const tokenData = await fetchTokens();
        const sortedTokens = [...tokenData].sort((a, b) => {
          if (tokenSortBy === "name") {
            return tokenSortDirection === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else {
            return tokenSortDirection === "asc"
              ? (a[tokenSortBy] || 0) - (b[tokenSortBy] || 0)
              : (b[tokenSortBy] || 0) - (a[tokenSortBy] || 0);
          }
        });
        setTokens(sortedTokens);
      }

      setIsLoading(false);
    };

    loadData();
  }, [
    selectedTier,
    selectedCategory,
    searchTerm,
    sortBy,
    searchParams,
    activeTab,
    tokenSortBy,
    tokenSortDirection,
  ]);
  const navigate = useNavigate();

  const handleCardClick = (nft: NFT) => {
    console.log("Selected NFT:", nft);
    console.log("Navigating to NFT details page for ID:", nft.id);
    // Add any analytics tracking herenavigate(`/nft-tier/${item.id}`);
  };

  const handleTierFilter = (tier: AmmyiTierName | "all") => {
    setSelectedTier(tier);
    setSelectedCategory("all");
    const params = new URLSearchParams();
    if (tier !== "all") params.set("tier", tier);
    setSearchParams(params);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSelectedTier("all");
    setSelectedCategory("all");
    setSearchTerm("");
    setSortBy("newest");
    setSearchParams({});
  };

  const getTierColor = (tierName: AmmyiTierName) => {
    const tier = ammyiTiers.find((t) => t.name === tierName);
    return tier?.color.gradient || "from-gray-400 to-gray-600";
  };

  const getTierStats = () => {
    return ammyiTiers.map((tier) => {
      const tierNFTs = nfts.filter((nft) => nft?.tier === tier.name);
      return {
        ...tier,
        count: tierNFTs.length,
        totalValue: tierNFTs.reduce(
          (sum, nft) => sum + Number(nft?.price || 0),
          0
        ),
      };
    });
  };

  const sortTokens = (key: "name" | "price" | "volume" | "change") => {
    if (tokenSortBy === key) {
      setTokenSortDirection(tokenSortDirection === "asc" ? "desc" : "asc");
    } else {
      setTokenSortBy(key);
      setTokenSortDirection("asc");
    }
  };

  const getCategoriesForTier = (tier: AmmyiTierName | "all") => {
    return tier === "all" ? [] : tierCategories[tier] || [];
  };

  return (
    <div className="fade-in pt-7">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-golden/20 via-primary/10 to-deepGreen/20 dark:from-golden-dark/30 dark:via-primary-dark/20 dark:to-deepGreen-dark/30 rounded-2xl lg:rounded-3xl mb-8 glow-effect">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Crown className="text-golden mr-4 glow-effect" size={48} />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-golden">
                AMMYI Preminted NFTs
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Exclusive tier-based NFTs with unique benefits and environmental
              impact
            </p>
          </div>
        </div>
      </div>

      {/* Tier Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {getTierStats().map((tier) => (
          <div
            key={tier.name}
            className={`cyber-card p-4 glow-effect bg-gradient-to-br ${tier.color.gradient}`}
          >
            <div className="flex items-center mb-3">
              <span className="mr-2">{tier.icon}</span>
              <h3 className="font-bold text-lg text-white">{tier.name}</h3>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-white/80">NFTs Available</p>
                <p className="font-bold text-white text-xl">{tier.count}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Floor Price</p>
                <p className="font-bold text-white text-xl">${tier.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleTierFilter(tier.name)}
              className="mt-4 w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
            >
              View {tier.name} NFTs
            </button>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-charcoal mb-6">
        <button
          onClick={() => setActiveTab("nfts")}
          className={`px-4 py-3 font-medium flex items-center ${
            activeTab === "nfts"
              ? "text-golden border-b-2 border-golden"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Image size={18} className="mr-2" />
          NFTs
        </button>
        <button
          onClick={() => setActiveTab("tokens")}
          className={`px-4 py-3 font-medium flex items-center ${
            activeTab === "tokens"
              ? "text-golden border-b-2 border-golden"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Coins size={18} className="mr-2" />
          Tokens
        </button>
      </div>

      {activeTab === "nfts" ? (
        <>
          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 cyber-card p-6 glow-effect">
                <h2 className="font-bold text-lg mb-4 dark:text-white flex items-center">
                  <Filter size={18} className="mr-2 text-golden" />
                  {selectedTier === "all" ? "Filters" : "Categories"}
                </h2>

                {selectedTier === "all" ? (
                  <>
                    <div className="mb-6">
                      <h3 className="font-medium mb-3 dark:text-white">Tier</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleTierFilter("all")}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                            selectedTier === "all"
                              ? "bg-golden text-trueBlack"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal"
                          }`}
                        >
                          All Tiers
                        </button>
                        {ammyiTiers.map((tier) => (
                          <button
                            key={tier.name}
                            onClick={() => handleTierFilter(tier.name)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center ${
                              selectedTier === tier.name
                                ? "bg-golden text-trueBlack"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal"
                            }`}
                          >
                            <span className="mr-2">{tier.icon}</span>
                            {tier.name} (${tier.price})
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium mb-3 dark:text-white">
                        Sort By
                      </h3>
                      <select
                        className="input-field text-sm w-full"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 dark:text-white">
                      {selectedTier} Categories
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {getCategoriesForTier(selectedTier).map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryFilter(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                            selectedCategory === category
                              ? "bg-golden text-trueBlack"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-4 bg-gray-200 dark:bg-charcoal text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-darkGray transition-colors font-medium flex justify-center items-center text-sm"
                >
                  <X size={16} className="mr-2" /> Clear Filters
                </button>
              </div>
            </div>

            {/* NFT Display Area */}
            <div className="flex-grow">
              {/* Search and Controls */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="w-full md:w-auto relative flex-grow max-w-md">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search AMMYI NFTs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-lg border border-gray-300 dark:border-charcoal dark:bg-darkGray dark:text-white text-sm focus:glow-effect"
                  />
                </div>

                <div className="flex w-full md:w-auto justify-between md:justify-end items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center py-2 px-4 cyber-card rounded-lg text-sm"
                  >
                    <Filter size={18} className="mr-2" />
                    {selectedTier === "all" ? "Filters" : "Categories"}
                  </button>

                  <div className="flex border border-gray-300 dark:border-charcoal rounded-lg overflow-hidden">
                    <button
                      onClick={() => setIsGridView(true)}
                      className={`p-2 ${
                        isGridView
                          ? "bg-golden text-trueBlack"
                          : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setIsGridView(false)}
                      className={`p-2 ${
                        !isGridView
                          ? "bg-golden text-trueBlack"
                          : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 cyber-card p-4 sm:p-6 glow-effect">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg dark:text-white">
                      {selectedTier === "all" ? "Filters" : "Categories"}
                    </h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X
                        size={20}
                        className="text-gray-600 dark:text-gray-400"
                      />
                    </button>
                  </div>

                  {selectedTier === "all" ? (
                    <>
                      <div className="mb-6">
                        <h3 className="font-medium mb-3 dark:text-white">
                          Tier
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleTierFilter("all")}
                            className={`py-2 px-3 text-sm rounded-lg ${
                              selectedTier === "all"
                                ? "bg-golden text-trueBlack"
                                : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            All Tiers
                          </button>
                          {ammyiTiers.map((tier) => (
                            <button
                              key={tier.name}
                              onClick={() => handleTierFilter(tier.name)}
                              className={`py-2 px-3 text-sm rounded-lg flex items-center justify-center ${
                                selectedTier === tier.name
                                  ? "bg-golden text-trueBlack"
                                  : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              <span className="mr-1">{tier.icon}</span>
                              {tier.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-medium mb-3 dark:text-white">
                          Sort By
                        </h3>
                        <select
                          className="input-field text-sm w-full"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                        >
                          <option value="newest">Newest First</option>
                          <option value="popular">Most Popular</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3 dark:text-white">
                        {selectedTier} Categories
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {getCategoriesForTier(selectedTier).map((category) => (
                          <button
                            key={category}
                            onClick={() => handleCategoryFilter(category)}
                            className={`py-2 px-3 text-sm rounded-lg ${
                              selectedCategory === category
                                ? "bg-golden text-trueBlack"
                                : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={clearFilters}
                    className="w-full py-2 px-4 bg-gray-200 dark:bg-charcoal text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-darkGray transition-colors font-medium flex justify-center items-center text-sm"
                  >
                    <X size={16} className="mr-2" /> Clear Filters
                  </button>
                </div>
              )}

              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold dark:text-white">
                    {selectedTier === "all"
                      ? "All AMMYI NFTs"
                      : selectedCategory === "all"
                      ? `${selectedTier} Tier NFTs`
                      : `${selectedCategory} (${selectedTier} Tier)`}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredNfts.length} NFT
                    {filteredNfts.length !== 1 ? "s" : ""} found
                  </p>
                </div>
                {selectedTier !== "all" && (
                  <div className="cyber-card px-4 py-2 bg-gradient-to-r from-golden/20 to-golden-dark/20">
                    <span className="text-golden-dark dark:text-golden-light font-bold text-sm">
                      ${ammyiTiers.find((t) => t.name === selectedTier)?.price}{" "}
                      AMMYI
                    </span>
                  </div>
                )}
              </div>

              {/* NFT Display */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {Array(8)
                    .fill(null)
                    .map((_, index) => (
                      <div key={index} className="card animate-pulse">
                        <div className="w-full h-48 sm:h-64 bg-gray-300 dark:bg-charcoal rounded-t-xl"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-300 dark:bg-charcoal rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-300 dark:bg-charcoal rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : filteredNfts.length === 0 ? (
                <div className="text-center py-12 cyber-card rounded-xl glow-effect">
                  <div className="text-4xl sm:text-6xl mb-4 animate-float">
                    👑
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">
                    No AMMYI NFTs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
                    Try adjusting your filters or search term
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary glow-effect"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : isGridView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredNfts.map((nft) => (
                    <Link
                      key={nft.id}
                      to={`/nft-tier/${nft.id}`}
                      onClick={() => handleCardClick(nft)}
                    >
                      <NFTCard1 nft={nft} isPremium={true} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNfts.map((nft) => (
                    <Link to={`/nft-tier/${nft.id}`} key={nft.id}>
                      <div className="cyber-card p-4 flex flex-col md:flex-row glow-effect">
                        <div className="w-full md:w-48 h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-4 relative">
                          <img
                            src={nft.image ?? "/images/placeholder.png"}

                            alt={nft.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2">
                            <div
                              className={`bg-gradient-to-r ${getTierColor(
                                nft.tier as AmmyiTierName
                              )} text-white px-2 py-1 rounded-full text-xs font-bold`}
                            >
                              {nft.tier} - ${nft.price} AMMYI
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row justify-between items-start">
                            <div className="mb-4 sm:mb-0">
                              <h3 className="font-bold text-lg mb-1 dark:text-white">
                                {nft.name}
                              </h3>
                              <div className="flex items-center mb-2">
                                <img
                                  src={nft.creator.avatar}
                                  alt={nft.creator.name}
                                  className="w-6 h-6 rounded-full mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  @{nft.creator.username}
                                </span>
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Current price
                              </p>
                              <p className="font-bold text-golden">
                                {nft.price} {nft.currency}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {nft.description}
                          </p>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={`bg-gradient-to-r ${getTierColor(
                                  nft.tier as AmmyiTierName
                                )} text-white text-xs px-2 py-1 rounded-full font-medium`}
                              >
                                {nft.tier}
                              </span>
                              <span className="bg-gray-100 dark:bg-charcoal text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                                {nft.category}
                              </span>
                            </div>
                            <div className="text-golden hover:text-golden-dark font-medium text-sm transition-colors glow-effect">
                              View Details
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="cyber-card p-4 sm:p-6 glow-effect">
          {/* Tokens Tab Content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="w-full md:w-auto relative flex-grow max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-lg border border-gray-300 dark:border-charcoal dark:bg-darkGray dark:text-white text-sm focus:glow-effect"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                  Sort:
                </span>
                <select
                  className="input-field text-sm"
                  value={tokenSortBy}
                  onChange={(e) => setTokenSortBy(e.target.value as any)}
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="volume">Volume</option>
                  <option value="change">24h Change</option>
                </select>
              </div>

              <button
                onClick={() =>
                  setTokenSortDirection(
                    tokenSortDirection === "asc" ? "desc" : "asc"
                  )
                }
                className="p-2 bg-gray-100 dark:bg-charcoal rounded-lg"
              >
                {tokenSortDirection === "asc" ? "↑ Asc" : "↓ Desc"}
              </button>
            </div>
          </div>
          {/* Tokens Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-charcoal">
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-golden"
                    onClick={() => sortTokens("name")}
                  >
                    <div className="flex items-center">
                      Token
                      {tokenSortBy === "name" && (
                        <span className="ml-1">
                          {tokenSortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-golden"
                    onClick={() => sortTokens("price")}
                  >
                    <div className="flex items-center">
                      Price
                      {tokenSortBy === "price" && (
                        <span className="ml-1">
                          {tokenSortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-golden"
                    onClick={() => sortTokens("volume")}
                  >
                    <div className="flex items-center">
                      24h Volume
                      {tokenSortBy === "volume" && (
                        <span className="ml-1">
                          {tokenSortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-golden"
                    onClick={() => sortTokens("change")}
                  >
                    <div className="flex items-center">
                      24h Change
                      {tokenSortBy === "change" && (
                        <span className="ml-1">
                          {tokenSortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-golden"></div>
                      </div>
                    </td>
                  </tr>
                ) : (tokens || []).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        No tokens found
                      </div>
                    </td>
                  </tr>
                ) : (
                  (tokens || []).map((token) => (
                    <tr
                      key={token?.id}
                      className="border-b border-gray-100 dark:border-charcoal hover:bg-gray-50 dark:hover:bg-darkGray/50"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img
                            src={token?.logo}
                            alt={token?.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="font-medium dark:text-white">
                              {token?.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {token?.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium dark:text-white">
                          ${token?.price?.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium dark:text-white">
                          ${token?.volume?.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`font-medium ${
                            token?.change >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {token?.change >= 0 ? "+" : ""}
                          {token?.change?.toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button className="btn-primary glow-effect text-sm py-1 px-3">
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <section className="mt-12 sm:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 dark:text-white text-center">
          Tier Benefits & Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="cyber-card p-6 bg-gradient-to-br from-golden/10 to-golden-dark/10 dark:from-golden-light/20 dark:to-golden/20 glow-effect">
            <div className="flex items-center mb-4">
              <Star className="text-golden mr-3 glow-effect" size={24} />
              <h3 className="text-lg font-bold text-golden-dark dark:text-golden-light">
                Exclusive Access
              </h3>
            </div>
            <p className="text-golden dark:text-golden-light text-xs">
              Higher tier NFTs grant access to exclusive events, early drops,
              and premium marketplace features.
            </p>
          </div>

          <div className="cyber-card p-6 bg-gradient-to-br from-primary/10 to-deepGreen/10 dark:from-primary-dark/20 dark:to-deepGreen-dark/20 glow-effect">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-primary mr-3 glow-effect" size={24} />
              <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light">
                Investment Potential
              </h3>
            </div>
            <p className="text-primary dark:text-primary-light text-xs">
              Limited supply and increasing demand make AMMYI NFTs valuable
              long-term investments.
            </p>
          </div>

          <div className="cyber-card p-6 bg-gradient-to-br from-deepGreen/10 to-primary/10 dark:from-deepGreen-dark/20 dark:to-primary-dark/20 glow-effect">
            <div className="flex items-center mb-4">
              <Award className="text-deepGreen mr-3 glow-effect" size={24} />
              <h3 className="text-lg font-bold text-deepGreen dark:text-primary-light">
                Environmental Impact
              </h3>
            </div>
            <p className="text-deepGreen dark:text-primary-light text-xs">
              Every purchase contributes to real-world environmental
              conservation and tree planting initiatives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmmyiPremintedPage;
