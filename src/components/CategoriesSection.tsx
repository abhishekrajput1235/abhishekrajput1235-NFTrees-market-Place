// import { useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { mockNFTs } from '../data/mockData'; // Adjust the import path as needed

// const CategoriesSection = () => {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [showControls, setShowControls] = useState(false);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const autoPlayInterval = useRef<number | null>(null); // safer for setInterval in browsers

  
//   // Extract unique categories from mockNFTs
//   const categories = Array.from(new Set(mockNFTs.map(nft => nft.category)))
//     .map(category => {
//       const categoryNFTs = mockNFTs.filter(nft => nft.category === category);
//       const randomNFT = categoryNFTs[Math.floor(Math.random() * categoryNFTs.length)];
      
//       return {
//         name: category,
//         image: randomNFT.image,
//         itemCount: categoryNFTs.length
//       };
//     });

//   const scrollLeft = () => {
//     if (sliderRef.current) {
//       setIsAutoPlaying(false);
//       sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//       restartAutoPlay();
//     }
//   };

//   const scrollRight = () => {
//     if (sliderRef.current) {
//       setIsAutoPlaying(false);
//       sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//       restartAutoPlay();
//     }
//   };

//   const restartAutoPlay = () => {
//     // Clear existing interval
//     if (autoPlayInterval.current) {
//       clearInterval(autoPlayInterval.current);
//     }
//     // Restart after 5 seconds
//     setTimeout(startAutoPlay, 5000);
//   };

//   const startAutoPlay = () => {
//     setIsAutoPlaying(true);
//     autoPlayInterval.current = setInterval(() => {
//       if (sliderRef.current) {
//         // Check if we've reached the end
//         const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//         const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
//         if (isAtEnd) {
//           // Scroll back to start
//           sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
//         } else {
//           // Scroll right
//           sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//         }
//       }
//     }, 3000); // Adjust timing as needed (3000ms = 3 seconds)
//   };

//   useEffect(() => {
//     startAutoPlay();
//     return () => {
//       if (autoPlayInterval.current) {
//         clearInterval(autoPlayInterval.current);
//       }
//     };
//   }, []);

//   return (
//     <section 
//       className="py-6 sm:py-8 relative"
//       onMouseEnter={() => {
//         setShowControls(true);
//         setIsAutoPlaying(false);
//         if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
//       }}
//       onMouseLeave={() => {
//         setShowControls(false);
//         restartAutoPlay();
//       }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Browse by Categories</h2>
//         <div className="flex items-center space-x-2">
//           <button 
//             onClick={() => {
//               if (isAutoPlaying) {
//                 setIsAutoPlaying(false);
//                 if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
//               } else {
//                 restartAutoPlay();
//               }
//             }}
//             className="p-1.5 rounded-full bg-gray-100 dark:bg-charcoal text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-darkGray transition-colors"
//             aria-label={isAutoPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
//           >
//             {isAutoPlaying ? (
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="6" y="4" width="4" height="16"></rect>
//                 <rect x="14" y="4" width="4" height="16"></rect>
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <polygon points="5 3 19 12 5 21 5 3"></polygon>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       <div className="relative group">
//         {/* Navigation buttons */}
//         {showControls && (
//           <>
//             <button 
//               onClick={scrollLeft}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-darkGray text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-100 dark:hover:bg-charcoal transition-all transform -translate-x-2 hover:scale-110"
//               aria-label="Scroll left"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button 
//               onClick={scrollRight}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-darkGray text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-100 dark:hover:bg-charcoal transition-all transform translate-x-2 hover:scale-110"
//               aria-label="Scroll right"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </>
//         )}

//         {/* Slider container */}
//         <div 
//           ref={sliderRef}
//           className="flex overflow-x-auto scrollbar-hide space-x-4 sm:space-x-6 py-2 px-1"
//         >
//           {categories.map((category, index) => (
//             <div 
//               key={index}
//               className="flex-shrink-0 w-[280px] sm:w-[300px] transition-transform hover:scale-[1.02]"
//             >
//               <Link 
//                 to={`/explore?category=${category.name.toLowerCase()}`}
//                 className="block overflow-hidden rounded-xl group relative h-40 sm:h-48 transition-all duration-300 hover:shadow-lg glow-effect cyber-card"
//               >
//                 <img 
//                   src={category.image} 
//                   alt={category.name}
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-trueBlack/80 via-trueBlack/40 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
//                   <h3 className="text-lg sm:text-xl font-bold">{category.name}</h3>
//                   <p className="mt-1 text-xs sm:text-sm text-golden-light">{category.itemCount} items</p>
//                 </div>
//                 <div className="glossy-overlay"></div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoriesSection;


import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  name: string;
  image: string | undefined;
  itemCount: number;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<number | null>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      setIsAutoPlaying(false);
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      restartAutoPlay();
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      setIsAutoPlaying(false);
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      restartAutoPlay();
    }
  };

  const restartAutoPlay = () => {
    if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    setTimeout(startAutoPlay, 5000);
  };

  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    autoPlayInterval.current = window.setInterval(() => {
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
    startAutoPlay();
    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    };
  }, []);

  return (
    <section 
      className="py-6 sm:py-8 relative"
      onMouseEnter={() => {
        setShowControls(true);
        setIsAutoPlaying(false);
        if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
      }}
      onMouseLeave={() => {
        setShowControls(false);
        restartAutoPlay();
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Browse by Categories</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => {
              if (isAutoPlaying) {
                setIsAutoPlaying(false);
                if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
              } else {
                restartAutoPlay();
              }
            }}
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
      </div>

      <div className="relative group">
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

        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 sm:space-x-6 py-2 px-1"
        >
          {categories.map((category, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-[300px] transition-transform hover:scale-[1.02]"
            >
              <Link 
                to={`/explore?category=${category.name.toLowerCase()}`}
                className="block overflow-hidden rounded-xl group relative h-40 sm:h-48 transition-all duration-300 hover:shadow-lg glow-effect cyber-card"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-trueBlack/80 via-trueBlack/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <h3 className="text-lg sm:text-xl font-bold">{category.name}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-golden-light">{category.itemCount} items</p>
                </div>
                <div className="glossy-overlay"></div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
