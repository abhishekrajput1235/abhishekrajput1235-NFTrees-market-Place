import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import Layout from "./components/Layout";

// Pages
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import AmmyiPremintedPage from "./pages/AmmyiPremintedPage";
import NFTDetailPage from "./pages/NFTDetailPage";
import MintPage from "./pages/MintPage";
import ProfilePage from "./pages/ProfilePage";
import LuckyDrawPage from "./pages/LuckyDrawPage";
import NotFoundPage from "./pages/NotFoundPage";
import NFTDetailsPage2 from "./pages/NFTDetailsPage2 ";

// Components

import LoadingOverlay from "./components/LoadingOverlay";
import { useTheme } from "./contexts/ThemeContext";
import SupportPage from "./pages/SupportPage";

function App() {
  const { theme } = useTheme();
  // const { address, isConnected } = useAccount()
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark"
          ? "dark bg-trueBlack text-white"
          : "light bg-gradient-to-br from-gray-50 to-white text-gray-900"
      }`}
    >
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          <Layout>
            {/* <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"> */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore/nft" element={<ExplorePage />} />
                <Route path="/explore/token" element={<ExplorePage />} />
                <Route
                  path="/ammyi-preminted"
                  element={<AmmyiPremintedPage />}
                />
                <Route path="/nft/:id" element={<NFTDetailPage />} />
                <Route path="/mint" element={<MintPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/nft-tier/:id" element={<NFTDetailsPage2 />} />
                <Route path="/lucky-draw" element={<LuckyDrawPage />} />
                <Route path="*" element={<NotFoundPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
            {/* </main> */}
          </Layout>
        </>
      )}
    </div>
  );
}

export default App;
