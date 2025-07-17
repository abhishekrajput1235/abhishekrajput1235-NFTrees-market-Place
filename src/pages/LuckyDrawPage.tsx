import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  Gift,
  Calendar,
  Timer,
  Users,
  Trophy,
  Medal,
  Award,
  Coins,
  AlertTriangle,
  Check,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LuckyDrawPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { isAuthenticated } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [participants, setParticipants] = useState(0);

  // Set the end date for the current lucky draw
  const drawEndDate = new Date();
  drawEndDate.setDate(drawEndDate.getDate() + 4); // 4 days from now
  drawEndDate.setHours(23, 59, 59, 0);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = drawEndDate.getTime() - now.getTime();

      if (difference <= 0) {
        // Draw has ended
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTimeRemaining, 1000);
    calculateTimeRemaining();

    return () => clearInterval(timer);
  }, [drawEndDate]);

  // Simulate fetching participant count
  useEffect(() => {
    setParticipants(Math.floor(Math.random() * 500) + 250);
  }, []);

  const handleEnterDraw = async () => {
    if (!isConnected || !isAuthenticated) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setHasEntered(true);
    setIsLoading(false);
  };

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  };

  return (
    <div className="fade-in pt-8">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
          NFTrees Lucky Draw
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
          Participate in our weekly lucky draw for a chance to win exclusive
          NFTs and AMMYI tokens. Every entry contributes to environmental
          conservation efforts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          {/* Current Draw Card */}
          <div className="cyber-card p-4 sm:p-6 bg-gradient-to-br from-golden/10 to-golden-dark/10 dark:from-golden-light/20 dark:to-golden/20 mb-6 sm:mb-8 glow-effect">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0 bg-gradient-to-br from-golden to-golden-dark rounded-xl flex items-center justify-center mb-4 md:mb-0 md:mr-6 glow-effect">
                <Gift size={40} className="text-white" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-golden-dark dark:text-golden-light">
                  Weekly Eco Heroes Draw
                </h2>
                <p className="text-golden dark:text-golden-light mb-4 text-sm sm:text-xs">
                  Enter this week's lucky draw for a chance to win amazing
                  prizes while supporting environmental conservation.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="flex items-center text-xs sm:text-sm text-golden-dark dark:text-golden-light bg-golden/20 px-3 py-1 rounded-full">
                    <Calendar size={14} className="mr-1" />
                    <span>Ends: {formatDate(drawEndDate)}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-golden-dark dark:text-golden-light bg-golden/20 px-3 py-1 rounded-full">
                    <Users size={14} className="mr-1" />
                    <span>{participants} participants</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="cyber-card bg-white dark:bg-darkGray rounded-xl p-4 mb-6 glow-effect">
              <h3 className="text-center text-sm font-medium mb-4 text-gray-600 dark:text-gray-400">
                TIME REMAINING
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="cyber-card bg-golden/10 dark:bg-golden-light/20 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-golden-dark dark:text-golden-light">
                    {timeRemaining.days}
                  </div>
                  <div className="text-xs text-golden">Days</div>
                </div>
                <div className="cyber-card bg-golden/10 dark:bg-golden-light/20 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-golden-dark dark:text-golden-light">
                    {timeRemaining.hours}
                  </div>
                  <div className="text-xs text-golden">Hours</div>
                </div>
                <div className="cyber-card bg-golden/10 dark:bg-golden-light/20 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-golden-dark dark:text-golden-light">
                    {timeRemaining.minutes}
                  </div>
                  <div className="text-xs text-golden">Minutes</div>
                </div>
                <div className="cyber-card bg-golden/10 dark:bg-golden-light/20 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-golden-dark dark:text-golden-light">
                    {timeRemaining.seconds}
                  </div>
                  <div className="text-xs text-golden">Seconds</div>
                </div>
              </div>
            </div>

            {isConnected && isAuthenticated ? (
              hasEntered ? (
                <div className="cyber-card bg-gradient-to-br from-primary-light/10 to-golden/10 dark:from-primary-dark/20 dark:to-golden-dark/20 border border-primary-light/30 dark:border-primary-dark/30 rounded-xl p-6 text-center glow-effect">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary-dark dark:text-primary-light">
                    You're In!
                  </h3>
                  <p className="text-primary dark:text-primary-light mb-4 text-sm sm:text-base">
                    Your entry has been confirmed. Winners will be announced
                    after the draw ends.
                  </p>
                  <div className="text-sm text-primary dark:text-primary-light">
                    Entry ID: #NFTREE-
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleEnterDraw}
                  disabled={isLoading}
                  className="w-full btn-secondary py-3 text-base sm:text-lg glow-effect"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Entry...
                    </span>
                  ) : (
                    "Enter Lucky Draw"
                  )}
                </button>
              )
            ) : (
              <ConnectKitButton.Custom>
                {({ show }) => (
                  <button
                    onClick={show}
                    className="w-full btn-secondary py-3 text-base sm:text-lg"
                  >
                    Connect Wallet to Enter
                  </button>
                )}
              </ConnectKitButton.Custom>
            )}
          </div>

          {/* Prizes Section */}
          <div className="cyber-card p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-6 dark:text-white flex items-center">
              <Trophy size={20} className="mr-2 text-golden" />
              Prizes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="cyber-card bg-gradient-to-br from-golden/10 to-golden-dark/10 dark:from-golden-light/20 dark:to-golden/20 p-4 rounded-xl relative glow-effect">
                <div className="absolute -top-3 -right-3 bg-golden text-trueBlack rounded-full w-8 h-8 flex items-center justify-center">
                  <Medal size={16} />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 text-golden-dark dark:text-golden-light">
                  1st Prize
                </h4>
                <ul className="text-golden dark:text-golden-light space-y-1 text-xs sm:text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Exclusive Legendary NFT
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    250 AMMYI Tokens
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Plant 5 Real Trees
                  </li>
                </ul>
              </div>
              <div className="cyber-card bg-gradient-to-br from-gray-50 to-gray-200 dark:from-charcoal/50 dark:to-darkGray/50 p-4 rounded-xl relative glow-effect">
                <div className="absolute -top-3 -right-3 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Medal size={16} />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 dark:text-white">
                  2nd Prize
                </h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-xs sm:text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Rare NFT
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    100 AMMYI Tokens
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Plant 2 Real Trees
                  </li>
                </ul>
              </div>
              <div className="cyber-card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl relative glow-effect">
                <div className="absolute -top-3 -right-3 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Medal size={16} />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 text-orange-900 dark:text-orange-300">
                  3rd Prize
                </h4>
                <ul className="text-orange-800 dark:text-orange-200 space-y-1 text-xs sm:text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Uncommon NFT
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    50 AMMYI Tokens
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    Plant 1 Real Tree
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="cyber-card p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-6 dark:text-white">
              How It Works
            </h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-golden flex items-center justify-center mr-4 glow-effect">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 dark:text-white">
                    Connect & Enter
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Connect your wallet and click the "Enter Lucky Draw" button
                    to participate.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-golden flex items-center justify-center mr-4 glow-effect">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 dark:text-white">
                    Wait for the Draw
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    The lucky draw happens automatically when the timer reaches
                    zero.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-golden flex items-center justify-center mr-4 glow-effect">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 dark:text-white">
                    Claim Your Prize
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Winners will be notified and can claim their prizes directly
                    in their wallet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Previous Winners */}
          <div className="cyber-card p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 dark:text-white flex items-center">
              <Award size={18} className="mr-2 text-primary" />
              Previous Winners
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                  alt="Winner"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium dark:text-white text-sm">
                    @tropicalartist
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Won Legendary NFT
                  </p>
                </div>
                <div className="ml-auto text-golden">
                  <Trophy size={16} />
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                  alt="Winner"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium dark:text-white text-sm">
                    @aquadesigner
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Won 100 AMMYI Tokens
                  </p>
                </div>
                <div className="ml-auto text-gray-500">
                  <Trophy size={16} />
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Winner"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium dark:text-white text-sm">
                    @wildlifeprotector
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Won Rare NFT
                  </p>
                </div>
                <div className="ml-auto text-orange-500">
                  <Trophy size={16} />
                </div>
              </div>
              <button className="text-golden text-sm hover:underline mt-2">
                View all winners
              </button>
            </div>
          </div>

          {/* Rewards Pool */}
          <div className="cyber-card p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 dark:text-white flex items-center">
              <Coins size={18} className="mr-2 text-golden" />
              Rewards Pool
            </h3>
            <div className="space-y-3">
              <div className="cyber-card bg-golden/10 dark:bg-golden-light/20 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-golden text-sm">Current Pool</span>
                  <span className="font-bold text-golden-dark dark:text-golden-light">
                    2,500 AMMYI
                  </span>
                </div>
                <div className="w-full bg-golden/20 dark:bg-golden-light/30 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-golden h-2.5 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  NFT Rewards
                </span>
                <span className="font-medium dark:text-white">
                  3 unique NFTs
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Token Rewards
                </span>
                <span className="font-medium dark:text-white">
                  400 AMMYI Tokens
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Conservation Donation
                </span>
                <span className="font-medium dark:text-white">
                  8 Trees to be planted
                </span>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="cyber-card p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 dark:text-white">
              Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li className="flex">
                <span className="mr-2">•</span>
                One entry per wallet address
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                Must be connected to claim prizes
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                Winners are selected randomly using Chainlink VRF
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                Prizes must be claimed within 7 days
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                5% of all entries go to environmental causes
              </li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex">
              <AlertTriangle
                size={16}
                className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mr-2 mt-0.5"
              />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                NFTrees is not responsible for any gas fees associated with
                claiming prizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckyDrawPage;
