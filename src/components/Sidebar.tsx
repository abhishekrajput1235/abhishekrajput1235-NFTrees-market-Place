




import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  PlusCircle,
  Gift,
  User,
  Crown,
  X,
  HelpCircle,
  Leaf,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "NFT", path: "/explore/nft", icon: Compass },
    { name: "Token", path: "/explore/token", icon: PlusCircle },
    { name: "AMMYI NFTs", path: "/ammyi-preminted", icon: Crown },
    { name: "Mint", path: "/mint", icon: PlusCircle },
    { name: "Lucky Draw", path: "/lucky-draw", icon: Gift },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Support", path: "/support", icon: HelpCircle },
  ];

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (isMobile) setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, setIsExpanded]);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {/* {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-14 left-2 z-40 p-3 rounded-full bg-gradient-to-r from-golden to-golden-dark text-trueBlack shadow-lg glow-effect hover:shadow-golden transition-all"
          aria-label="Toggle sidebar"
        >
          {isExpanded ? <X size={24} /> : <Leaf size={24} />}
        </button>
      )} */}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800
          ${
            isMobile
              ? isExpanded
                ? "w-64 translate-x-0"
                : "-translate-x-full"
              : isExpanded
              ? "w-64"
              : "w-20"
          }`}
      >
        {/* Decorative Top and Bottom Bars */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-golden"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-golden"></div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full p-4 overflow-hidden">
          {/* Close Button (Mobile Only) */}
          {isMobile && isExpanded && (
            <button
              onClick={toggleSidebar}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}

          {/* Logo */}
          <div
            className={`flex items-center mb-8 p-2 ${
              isExpanded ? "justify-start" : "justify-center"
            }`}
          >
            {isExpanded ? (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-golden to-golden-dark flex items-center justify-center mr-3">
                  <Leaf size={18} className="text-trueBlack" />
                </div>
                <span className="text-xl font-bold text-gradient-green">
                  NFTrees
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-golden to-golden-dark flex items-center justify-center text-trueBlack glow-effect hover:rotate-12 transition-transform">
                <Leaf size={18} />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => isMobile && setIsExpanded(false)}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 relative overflow-hidden group
                  ${
                    location.pathname === item.path
                      ? "bg-[linear-gradient(45deg,#00ffff,#ff00ff,#00ff00,#ff6600)] text-black"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                  ${isExpanded ? "justify-start" : "justify-center"}`}
              >
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                )}
                <item.icon
                  className={`${
                    isExpanded ? "mr-3" : ""
                  } flex-shrink-0 group-hover:scale-110 transition-transform`}
                  size={20}
                />
                {isExpanded && (
                  <span className="whitespace-nowrap overflow-hidden relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div
            className={`mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center 
            ${isExpanded ? "justify-start" : "justify-center"}`}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-golden to-golden-dark glow-effect flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            {isExpanded && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  User Name
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                  Premium
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Expand/Collapse Toggle */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`absolute -right-3 top-6 z-10 bg-white dark:bg-gray-800 p-1 rounded-full shadow-md border border-gray-200 dark:border-gray-700 
              transition-all hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isExpanded ? "rotate-180" : ""
              }`}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;

