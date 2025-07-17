import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tierCategoriesData } from "../data/mockData";
import NFTTierSlider from "../components/NFTTierSlider";
import { ammyiTiers } from "../data/mockData";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  Award,
  Plus,
  Minus,
  Heart,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import NotFoundPage from "./NotFoundPage";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

const NFTDetailsPage1 = () => {
  const { id } = useParams();
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [nftData, setNftData] = useState<any>(null);
  const [additionalNfts, setAdditionalNfts] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const { isConnected } = useAccount();

  useEffect(() => {
    const foundNft = tierCategoriesData.find(
      (nft) => nft.id.toLowerCase() === id?.toLowerCase()
    );

    if (foundNft) {
      setNftData(foundNft);
      setImages([foundNft.image ?? ""]);
      setAdditionalNfts([]);
      setSelectedImageIndex(0);
    }
  }, [id]);

  const addNft = () => {
    const availableNfts = tierCategoriesData.filter(
      (nft) =>
        nft.tier === nftData.tier &&
        nft.id !== nftData.id &&
        !additionalNfts.some((addedNft) => addedNft.id === nft.id)
    );

    if (availableNfts.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableNfts.length);
      const newNft = availableNfts[randomIndex];
      setAdditionalNfts([...additionalNfts, newNft]);
      setImages([...images, newNft.image ?? ""]);
      setSelectedImageIndex(images.length);
    }
  };

  const removeNft = () => {
    if (additionalNfts.length > 0) {
      const newAdditionalNfts = additionalNfts.slice(0, -1);
      const newImages = images.slice(0, -1);

      setAdditionalNfts(newAdditionalNfts);
      setImages(newImages);

      if (selectedImageIndex >= newImages.length) {
        setSelectedImageIndex(newImages.length - 1);
      }
    }
  };

  const selectNft = (index: number) => {
    setSelectedImageIndex(index);
  };

  const getCurrentNftData = () => {
    return selectedImageIndex === 0
      ? nftData
      : additionalNfts[selectedImageIndex - 1];
  };

  const handleBuyNow = () => {
    if (!isConnected) return;
    // Implement your purchase logic here
    console.log("Purchasing NFT:", getCurrentNftData());
    alert(`Purchase initiated for ${getCurrentNftData().name}`);
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
        title: nftData?.name || "NFT",
        text: "Check out this NFT!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!nftData) {
    return <NotFoundPage />;
  }

  const currentNft = getCurrentNftData();
  const tier = ammyiTiers.find((t) => t.name === currentNft.tier);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/ammyi-preminted"
          className="flex items-center text-golden hover:text-golden-dark transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Collection
        </Link>
      </div>

      {/* NFT Content */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* NFT Image Gallery */}
        <div className="lg:w-1/2">
          {/* Main Image with Action Buttons */}
          <div className="cyber-card rounded-xl overflow-hidden glow-effect mb-4 relative">
            <img
              src={images[selectedImageIndex]}
              alt={currentNft.name}
              className="w-full h-auto max-h-[500px] object-contain mx-auto p-4"
            />

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={toggleLike}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  isLiked
                    ? "bg-golden text-trueBlack"
                    : "bg-white/80 dark:bg-darkGray/80 text-gray-700 dark:text-gray-200"
                }`}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  isBookmarked
                    ? "bg-primary text-white"
                    : "bg-white/80 dark:bg-darkGray/80 text-gray-700 dark:text-gray-200"
                }`}
              >
                <Bookmark
                  size={18}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full backdrop-blur-md bg-white/80 dark:bg-darkGray/80 text-gray-700 dark:text-gray-200"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Thumbnail Slider */}
          <div className="flex space-x-2 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => selectNft(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all ${
                  selectedImageIndex === index
                    ? "ring-2 ring-golden"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* NFT Details */}
        <div className="lg:w-1/2">
          <div className="flex items-center mb-4">
            <div
              className={`bg-gradient-to-r ${tier?.color.gradient} text-white px-3 py-1 rounded-full text-sm font-bold mr-3`}
            >
              {currentNft.tier}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentNft.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 dark:text-white">
            {currentNft.name}
          </h1>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {currentNft.description}
          </p>

          <div className="flex items-center mb-6">
            <img
              src={currentNft.creator.avatar}
              alt={currentNft.creator.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Creator
              </p>
              <p className="font-medium dark:text-white">
                {currentNft.creator.name} (@{currentNft.creator.username})
              </p>
            </div>
          </div>

          {/* Price and Action */}
          <div className="cyber-card p-6 mb-6 glow-effect">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current price
                </p>
                <p className="text-2xl font-bold text-golden">
                  {currentNft.price} {currentNft.currency}
                </p>
                {isConnected && (
                  <p className="text-xs text-green-500 mt-1">
                    Wallet connected
                  </p>
                )}
              </div>

              {isConnected ? (
                <button
                  onClick={handleBuyNow}
                  className="btn-primary glow-effect"
                >
                  Buy Now
                </button>
              ) : (
                <ConnectKitButton.Custom>
                  {({ show }) => (
                    <button onClick={show} className="btn-primary glow-effect">
                      Connect Wallet to Buy
                    </button>
                  )}
                </ConnectKitButton.Custom>
              )}
            </div>

            {/* Add/Remove NFT Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-4">
              <button
                onClick={addNft}
                disabled={
                  additionalNfts.length >=
                  tierCategoriesData.filter((nft) => nft.tier === nftData.tier)
                    .length
                }
                className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors shadow-md ${
                  additionalNfts.length >=
                  tierCategoriesData.filter((nft) => nft.tier === nftData.tier)
                    .length
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                aria-label="Add NFT"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span className="text-sm">Add</span>
              </button>

              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
                {additionalNfts.length} /{" "}
                {
                  tierCategoriesData.filter((nft) => nft.tier === nftData.tier)
                    .length
                }
              </div>

              <button
                onClick={removeNft}
                disabled={additionalNfts.length === 0}
                className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors shadow-md ${
                  additionalNfts.length === 0
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                aria-label="Remove NFT"
              >
                <Minus className="w-4 h-4 mr-1" />
                <span className="text-sm">Remove</span>
              </button>
            </div>
          </div>

          {/* Tier Benefits */}
          {tier && (
            <div className="cyber-card p-6 glow-effect bg-gradient-to-br from-golden/10 to-golden-dark/10">
              <div className="flex items-center mb-3">
                <div
                  className={`bg-gradient-to-r ${
                    tier?.color?.gradient || "from-golden to-golden-dark"
                  } text-white p-1 rounded-full mr-2`}
                >
                  {tier?.icon || <Star size={16} />}
                </div>
                <h3 className="font-bold text-golden-dark dark:text-golden-light">
                  {tier?.name || "NFT"} Tier Benefits
                </h3>
              </div>

              {Array.isArray(tier?.benefits) && tier.benefits.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-golden dark:text-golden-light">
                  {tier.benefits.map((benefit, index) => (
                    <li key={`benefit-${index}`} className="mb-1">
                      {benefit || `Benefit ${index + 1}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-golden/80 dark:text-golden-light/80">
                  No specific benefits listed for this tier.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200 dark:border-charcoal">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-3 font-medium ${
              activeTab === "details"
                ? "border-b-2 border-golden text-golden"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("attributes")}
            className={`px-4 py-3 font-medium ${
              activeTab === "attributes"
                ? "border-b-2 border-golden text-golden"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Attributes
          </button>
        </div>

        <div className="cyber-card p-6 mt-4 glow-effect">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3 dark:text-white">
                  Collection Info
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Collection:
                    </span>
                    <span className="font-medium dark:text-white">
                      {currentNft.collection || "Entered Symphony"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Created:
                    </span>
                    <span className="font-medium dark:text-white">
                      {currentNft.createdAt || "DJH/2023"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Blockchain:
                    </span>
                    <span className="font-medium dark:text-white">
                      {currentNft.blockchain || "Polygon"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 dark:text-white">Token Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Token ID:
                    </span>
                    <span className="font-medium dark:text-white">
                      {currentNft.tokenId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Contract:
                    </span>
                    <a
                      href={`https://polygonscan.com/address/${currentNft.contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-golden hover:underline flex items-center"
                    >
                      View <ExternalLink className="ml-1" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "attributes" && (
            <div>
              <h3 className="font-bold mb-3 dark:text-white">Attributes</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentNft.attributes?.map((attr: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-charcoal rounded-lg p-3"
                  >
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {attr.trait_type}
                    </p>
                    <p className="font-medium dark:text-white">{attr.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* More from this tier */}
      <NFTTierSlider
        currentNft={nftData}
        tierCategoriesData={tierCategoriesData}
      />

      {/* Tier Benefits Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8 dark:text-white text-center">
          Tier Benefits & Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="cyber-card p-6 bg-gradient-to-br from-golden/10 to-golden-dark/10 glow-effect">
            <div className="flex items-center mb-4">
              <Star className="text-golden mr-3" size={24} />
              <h3 className="text-lg font-bold text-golden-dark dark:text-golden-light">
                Exclusive Access
              </h3>
            </div>
            <p className="text-golden dark:text-golden-light text-sm">
              Higher tier NFTs grant access to exclusive events, early drops,
              and premium marketplace features.
            </p>
          </div>

          <div className="cyber-card p-6 bg-gradient-to-br from-primary/10 to-deepGreen/10 glow-effect">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-primary mr-3" size={24} />
              <h3 className="text-lg font-bold text-primary-dark dark:text-primary-light">
                Investment Potential
              </h3>
            </div>
            <p className="text-primary dark:text-primary-light text-sm">
              Limited supply and increasing demand make AMMYI NFTs valuable
              long-term investments.
            </p>
          </div>

          <div className="cyber-card p-6 bg-gradient-to-br from-deepGreen/10 to-primary/10 glow-effect">
            <div className="flex items-center mb-4">
              <Award className="text-deepGreen mr-3" size={24} />
              <h3 className="text-lg font-bold text-deepGreen dark:text-primary-light">
                Environmental Impact
              </h3>
            </div>
            <p className="text-deepGreen dark:text-primary-light text-sm">
              Every purchase contributes to real-world environmental
              conservation and tree planting initiatives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NFTDetailsPage1;
