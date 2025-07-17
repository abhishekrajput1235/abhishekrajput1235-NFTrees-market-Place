import { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NFT } from "../types";

const PublicnftSlider = ({
  currentNft,
  nfts,
}: {
  currentNft: NFT;
  nfts: NFT[];
}) => {
  const sliderRef = useRef < Slider > (null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Filter NFTs from the same category excluding the current NFT
  const similarNFTs = nfts.filter(
    (item) => item.category === currentNft.category && item.id !== currentNft.id
  );

  if (similarNFTs.length === 0) return null;

  return (
    <div className="mb-12 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">
          More from {currentNft.category} Category
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="p-2 rounded-full bg-gray-100 dark:bg-charcoal hover:bg-gray-200 dark:hover:bg-darkGray transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="p-2 rounded-full bg-gray-100 dark:bg-charcoal hover:bg-gray-200 dark:hover:bg-darkGray transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...sliderSettings}>
        {similarNFTs.map((item) => (
          <div key={item.id} className="px-2">
            <Link
              to={`/nft/${item.id}`}
              className="cyber-card glow-effect hover:transform hover:scale-[1.02] transition-transform duration-300 block h-full"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={item.image || "/default-image.png"}
                  alt={item.name}
                  className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold dark:text-white truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {item.category}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300">
                    {item.collection}
                  </span>
                  <span className="font-bold text-golden">
                    {item.price} {item.currency}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PublicnftSlider;
