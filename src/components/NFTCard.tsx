import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";
import { NFT } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { ammyiTiers } from "../data/mockData";

interface NFTCardProps {
  nft: NFT;
  featured?: boolean;
  isPremium?: boolean;
}

const NFTCard = ({
  nft,
  featured = false,
  isPremium = false,
}: NFTCardProps) => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const getTierColor = () => {
    if (nft.tier) {
      const tier = ammyiTiers.find((t) => t.name === nft.tier);
      return tier?.color.gradient || "from-gray-400 to-gray-600";
    }
    return "from-golden to-golden-dark";
  };

  const tierGradient = getTierColor();
  const isSpecialCard = isPremium || nft.tier;

  return (
    <Link
      to={`/nft/${nft.id}`}
      className={`group block h-full ${
        featured ? "col-span-1 sm:col-span-2 row-span-2" : ""
      }`}
    >
      <div
        className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 
        ${
          isSpecialCard
            ? "cyber-card border-2 border-transparent hover:border-golden"
            : "card-glossy"
        }
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        {/* Tier/Premium Badge */}
        {isSpecialCard && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`bg-gradient-to-r ${tierGradient} text-white px-2.5 py-1 rounded-full text-xs font-bold ${
                isPremium ? "animate-pulse-glow" : ""
              }`}
            >
              {nft.tier ? `${nft.tier} - $${nft.price}` : "AMMYI"}
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={nft.image ?? "/images/placeholder.png"}

            alt={nft.name}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              featured ? "h-64 sm:h-60" : "h-58 sm:h-44"
            }`}
          />

          {/* Tech Overlay Effects */}
          {isSpecialCard && (
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 pointer-events-none ">
              {[0, 1, 2].map((delay) => (
                <div
                  key={delay}
                  className="data-stream"
                  style={{
                    top: `${20 + delay * 20}%`,
                    left: `${10 + delay * 30}%`,
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Image Overlay with Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-xs">Current price</p>
                <p className="text-white font-bold text-sm sm:text-base">
                  {nft.price} {nft.currency}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleLike}
                  className={`p-2 rounded-full transition-all ${
                    isLiked
                      ? "bg-golden text-black glow-effect"
                      : "bg-black/50 text-white hover:bg-golden/30"
                  }`}
                  aria-label={isLiked ? "Unlike" : "Like"}
                >
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full transition-all ${
                    isBookmarked
                      ? "bg-primary text-white glow-effect"
                      : "bg-black/50 text-white hover:bg-primary/30"
                  }`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
                >
                  <Bookmark
                    size={16}
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                isSpecialCard
                  ? `bg-gradient-to-r ${tierGradient} text-white`
                  : "bg-gradient-to-r from-golden to-golden-dark text-black"
              }`}
            >
              {nft.tier || nft.category}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex-grow flex flex-col ">
          <div className="flex items-center mb-3">
            <img
              src={nft.creator.avatar}
              alt={nft.creator.name}
              className="w-8 h-8 rounded-full mr-2 border border-golden/50"
            />
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              @{nft.creator.username}
            </span>
          </div>

          <h3
            className={`font-bold text-lg mb-2 line-clamp-1 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {nft.name}
          </h3>

          <p
            className={`text-sm mb-4 line-clamp-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {nft.description}
          </p>

          {/* Card Footer */}
          <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {nft.endsIn ? (
                  <div className="flex items-center">
                    <span
                      className={`mr-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Ends in
                    </span>
                    <span className="font-semibold text-golden text-xs">
                      {nft.endsIn}
                    </span>
                  </div>
                ) : (
                  <span
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    {nft.status}
                  </span>
                )}
              </div>
              <div
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {nft.likes} likes
              </div>
            </div>
          </div>
        </div>

        {/* Glossy Overlay */}
        <div className="glossy-overlay" />
      </div>
    </Link>
  );
};

export default NFTCard;
