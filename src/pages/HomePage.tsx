import { useState } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { ArrowRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import NFTCard from "../components/NFTCard";
import { useNFT } from "../contexts/NFTContext";
import CategoriesSection from "../components/CategoriesSection";

const HomePage = () => {
  const { isConnected } = useAccount();
  const { featuredNFTs, categories, collections } = useNFT();
  const [activeTab, setActiveTab] = useState("featured");

  return (
    <div className="fade-in  w-full mx-auto space-y-12 sm:space-y-16 black">
      <HeroSection />

      {/* Featured NFTs Section */}
      <section className="pt-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">
              Trending NFTs
            </h2>
            <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-golden to-primary rounded-full" />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "featured"
                  ? "bg-gradient-to-r from-golden to-golden-dark text-trueBlack glow-effect"
                  : "bg-gray-100 dark:bg-charcoal text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-darkGray"
              } hover:glow-effect`}
              onClick={() => setActiveTab("featured")}
            >
              Featured
            </button>
            <button
              className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "recent"
                  ? "bg-gradient-to-r from-golden to-golden-dark text-trueBlack glow-effect"
                  : "bg-gray-100 dark:bg-charcoal text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-darkGray"
              } hover:glow-effect`}
              onClick={() => setActiveTab("recent")}
            >
              Recent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {featuredNFTs.slice(0, 8).map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/explore/nft"
            className="inline-flex items-center btn-outline glow-effect hover:shadow-golden/20"
          >
            View All NFTs
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Collections Section */}
      <section className="py-8">
        <div className="relative mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">
            Popular Collections
          </h2>
          <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-primary to-golden rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.slice(0, 3).map((collection, index) => (
            <Link
              key={index}
              to={`/explore?collection=${collection.name.toLowerCase()}`}
              className="cyber-card p-5 sm:p-6 hover:border-golden transition-all duration-300 group hover:transform hover:-translate-y-1"
            >
              <div className="relative h-40 sm:h-48 mb-5 rounded-lg overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="glossy-overlay"></div>
              </div>
              <div className="flex items-center mb-4">
                <div className="relative mr-3">
                  <img
                    src={collection.creator.avatar}
                    alt={collection.creator.name}
                    className="w-10 h-10 rounded-full border-2 border-golden/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg dark:text-white group-hover:text-golden transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by @{collection.creator.username}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <p>Items</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {collection.itemCount}
                  </p>
                </div>
                <div>
                  <p>Floor Price</p>
                  <p className="font-semibold text-golden">
                    {collection.floorPrice} AMMYI
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-8">
        <div className="premium-section bg-gradient-to-r from-deepGreen via-primary to-golden-dark dark:from-deepGreen-dark dark:via-primary-dark dark:to-golden rounded-2xl sm:rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row justify-between items-center relative z-10 gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Start Creating Your Own NFT Collection
              </h2>
              <p className="text-green-100 mb-6 text-sm sm:text-base">
                Join the eco-friendly NFT revolution. Create, sell, and collect
                NFTs while contributing to environmental conservation efforts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/mint"
                  className="bg-white text-deepGreen hover:bg-golden-light hover:text-trueBlack px-6 py-3 rounded-full font-bold transition-all duration-300 glow-effect hover:shadow-lg"
                >
                  Start Creating
                </Link>
                <Link
                  to="/explore"
                  className="bg-deepGreen-dark/90 hover:bg-deepGreen-dark text-white px-6 py-3 rounded-full font-bold transition-all duration-300 glow-effect hover:shadow-lg"
                >
                  Explore Marketplace
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-auto flex-shrink-0">
              <div className="relative glow-effect group">
                <img
                  src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Create NFT"
                  className="rounded-xl h-48 sm:h-56 w-full lg:w-80 object-cover shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
