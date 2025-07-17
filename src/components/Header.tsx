
import { useState } from "react";
import { Search, Sun, Moon, Bell, Gift, Leaf, X } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarExpanded: boolean;
}

const Header = ({ toggleSidebar, isSidebarExpanded }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications] = useState(true);

  return (
    <header
      className={`fixed top-0 z-40 h-[64px] flex items-center justify-between
        transition-all duration-300 bg-white/95 dark:bg-gray-900 backdrop-blur-md shadow-sm
        border-b border-gray-200 dark:border-gray-800 py-3 px-4 w-full
        ${isSidebarExpanded ? "md:left-64 md:w-[calc(100%-256px)]" : "md:left-20 md:w-[calc(100%-80px)]"}
      `}
    >
      {/* Left - Mobile Menu Toggle */}
      <div className="flex items-center md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:bg-yellow-500 rounded-full"
          aria-label="Toggle sidebar"
        >
          <Leaf className="h-5 w-5 text-gray-700 dark:text-black  " />
        </button>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 mx-2 sm:mx-4 max-w-xs sm:max-w-sm md:max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search NFTs, collections, or accounts..."
            className="block w-full pl-10 pr-3 py-2 text-sm border border-transparent rounded-lg leading-5
              bg-gray-100 dark:bg-black/40 text-gray-700 dark:text-gray-300 placeholder-gray-500
              focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500
              transition-all duration-200 group-hover:shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-4 flex-shrink-0">
        {/* Bell */}
        <button
          className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
          {hasNotifications && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          )}
        </button>

        {/* Gift */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          aria-label="Special offers"
        >
          <Gift className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 transition-colors" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400 group-hover:rotate-12 transition-transform" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700 group-hover:rotate-12 transition-transform" />
          )}
        </button>

        {/* Wallet Connect */}
        <ConnectKitButton.Custom>
  {({ isConnected, show }) => (
    <button
      onClick={show}
      className="relative group
                 px-3 py-1.5 text-xs
                 sm:px-3 sm:py-1.5 sm:text-xs
                 md:px-2.5 md:py-1.5 md:text-xs
                 rounded-md sm:rounded-lg w-full sm:w-auto font-medium text-white
                 bg-gradient-to-br from-deepGreen.DEFAULT via-charcoal to-trueBlack
                 border border-golden.DEFAULT shadow-md hover:scale-105 transition-transform duration-300
                 backdrop-blur-xs overflow-hidden z-10"
    >
      {/* Outer RGB Glow */}
      <span
        className="absolute inset-0 z-0 pointer-events-none rounded-md sm:rounded-lg blur-[4px]
                   opacity-50 group-hover:opacity-80 animate-hologram 
                   bg-[conic-gradient(at_top_left,_#00FFFF,_#FF00FF,_#00FF00,_#FF6600,_#FFD700,_#00FFFF)]"
      />

      {/* Glowing Pulse Outline */}
      <span
        className="absolute -inset-[1px] z-0 rounded-md sm:rounded-lg 
                   border border-golden.DEFAULT animate-pulse-glow opacity-30"
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-1 truncate">
        {isConnected ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-neon.green animate-tech-pulse" />
            <span className="text-golden.light truncate">Connected</span>
          </>
        ) : (
          <span className="text-neon.blue animate-pulse truncate">Connect Wallet</span>
        )}
      </span>
    </button>
  )}
</ConnectKitButton.Custom>






      </div>
    </header>
  );
};

export default Header;
