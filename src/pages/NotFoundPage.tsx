import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 fade-in">
      <div className="mb-8 relative">
        <div className="text-8xl sm:text-9xl font-bold text-gray-200 dark:text-charcoal select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="120" 
            height="120" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-gray-300 dark:text-charcoal animate-float"
          >
            <path d="M12 2l2 5h5l-4 4 2 5-5-3-5 3 2-5-4-4h5z"></path>
          </svg>
        </div>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-sm sm:text-base">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link to="/" className="btn-primary flex items-center justify-center">
          <Home size={18} className="mr-2" />
          Go Home
        </Link>
        <Link to="/explore" className="btn-outline flex items-center justify-center">
          <Search size={18} className="mr-2" />
          Explore NFTs
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage