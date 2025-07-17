import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { Menu, X, Sun, Moon, Crown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import Logo from './Logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isConnected } = useAccount()
  const location = useLocation()
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'AMMYI NFTs', path: '/ammyi-preminted', icon: Crown },
    { name: 'Mint', path: '/mint' },
    { name: 'Lucky Draw', path: '/lucky-draw' },
    { name: isConnected ? 'My Profile' : 'Connect', path: isConnected ? '/profile' : '#' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-trueBlack/95 backdrop-blur-md shadow-lg py-2 ' 
        : 'bg-transparent py-3 sm:py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <Logo className="h-8 w-auto sm:h-10 transition-transform duration-300 group-hover:scale-110 glow-effect" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gradient-green">NFTrees</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link, index) => (
              link.name !== 'Connect' ? (
                <Link 
                  key={index} 
                  to={link.path}
                  className={`font-medium transition-all duration-300 text-sm lg:text-base relative flex items-center ${
                    location.pathname === link.path 
                      ? 'text-golden dark:text-golden-light glow-effect' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-golden dark:hover:text-golden-light'
                  }`}
                >
                  {link.icon && <link.icon size={16} className="mr-1" />}
                  {link.name}
                  {location.pathname === link.path && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-golden to-golden-dark animate-shimmer-light"></div>
                  )}
                </Link>
              ) : null
            ))}
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-golden/10 dark:hover:bg-golden-light/10 transition-all duration-300 glow-effect"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} className="text-golden-light" /> : <Moon size={18} className="text-deepGreen" />}
            </button>
            
            <ConnectKitButton.Custom>
              {({ isConnected, show }) => (
                <button 
                  onClick={show} 
                  className="btn-primary text-sm glow-effect"
                >
                  {isConnected ? 'Connected' : 'Connect Wallet'}
                </button>
              )}
            </ConnectKitButton.Custom>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-golden/10 dark:hover:bg-golden-light/10 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} className="text-golden-light" /> : <Moon size={18} className="text-deepGreen" />}
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-golden/10 dark:hover:bg-golden-light/10 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="flex flex-col space-y-2 pb-4 cyber-card p-4 shadow-lg">
            {navLinks.map((link, index) => (
              link.name !== 'Connect' ? (
                <Link 
                  key={index} 
                  to={link.path}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center ${
                    location.pathname === link.path 
                      ? 'bg-golden/20 text-golden dark:text-golden-light glow-effect' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal hover:glow-effect'
                  }`}
                >
                  {link.icon && <link.icon size={16} className="mr-2" />}
                  {link.name}
                </Link>
              ) : null
            ))}
            
            <div className="px-4 pt-2">
              <ConnectKitButton.Custom>
                {({ isConnected, show }) => (
                  <button 
                    onClick={show} 
                    className="w-full btn-primary text-sm"
                  >
                    {isConnected ? 'Connected' : 'Connect Wallet'}
                  </button>
                )}
              </ConnectKitButton.Custom>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar