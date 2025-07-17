import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Image, Upload, X, Info } from "lucide-react";
import { useNFT } from "../contexts/NFTContext";
import { useAuth } from "../contexts/AuthContext";
import { MintFormData } from "../types";

const MintPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { user } = useAuth();
  const { categories, collections, mintNFT } = useNFT();

  const [formData, setFormData] = useState<MintFormData>({
    name: "",
    description: "",
    image: null,
    imagePreview: null,
    price:  0,
    currency: "AMMYI",
    collection: "",
    category: "",
    royalty: "10",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("File must be an image (JPEG, PNG, GIF, etc.)");
      return;
    }

    // Check if file is too large (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setError(null);
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const removeImage = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is connected
    if (!isConnected) {
      setError("Please connect your wallet to mint an NFT");
      return;
    }

    // Form validation
    if (!formData.name.trim()) {
      setError("NFT name is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!formData.image) {
      setError("Image is required");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError("Valid price is required");
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Prepare NFT data
      const nftData = {
        ...formData,
        // In a real app, we would upload the image to IPFS here
        // For now, we'll just use the preview URL
        image: formData.imagePreview,
        creator: {
          name: user?.username || "Anonymous",
          username: user?.username || "anonymous",
          avatar: user?.avatar || "https://via.placeholder.com/100",
        },
      };

      const success = await mintNFT(nftData);

      if (success) {
        setIsSuccess(true);

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setError("Failed to mint NFT. Please try again.");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto fade-in pt-12">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 dark:text-white">
          Create Your NFT
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Mint a new NFT on the NFTrees marketplace and contribute to
          environmental conservation
        </p>
      </div>

      {isSuccess ? (
        <div className="cyber-card bg-gradient-to-br from-primary-light/10 to-golden/10 dark:from-primary-dark/20 dark:to-golden-dark/20 border border-primary-light/30 dark:border-primary-dark/30 rounded-xl p-6 text-center glow-effect">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-golden rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primary-dark dark:text-primary-light">
            NFT Created Successfully!
          </h2>
          <p className="text-primary dark:text-primary-light mb-4 text-sm sm:text-base">
            Your NFT has been minted on the blockchain and is now available in
            your profile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="btn-primary glow-effect"
            >
              View My NFTs
            </button>
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: "",
                  description: "",
                  image: null,
                  imagePreview: null,
                  price:  0,
                  currency: "AMMYI",
                  collection: "",
                  category: "",
                  royalty: "10",
                });
              }}
              className="btn-outline"
            >
              Mint Another NFT
            </button>
          </div>
        </div>
      ) : (
        <>
          {!isConnected ? (
            <div className="cyber-card p-6 sm:p-8 text-center glow-effect">
              <div className="mb-6">
                <Image size={48} className="mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">
                  Connect Your Wallet
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
                  You need to connect your wallet to mint NFTs on NFTrees
                  marketplace.
                </p>
              </div>
              <ConnectKitButton.Custom>
                {({ show }) => (
                  <button
                    onClick={show}
                    className="btn-primary px-6 sm:px-8 py-3 glow-effect"
                  >
                    Connect Wallet
                  </button>
                )}
              </ConnectKitButton.Custom>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="cyber-card p-4 sm:p-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6 flex items-start">
                  <Info size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left column - Image upload */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    NFT Image
                  </h3>

                  {!formData.imagePreview ? (
                    <div className="cyber-card border-2 border-dashed border-gray-300 dark:border-charcoal rounded-xl p-6 sm:p-8 text-center">
                      <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer flex flex-col items-center justify-center h-40 sm:h-48"
                      >
                        <Upload size={40} className="text-gray-400 mb-4" />
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm sm:text-base">
                          Click to upload
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden glow-effect">
                      <img
                        src={formData.imagePreview}
                        alt="NFT Preview"
                        className="w-full h-auto max-h-96 object-contain"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-trueBlack/50 text-white p-2 rounded-full hover:bg-trueBlack/70 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <div className="mt-6 p-4 cyber-card bg-gradient-to-br from-primary-light/10 to-golden/10 dark:from-primary-dark/20 dark:to-golden-dark/20 rounded-lg">
                    <h4 className="flex items-center text-primary-dark dark:text-primary-light font-medium mb-2 text-sm">
                      <Info size={16} className="mr-2" />
                      Why mint on NFTrees?
                    </h4>
                    <ul className="text-xs sm:text-sm text-primary dark:text-primary-light space-y-1">
                      <li>• Eco-friendly NFTs with minimal carbon footprint</li>
                      <li>• 5% of proceeds go to environmental conservation</li>
                      <li>• Earn AMMYI tokens with each NFT minted</li>
                      <li>
                        • Join a community of environmentally-conscious creators
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right column - NFT details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    NFT Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter NFT name"
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm"
                      >
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your NFT and its impact on the environment"
                        className="input-field min-h-[100px] resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm"
                        >
                          Price *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            min="0.01"
                            step="0.01"
                            className="input-field pr-16"
                            required
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                            AMMYI
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="royalty"
                          className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm"
                        >
                          Royalty %
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="royalty"
                            name="royalty"
                            value={formData.royalty}
                            onChange={handleChange}
                            placeholder="10"
                            min="0"
                            max="50"
                            className="input-field pr-8"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                            %
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input-field"
                        required
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="collection"
                        className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm"
                      >
                        Collection
                      </label>
                      <select
                        id="collection"
                        name="collection"
                        value={formData.collection}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select a collection (optional)</option>
                        {collections.map((collection, index) => (
                          <option key={index} value={collection.name}>
                            {collection.name}
                          </option>
                        ))}
                        <option value="new">+ Create new collection</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200 dark:border-charcoal">
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn-outline order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary order-1 sm:order-2 glow-effect"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Minting NFT...
                      </span>
                    ) : (
                      "Create NFT"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Information section */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="cyber-card p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-golden flex items-center justify-center mr-4">
                  <Image size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-base sm:text-lg dark:text-white">
                  Create Your NFT
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-xs">
                Upload your artwork, give it a name and description, and
                customize its properties.
              </p>
            </div>

            <div className="cyber-card p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-golden to-golden-dark flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-trueBlack"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-base sm:text-lg dark:text-white">
                  Mint on Blockchain
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-xs">
                Securely mint your NFT on the Polygon blockchain with minimal
                gas fees and environmental impact.
              </p>
            </div>

            <div className="cyber-card p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-deepGreen to-primary flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-base sm:text-lg dark:text-white">
                  Earn AMMYI Tokens
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-xs">
                Get rewarded with AMMYI tokens for minting NFTs and contributing
                to ecological conservation efforts.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MintPage;
