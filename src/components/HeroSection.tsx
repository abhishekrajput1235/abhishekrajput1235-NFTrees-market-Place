import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-deepGreen-light/10 via-golden/5 to-trueBlack/5 dark:from-trueBlack dark:via-deepGreen-dark/20 dark:to-golden-dark/10 rounded-2xl lg:rounded-3xl">
      {/* Tech grid background */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-20"></div>

      {/* Animated data streams */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="data-stream top-10 left-10"></div>
        <div
          className="data-stream top-20 right-20"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="data-stream bottom-16 left-32"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="data-stream top-32 left-1/2"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 max-w-2xl text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Explore the{" "}
              <span className="text-gradient-golden">Next Generation </span>
              of NFTs
            </h1>
            <p className="text-sm sm:text-sm md:text-md text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">
              Welcome to NFTrees, the next-generation NFT marketplace where
              sustainability meets innovation. From eco-friendly art that
              supports reforestation to music, collectibles, fashion, and beyond
              — our platform hosts multi-category NFTs designed to inspire and
              make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/explore/nft")}
                className="btn-primary w-full sm:w-auto glow-effect"
              >
                Explore NFTs
              </button>
              <button
                onClick={() => navigate("/mint")}
                className="btn-outline w-full sm:w-auto"
              >
                Create NFT
              </button>
            </div>
            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center cyber-card p-3 sm:p-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-golden">
                  1000+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  NFTs Created
                </p>
              </div>
              <div className="text-center cyber-card p-3 sm:p-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-green">
                  500+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Trees Planted
                </p>
              </div>
              <div className="text-center cyber-card p-3 sm:p-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-golden">
                  250+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Active Artists
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 card-glossy overflow-hidden transform rotate-3 floating-element glow-effect">
                <img
                  src="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg"
                  alt="Forest NFT"
                  className="w-full h-full object-cover"
                />
                <div className="glossy-overlay"></div>
              </div>
              <div className="absolute bottom-4 left-4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 card-glossy overflow-hidden transform -rotate-6 floating-element glow-effect">
                <img
                  src="https://images.pexels.com/photos/15286/pexels-photo.jpg"
                  alt="Water NFT"
                  className="w-full h-full object-cover"
                />
                <div className="glossy-overlay"></div>
              </div>
              <div className="absolute top-16 sm:top-20 left-12 sm:left-16 w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 card-glossy overflow-hidden transform rotate-12 floating-element glow-effect">
                <img
                  src="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg"
                  alt="Wildlife NFT"
                  className="w-full h-full object-cover"
                />
                <div className="glossy-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
