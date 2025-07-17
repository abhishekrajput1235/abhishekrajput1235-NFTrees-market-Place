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

const NFTCard1 = ({
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

  const cardClass =
    isPremium || nft.tier
      ? `nft-card block cyber-card ${
          featured ? "col-span-1 sm:col-span-2 row-span-2" : ""
        }`
      : `nft-card block ${
          featured ? "col-span-1 sm:col-span-2 row-span-2" : ""
        }`;

  return (
    <Link to={`/nft-tier/${nft.id}`} className={cardClass}>
      <div
        className={`${
          isPremium || nft.tier ? "cyber-card" : "card-glossy"
        } h-full flex flex-col relative overflow-hidden`}
      >
        {/* Premium/Tier indicator */}
        {(isPremium || nft.tier) && (
          <div className="absolute top-2 left-2 z-10">
            <div
              className={`bg-gradient-to-r ${getTierColor()} text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse-glow`}
            >
              {nft.tier ? `${nft.tier} - $${nft.price}` : "AMMYI"}
            </div>
          </div>
        )}

        {/* Image container with overlay */}
        <div className="relative overflow-hidden">
          <img
            src={nft.image ?? "/images/placeholder.png"}

            alt={nft.name}
            className={`w-full object-cover ${
              featured ? "h-64 sm:h-60" : "h-58 sm:h-44"
            } transition-transform duration-700 hover:scale-110`}
          />

          {/* Tech overlay for premium NFTs */}
          {(isPremium || nft.tier) && (
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 pointer-events-none">
              <div className="data-stream top-4 left-4"></div>
              <div
                className="data-stream top-8 right-6"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="data-stream bottom-6 left-8"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          )}

          <div className="absolute inset-0 nft-card-overlay bg-gradient-to-t from-trueBlack/80 via-transparent to-transparent flex flex-col justify-end p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white text-xs sm:text-sm">Current price</p>
                <p className="text-white font-bold text-sm sm:text-base">
                  {nft.price} {nft.currency}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleLike}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                    isLiked
                      ? "bg-golden text-trueBlack glow-effect"
                      : "bg-trueBlack/50 text-white hover:bg-golden/20 hover:glow-effect"
                  }`}
                  aria-label={isLiked ? "Unlike" : "Like"}
                >
                  <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={toggleBookmark}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                    isBookmarked
                      ? "bg-primary text-white glow-effect"
                      : "bg-trueBlack/50 text-white hover:bg-primary/20 hover:glow-effect"
                  }`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
                >
                  <Bookmark
                    size={14}
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-white text-xs px-2 py-1 rounded-full font-medium ${
                isPremium || nft.tier
                  ? `bg-gradient-to-r ${getTierColor()}`
                  : "bg-gradient-to-r from-golden to-golden-dark"
              }`}
            >
              {nft.tier || nft.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-3 flex-grow">
          <div className="flex items-center mb-2">
            <img
              src={nft.creator.avatar}
              alt={nft.creator.name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 border border-golden/30"
            />
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              @{nft.creator.username}
            </span>
          </div>

          <h3 className="font-bold text-sm sm:text-lg mb-1 dark:text-white line-clamp-1">
            {nft.name}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {nft.description}
          </p>
        </div>

        {/* Footer with timer or status */}
        <div className="border-t border-gray-100 dark:border-charcoal p-3 sm:p-2">
          <div className="flex justify-between items-center">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {nft.endsIn ? (
                <div className="flex items-center">
                  <span className="mr-1">Ends in</span>
                  <span className="font-semibold text-golden dark:text-golden-light">
                    {nft.endsIn}
                  </span>
                </div>
              ) : (
                <span>{nft.status}</span>
              )}
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {nft.likes} likes
              </span>
            </div>
          </div>
        </div>

        {/* Glossy overlay */}
        <div className="glossy-overlay"></div>
      </div>
    </Link>
  );
};

export default NFTCard1;
