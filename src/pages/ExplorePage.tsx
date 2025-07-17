import { useState, useEffect } from "react";
import {
  useSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useNFT } from "../contexts/NFTContext";
import { NFT, NFTFilters, TokenFilters } from "../types";
import NFTCard from "../components/NFTCard";
import {
  Sliders as Slider,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  X,
  Users,
  Crown,
} from "lucide-react";
import PublicCategoriesSection from "../components/PublicCategoriesSection";

const ExplorePage = () => {
  const { fetchNFTs, fetchTokens, categories, collections } = useNFT();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get active tab from URL
  const activeTab = location.pathname.includes("/token") ? "token" : "nft";

  // Filters state - initialize based on URL params
  const [filters, setFilters] = useState<NFTFilters | TokenFilters>({
    category: searchParams.get("category") || undefined,
    collection: searchParams.get("collection") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    search: searchParams.get("search") || undefined,
    type: activeTab,
  });

  // Filter out AMMYI preminted categories
  const publicCategories = categories.filter(
    (cat) =>
      !["Bronze", "Silver", "Gold", "Platinum", "Diamond"].includes(cat.name)
  );

  // Load data based on active tab
  const loadData = async (tab = activeTab) => {
    setIsLoading(true);
  
    try {
      const searchTerm = (filters.search ?? "").toLowerCase();
  
      if (tab === "nft") {
        const fetchedNFTs = await fetchNFTs(filters);
  
        const filteredNFTs = filters.search
          ? fetchedNFTs.filter(
              (nft) =>
                nft.name?.toLowerCase().includes(searchTerm) ||
                nft.description?.toLowerCase().includes(searchTerm) ||
                nft.creator?.name?.toLowerCase().includes(searchTerm)
            )
          : fetchedNFTs;
  
        setNFTs(filteredNFTs.filter((nft) => !nft.tier));
      } else {
        let fetchedTokens: any[] = [];
  
        if (typeof fetchTokens === "function") {
          fetchedTokens = await fetchTokens(); // ✅ No arguments, per TS error
        }
  
        const filteredTokens = filters.search
          ? fetchedTokens.filter(
              (token) =>
                token.name?.toLowerCase().includes(searchTerm) ||
                token.symbol?.toLowerCase().includes(searchTerm)
            )
          : fetchedTokens;
  
        setTokens(filteredTokens);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  // Handle tab changes
  const handleTabChange = (tab: "nft" | "token") => {
    // Clear search term when switching tabs
    setSearchTerm("");

    // Update URL without affecting filters
    navigate(`/explore/${tab}?${searchParams.toString()}`);

    // Reload data for the new tab
    loadData(tab);
  };

  // Handle filter changes
  const handleFilterChange = (
    key: keyof (NFTFilters | TokenFilters),
    value: any
  ) => {
    const newFilters = { ...filters, [key]: value };
    if (value === "" || value === undefined) delete newFilters[key];
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, val]) => {
      if (val !== undefined && val !== "" && k !== "type") {
        params.set(k, String(val));
      }
    });
    setSearchParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    const newFilters = { type: activeTab };
    setFilters(newFilters);
    setSearchParams({});
    setSearchTerm("");
    loadData();
  };

  // Apply search filter
  const applySearch = () => {
    // Update filters with search term
    const newFilters = {
      ...filters,
      search: searchTerm || undefined,
    };

    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val !== undefined && val !== "" && key !== "type") {
        params.set(key, String(val));
      }
    });
    setSearchParams(params);

    // Trigger reload with new filters
    loadData();
  };

  // Load data when component mounts or URL params change
  useEffect(() => {
    loadData();
  }, [location.pathname, searchParams]);

  // Token table columns
  const tokenColumns = [
    { key: "index", label: "#", className: "text-left" },
    { key: "token", label: "Token", className: "text-left" },
    { key: "symbol", label: "Symbol", className: "text-left" },
    { key: "price", label: "Price", className: "text-left" },
    { key: "marketCap", label: "Market Cap", className: "text-left" },
    { key: "change24h", label: "24h Change", className: "text-left" },
    { key: "volume24h", label: "Volume (24h)", className: "text-left" },
    { key: "actions", label: "Actions", className: "text-left" },
  ];

  return (
    <div className="fade-in pt-9">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white text-gradient-green">
          {activeTab === "nft" ? "Explore NFTs" : "Explore Tokens"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          {activeTab === "nft"
            ? "Discover extraordinary NFTs from creators around the world."
            : "Browse and analyze various tokens in the marketplace."}
        </p>
      </div>

      {/* AMMYI Preminted Banner (only show for NFT tab) */}
      {activeTab === "nft" && (
        <div className="mb-8 sm:mb-12">
          <Link
            to="/ammyi-preminted"
            className="block cyber-card p-6 sm:p-8 bg-gradient-to-br from-golden/20 via-primary/10 to-deepGreen/20 dark:from-golden-dark/30 dark:via-primary-dark/20 dark:to-deepGreen-dark/30 rounded-2xl transition-all duration-300 hover:scale-105 glow-effect group"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Crown
                    className="text-golden mr-3 glow-effect floating-element"
                    size={32}
                  />
                  <h2 className="text-xl sm:text-2xl font-bold text-gradient-golden">
                    AMMYI Preminted NFTs
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                  Explore exclusive tier-based NFTs powered by AMMYI token with
                  environmental impact.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-golden/20 text-golden px-3 py-1 rounded-full text-xs font-medium">
                    5 Exclusive Tiers
                  </span>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    Limited Supply
                  </span>
                  <span className="bg-deepGreen/20 text-deepGreen px-3 py-1 rounded-full text-xs font-medium">
                    Eco-Friendly
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-golden group-hover:text-golden-light transition-colors font-bold text-lg">
                  View Collection →
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Categories Section (only show for NFT tab) */}
      {activeTab === "nft" && <PublicCategoriesSection />}

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 cyber-card p-6">
            <h2 className="font-bold text-lg mb-4 dark:text-white flex items-center">
              <Slider size={18} className="mr-2 text-golden" />
              Filters
            </h2>

            {/* Category filter (only for NFT tab) */}
            {activeTab === "nft" && (
              <div className="mb-6">
                <h3 className="font-medium mb-2 dark:text-white">Category</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      checked={!filters.category}
                      onChange={() => handleFilterChange("category", undefined)}
                      className="mr-2 accent-golden"
                    />
                    <label
                      htmlFor="all-categories"
                      className="text-gray-700 dark:text-gray-300 text-sm"
                    >
                      All Categories
                    </label>
                  </div>
                  {publicCategories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${index}`}
                        name="category"
                        checked={
                          filters.category === category.name.toLowerCase()
                        }
                        onChange={() =>
                          handleFilterChange(
                            "category",
                            category.name.toLowerCase()
                          )
                        }
                        className="mr-2 accent-golden"
                      />
                      <label
                        htmlFor={`category-${index}`}
                        className="text-gray-700 dark:text-gray-300 text-sm"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2 dark:text-white">Price Range</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minPrice",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="input-field text-sm w-1/2"
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxPrice",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="input-field text-sm w-1/2"
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full py-2 px-4 bg-gray-200 dark:bg-charcoal text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-darkGray transition-colors font-medium flex justify-center items-center text-sm glow-effect"
            >
              <X size={16} className="mr-2" /> Clear Filters
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow">
          {/* Search and view controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full md:w-auto relative flex-grow max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder={
                  activeTab === "nft"
                    ? "Search by name, description or creator..."
                    : "Search by token name or symbol..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applySearch()}
                className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-lg border border-gray-300 dark:border-charcoal dark:bg-darkGray dark:text-white text-sm focus:glow-effect transition-all duration-300"
              />
            </div>

            <div className="flex w-full md:w-auto justify-between md:justify-end items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center py-2 px-4 cyber-card rounded-lg text-sm glow-effect"
              >
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </button>

              {/* Tab switcher */}
              <div className="flex border border-gray-300 dark:border-charcoal rounded-lg overflow-hidden">
                <button
                  onClick={() => handleTabChange("nft")}
                  className={`p-2 transition-all duration-300 ${
                    activeTab === "nft"
                      ? "bg-golden text-trueBlack glow-effect"
                      : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                  }`}
                >
                  NFTs
                </button>
                <button
                  onClick={() => handleTabChange("token")}
                  className={`p-2 transition-all duration-300 ${
                    activeTab === "token"
                      ? "bg-golden text-trueBlack glow-effect"
                      : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Tokens
                </button>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 cyber-card p-4 sm:p-6">
              <h2 className="font-bold text-lg mb-4 dark:text-white flex items-center">
                <Slider size={18} className="mr-2 text-golden" />
                Filters
              </h2>

              {/* Category filter (only for NFT tab) */}
              {activeTab === "nft" && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2 dark:text-white">Category</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all-categories-mobile"
                        name="category-mobile"
                        checked={!filters.category}
                        onChange={() =>
                          handleFilterChange("category", undefined)
                        }
                        className="mr-2 accent-golden"
                      />
                      <label
                        htmlFor="all-categories-mobile"
                        className="text-gray-700 dark:text-gray-300 text-sm"
                      >
                        All Categories
                      </label>
                    </div>
                    {publicCategories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-mobile-${index}`}
                          name="category-mobile"
                          checked={
                            filters.category === category.name.toLowerCase()
                          }
                          onChange={() =>
                            handleFilterChange(
                              "category",
                              category.name.toLowerCase()
                            )
                          }
                          className="mr-2 accent-golden"
                        />
                        <label
                          htmlFor={`category-mobile-${index}`}
                          className="text-gray-700 dark:text-gray-300 text-sm"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Collection filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 dark:text-white">Collection</h3>
                <select
                  className="input-field text-sm"
                  value={filters.collection || ""}
                  onChange={(e) =>
                    handleFilterChange("collection", e.target.value)
                  }
                >
                  <option value="">All Collections</option>
                  {collections
                    .filter((c) => c.name !== "AMMYI Preminted")
                    .map((collection, index) => (
                      <option key={index} value={collection.name.toLowerCase()}>
                        {collection.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Price Range filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2 dark:text-white">
                  Price Range
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "minPrice",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="input-field text-sm w-1/2"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "maxPrice",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="input-field text-sm w-1/2"
                    min="0"
                  />
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 bg-gray-200 dark:bg-charcoal text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-darkGray transition-colors font-medium flex justify-center items-center text-sm glow-effect"
              >
                <X size={16} className="mr-2" /> Clear Filters
              </button>
            </div>
          )}

          {/* Tab content */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array(8)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="card animate-pulse loading-pulse">
                    <div className="w-full h-48 sm:h-64 bg-gray-300 dark:bg-charcoal rounded-t-xl"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 dark:bg-charcoal rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-charcoal rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (activeTab === "nft" && nfts.length === 0) ||
            (activeTab === "token" && tokens.length === 0) ? (
            <div className="text-center py-12 cyber-card">
              <div className="text-4xl sm:text-6xl mb-4 animate-float">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">
                No {activeTab === "nft" ? "NFTs" : "Tokens"} found
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
          ) : (
            <>
              {activeTab === "nft" ? (
                <>
                  <div className="flex justify-end mb-4">
                    <div className="flex border border-gray-300 dark:border-charcoal rounded-lg overflow-hidden">
                      <button
                        onClick={() => setIsGridView(true)}
                        className={`p-2 transition-all duration-300 ${
                          isGridView
                            ? "bg-golden text-trueBlack glow-effect"
                            : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                        }`}
                        aria-label="Grid view"
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        onClick={() => setIsGridView(false)}
                        className={`p-2 transition-all duration-300 ${
                          !isGridView
                            ? "bg-golden text-trueBlack glow-effect"
                            : "bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300"
                        }`}
                        aria-label="List view"
                      >
                        <List size={18} />
                      </button>
                    </div>
                  </div>

                  {isGridView ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {nfts.map((nft) => (
                        <NFTCard key={nft.id} nft={nft} isPremium={false} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {nfts.map((nft) => (
                        <div
                          key={nft.id}
                          className="card-glossy p-4 flex flex-col md:flex-row"
                        >
                          <div className="w-full md:w-48 h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-4 relative">
                            <img
                              src={nft.image ?? "/images/placeholder.png"}

                              alt={nft.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
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
                                <span className="bg-golden/20 text-golden text-xs px-2 py-1 rounded-full">
                                  {nft.category}
                                </span>
                                <span className="bg-gray-100 dark:bg-charcoal text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                                  {nft.collection}
                                </span>
                              </div>
                              <Link
                                to={`/nft/${nft.id}`}
                                className="text-golden hover:text-golden-dark font-medium text-sm transition-colors glow-effect"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="overflow-x-auto cyber-card p-4 sm:p-6">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100 dark:bg-charcoal">
                      <tr>
                        {tokenColumns.map((col) => (
                          <th
                            key={col.key}
                            className={`p-3 text-sm font-medium text-gray-700 dark:text-gray-300 ${col.className}`}
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {tokens.map((token, index) => (
                        <tr
                          key={token.id}
                          className="hover:bg-gray-50 dark:hover:bg-darkGray/50 transition-colors"
                        >
                          <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                            {index + 1}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <img
                                src={token.image}
                                alt={token.name}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <div>
                                <div className="font-medium dark:text-white">
                                  {token.name}
                                </div>
                                {token.collection && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {token.collection}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="font-mono font-medium text-sm dark:text-white">
                              {token.symbol}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-golden">
                              ${token.current_price?.toLocaleString() || "0"}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                            ${token.market_cap?.toLocaleString() || "0"}
                          </td>
                          <td
                            className={`p-3 text-sm font-medium ${
                              token.price_change_percentage_24h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {token.price_change_percentage_24h >= 0 ? "+" : ""}
                            {token.price_change_percentage_24h?.toFixed(2) ||
                              "0"}
                            %
                          </td>
                          <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                            ${token.total_volume?.toLocaleString() || "0"}
                          </td>
                          <td className="p-3">
                            <Link
                              to={`/token/${token.id}`}
                              className="text-sm text-golden hover:text-golden-dark font-medium glow-effect inline-block px-3 py-1 rounded-lg bg-golden/10 hover:bg-golden/20 transition-colors"
                            >
                              Trade
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {tokens.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        No Tokens found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Try adjusting your filters or search term
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
