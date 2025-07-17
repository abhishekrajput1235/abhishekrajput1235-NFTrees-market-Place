import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  Heart,
  Share2,
  Bookmark,
  ExternalLink,
  Clock,
  Tag,
  Info,
  Shield,
  Activity,
  Folder,
  Check,
} from "lucide-react";
import { useNFT } from "../contexts/NFTContext";
import { NFT, NFTAttribute } from "../types";

const NFTDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { fetchNFTById, purchaseNFT } = useNFT();
  const [nft, setNft] = useState<NFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const getNFT = async () => {
      setIsLoading(true);
      if (!id) return;

      const fetchedNFT = await fetchNFTById(id);
      if (fetchedNFT) {
        setNft(fetchedNFT);
      } else {
        // NFT not found, redirect to 404
        navigate("/404");
      }

      setIsLoading(false);
    };

    getNFT();
  }, [id, fetchNFTById, navigate]);

  const handlePurchase = async () => {
    if (!nft || !isConnected) return;

    setIsPurchasing(true);
    try {
      const success = await purchaseNFT(nft.id);
      if (success) {
        // Refresh NFT data
        const updated = await fetchNFTById(nft.id);
        if (updated) {
          setNft(updated);
        }
      }
    } catch (error) {
      console.error("Error purchasing NFT:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: nft?.name || "NFT on NFTrees",
        text: nft?.description || "Check out this NFT on NFTrees Marketplace",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse loading-pulse">
          <div className="w-12 h-12 rounded-full bg-golden/20"></div>
        </div>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">NFT not found</h2>
        <p className="mb-6">
          The NFT you're looking for doesn't exist or has been removed.
        </p>
        <button onClick={() => navigate("/explore")} className="btn-primary">
          Explore NFTs
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in pt-4 sm:pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* NFT Image and Actions */}
        <div className="space-y-6">
          <div className="relative cyber-card overflow-hidden glow-effect">
            <img
              src={nft.image ?? "/images/placeholder.png"}

              alt={nft.name}
              className="w-full h-auto object-cover"
            />

            {/* Overlay actions */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={toggleLike}
                className={`p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isLiked
                    ? "bg-golden text-trueBlack glow-effect"
                    : "bg-white/80 dark:bg-darkGray/80 text-gray-700 dark:text-gray-200 hover:glow-effect"
                } hover:shadow-md`}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={toggleBookmark}
                className={`p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isBookmarked
                    ? "bg-primary text-white glow-effect"
                    : "bg-white/80 dark:bg-darkGray/80 text-gray-700 dark:text-gray-200 hover:glow-effect"
                } hover:shadow-md`}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
              >
                <Bookmark
                  size={18}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 sm:p-3 rounded-full backdrop-blur-md bg-white/80 dark:bg-darkGray/80 text-gray-700 dark:text-gray-200 hover:shadow-md transition-all duration-300 hover:glow-effect"
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
            <div className="glossy-overlay"></div>
          </div>

          {/* Creator info - Mobile only */}
          <div className="lg:hidden cyber-card p-4">
            <div className="flex items-center">
              <img
                src={nft.creator.avatar}
                alt={nft.creator.name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-golden/50"
              />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Creator
                </p>
                <p className="font-semibold dark:text-white">
                  @{nft.creator.username}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NFT Details */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs sm:text-sm bg-gradient-to-r from-golden to-golden-dark text-trueBlack px-3 py-1 rounded-full font-medium">
                {nft.category}
              </span>
              <span className="text-xs sm:text-sm bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                {nft.collection}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
              {nft.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
              {nft.description}
            </p>

            {/* Creator and Owner - Desktop */}
            <div className="hidden lg:flex justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={nft.creator.avatar}
                  alt={nft.creator.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-golden/50"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Creator
                  </p>
                  <p className="font-semibold dark:text-white">
                    @{nft.creator.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={nft.owner?.avatar}
                  alt={nft.owner?.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-golden/50"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Owner
                  </p>
                  <p className="font-semibold dark:text-white">
                    @{nft.owner?.username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Purchase */}
          <div className="cyber-card p-4 sm:p-6">
            {nft.endsIn && (
              <div className="flex items-center mb-4 text-golden">
                <Clock size={18} className="mr-2" />
                <span className="text-sm sm:text-base">
                  Auction ends in:{" "}
                  <span className="font-bold">{nft.endsIn}</span>
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current price
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {nft.price}{" "}
                  <span className="text-golden">{nft.currency}</span>
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                  {nft.status}
                </p>
              </div>
            </div>

            {nft.status === "For Sale" || nft.status === "Auction" ? (
              isConnected ? (
                <button
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="btn-primary w-full py-3 glow-effect"
                >
                  {isPurchasing ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </span>
                  ) : nft.status === "Auction" ? (
                    "Place Bid"
                  ) : (
                    "Buy Now"
                  )}
                </button>
              ) : (
                <ConnectKitButton.Custom>
                  {({ show }) => (
                    <button onClick={show} className="btn-primary w-full py-3">
                      Connect Wallet to Purchase
                    </button>
                  )}
                </ConnectKitButton.Custom>
              )
            ) : (
              <button
                disabled
                className="w-full py-3 bg-gray-300 dark:bg-charcoal text-gray-500 dark:text-gray-400 rounded-full font-medium cursor-not-allowed"
              >
                Not for sale
              </button>
            )}
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-gray-200 dark:border-charcoal mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-3 px-4 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === "details"
                    ? "text-golden border-b-2 border-golden glow-effect"
                    : "text-gray-500 dark:text-gray-400 hover:text-golden hover:glow-effect"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("attributes")}
                className={`py-3 px-4 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === "attributes"
                    ? "text-golden border-b-2 border-golden glow-effect"
                    : "text-gray-500 dark:text-gray-400 hover:text-golden hover:glow-effect"
                }`}
              >
                Attributes
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-3 px-4 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === "history"
                    ? "text-golden border-b-2 border-golden glow-effect"
                    : "text-gray-500 dark:text-gray-400 hover:text-golden hover:glow-effect"
                }`}
              >
                History
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <Folder
                    size={18}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className="text-gray-700 dark:text-gray-300 mr-2 text-sm">
                    Collection:
                  </span>
                  <span className="font-medium dark:text-white text-sm">
                    {nft.collection}
                  </span>
                </div>
                <div className="flex items-center">
                  <Tag
                    size={18}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className="text-gray-700 dark:text-gray-300 mr-2 text-sm">
                    Token ID:
                  </span>
                  <span className="font-medium dark:text-white text-sm">
                    {nft.tokenId}
                  </span>
                </div>
                <div className="flex items-center">
                  <Shield
                    size={18}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className="text-gray-700 dark:text-gray-300 mr-2 text-sm">
                    Blockchain:
                  </span>
                  <span className="font-medium dark:text-white text-sm">
                    {nft.blockchain}
                  </span>
                </div>
                <div className="flex items-center">
                  <Info
                    size={18}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span className="text-gray-700 dark:text-gray-300 mr-2 text-sm">
                    Created:
                  </span>
                  <span className="font-medium dark:text-white text-sm">
                    {new Date(nft.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "attributes" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {nft.attributes ? (
                  nft.attributes.map((attr: NFTAttribute, index) => (
                    <div
                      key={index}
                      className="cyber-card bg-gray-50 dark:bg-charcoal p-3 rounded-lg border border-gray-100 dark:border-darkGray"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                        {attr.trait_type}
                      </p>
                      <p className="font-medium dark:text-white text-sm">
                        {attr.value}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 col-span-3 text-sm">
                    No attributes available for this NFT.
                  </p>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4">
                {nft.history ? (
                  nft.history.map((item, index) => (
                    <div
                      key={index}
                      className="cyber-card flex items-start border-b border-gray-100 dark:border-charcoal pb-4"
                    >
                      <div className="bg-gray-100 dark:bg-charcoal p-2 rounded-lg mr-4">
                        <Activity
                          size={18}
                          className="text-gray-600 dark:text-gray-400"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium dark:text-white text-sm">
                          {item.type}
                        </p>
                        <div className="flex text-xs text-gray-600 dark:text-gray-400">
                          <span>
                            From {item.from.slice(0, 6)}...{item.from.slice(-4)}
                          </span>
                          <span className="mx-1">to</span>
                          <span>
                            {item.to.slice(0, 6)}...{item.to.slice(-4)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                        {item.txHash && (
                          <a
                            href={`https://polygonscan.com/tx/${item.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-golden hover:underline mt-1"
                          >
                            View transaction{" "}
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        )}
                      </div>
                      {item.price && (
                        <div className="ml-auto text-right">
                          <p className="font-medium dark:text-white text-sm">
                            {item.price} {item.currency}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            ($XXX.XX)
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No history available for this NFT.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {/* <section className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 dark:text-white">
          You might also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="cyber-card animate-pulse loading-pulse"
              >
                <div className="w-full h-48 sm:h-64 bg-gray-300 dark:bg-charcoal rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 dark:bg-charcoal rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-charcoal rounded w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      </section> */}
    </div>
  );
};

export default NFTDetailPage;
