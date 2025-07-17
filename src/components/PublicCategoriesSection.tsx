import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const PublicCategoriesSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<number | null>(null); // safer for setInterval in browsers


  // Sample data - replace with your actual categories
  const publicCategories = [
    { name: 'Art', image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg', itemCount: 1250 },
    { name: 'Photography', image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg', itemCount: 890 },
    { name: 'Collectibles', image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg', itemCount: 3200 },
    { name: 'Music', image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg', itemCount: 750 },
    { name: 'Virtual Worlds', image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', itemCount: 420 },
    { name: 'Trading Cards', image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg', itemCount: 1800 },
    { name: 'Sports', image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg', itemCount: 950 },
    { name: 'Utility', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg', itemCount: 600 },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      pauseAutoPlay();
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      resumeAutoPlay();
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      pauseAutoPlay();
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      resumeAutoPlay();
    }
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
  };

  const resumeAutoPlay = () => {
    setTimeout(() => {
      setIsAutoPlaying(true);
      startAutoPlay();
    }, 5000);
  };

  const startAutoPlay = () => {
    autoPlayInterval.current = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
        if (isAtEnd) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3000);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying]);

  return (
    <div className="mb-8 sm:mb-12">
      <div className="category-public p-6 sm:p-8 rounded-2xl relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users className="text-primary mr-3" size={24} />
            <h2 className="text-xl sm:text-2xl font-bold dark:text-white">NFT Categories</h2>
          </div>
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-darkGray transition-colors"
            aria-label={isAutoPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
          >
            {isAutoPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Explore diverse NFT categories created by our vibrant community of artists and creators.
        </p>

        <div 
          className="relative"
          onMouseEnter={() => {
            setShowControls(true);
            pauseAutoPlay();
          }}
          onMouseLeave={() => {
            setShowControls(false);
            if (isAutoPlaying) {
              resumeAutoPlay();
            }
          }}
        >
          {/* Navigation buttons */}
          {showControls && (
            <>
              <button 
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-darkGray text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-100 dark:hover:bg-charcoal transition-all transform -translate-x-2 hover:scale-110"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-darkGray text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-100 dark:hover:bg-charcoal transition-all transform translate-x-2 hover:scale-110"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Slider container */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-6 py-2 px-1"
          >
            {publicCategories.map((category, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[140px] sm:w-[160px] transition-transform hover:scale-[1.02]"
              >
                <Link 
                  to={`/explore/nft?category=${category.name.toLowerCase()}`}
                  className="block overflow-hidden rounded-xl group relative h-28 sm:h-36 card-glossy transition-all duration-300 hover:scale-105 glow-effect"
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-trueBlack/80 via-trueBlack/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white">
                    <h3 className="text-xs sm:text-sm font-bold">{category.name}</h3>
                    <p className="mt-1 text-xs text-gray-300">{category.itemCount} items</p>
                  </div>
                  <div className="glossy-overlay"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCategoriesSection;