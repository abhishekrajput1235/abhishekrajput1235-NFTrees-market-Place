import { Link } from 'react-router-dom'
import { Twitter, Instagram, Github as GitHub, Globe, Mail } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-br from-gray-100 to-white dark:from-darkGray dark:to-trueBlack pt-12 pb-8 border-t border-gray-200 dark:border-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-start">
              <Link to="/" className="flex items-center mb-4 group">
                <Logo className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
                <span className="ml-2 text-lg font-bold text-gradient-green">NFTrees</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-xs">
                Making a positive impact on the environment through blockchain technology and sustainable NFTs.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="https://twitter.com/nftrees" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-golden dark:text-gray-400 dark:hover:text-golden-light transition-colors p-2 rounded-full hover:bg-golden/10">
                  <Twitter size={18} />
                </a>
                <a href="https://instagram.com/nftrees" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-golden dark:text-gray-400 dark:hover:text-golden-light transition-colors p-2 rounded-full hover:bg-golden/10">
                  <Instagram size={18} />
                </a>
                <a href="https://github.com/nftrees" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-golden dark:text-gray-400 dark:hover:text-golden-light transition-colors p-2 rounded-full hover:bg-golden/10">
                  <GitHub size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Marketplace</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/mint" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Create NFT
                </Link>
              </li>
              <li>
                <Link to="/lucky-draw" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Lucky Draw
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore?category=forest" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Forest NFTs
                </Link>
              </li>
              <li>
                <Link to="/explore?category=water" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Water NFTs
                </Link>
              </li>
              <li>
                <Link to="/explore?category=animals" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Animal NFTs
                </Link>
              </li>
              <li>
                <Link to="/explore?category=energy" className="text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors text-sm">
                  Energy NFTs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@nftrees.io" className="hover:text-golden dark:hover:text-golden-light transition-colors">
                  info@nftrees.io
                </a>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Globe size={16} className="mr-2 flex-shrink-0" />
                <a href="https://www.amicoin.io" target="_blank" rel="noopener noreferrer" className="hover:text-golden dark:hover:text-golden-light transition-colors">
                  www.amicoin.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-charcoal my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            &copy; {currentYear} NFTrees Marketplace. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
            <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-golden dark:hover:text-golden-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer