import { createContext, useContext, useState, ReactNode } from 'react';
import { useAccount } from 'wagmi';

interface ReferralContextType {
  referralCode: string | null;
  referredBy: string | null;
  referralLink: string | null;
  referralEarnings: number;
  referralCount: number;
  generateReferralCode: () => Promise<string>;
  applyReferralCode: (code: string) => Promise<boolean>;
  getReferralStats: () => Promise<{ earnings: number; count: number }>;
}

const ReferralContext = createContext<ReferralContextType>({
  referralCode: null,
  referredBy: null,
  referralLink: null,
  referralEarnings: 0,
  referralCount: 0,
  generateReferralCode: async () => '',
  applyReferralCode: async () => false,
  getReferralStats: async () => ({ earnings: 0, count: 0 }),
});

export const useReferral = () => useContext(ReferralContext);

interface ReferralProviderProps {
  children: ReactNode;
}

export const ReferralProvider: React.FC<ReferralProviderProps> = ({ children }) => {
  const { address } = useAccount();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [referralCount, setReferralCount] = useState(0);

  // Get referral link if referral code exists
  const referralLink = referralCode 
    ? `${window.location.origin}/?ref=${referralCode}` 
    : null;

  // Generate a random referral code based on address
  const generateReferralCode = async (): Promise<string> => {
    if (!address) return '';
    
    try {
      // In a real app, this would call an API endpoint or smart contract
      // Here we'll just generate a random code based on the address
      const randomCode = `${address.slice(2, 7)}-${Math.floor(Math.random() * 10000)}`;
      setReferralCode(randomCode);
      
      // Save to localStorage for persistence
      localStorage.setItem(`nftrees_referral_code_${address}`, randomCode);
      
      return randomCode;
    } catch (error) {
      console.error('Error generating referral code:', error);
      return '';
    }
  };

  // Apply a referral code
  const applyReferralCode = async (code: string): Promise<boolean> => {
    if (!address || referredBy) return false;
    
    try {
      // In a real app, this would verify the code with an API or smart contract
      // Here we'll just do a simple check
      if (code.length < 5) return false;
      
      setReferredBy(code);
      
      // Save to localStorage for persistence
      localStorage.setItem(`nftrees_referred_by_${address}`, code);
      
      return true;
    } catch (error) {
      console.error('Error applying referral code:', error);
      return false;
    }
  };

  // Get referral stats
  const getReferralStats = async (): Promise<{ earnings: number; count: number }> => {
    if (!address) return { earnings: 0, count: 0 };
    
    try {
      // In a real app, this would fetch data from an API or smart contract
      // Here we'll just return mock data
      const mockEarnings = Math.floor(Math.random() * 100) / 10;
      const mockCount = Math.floor(Math.random() * 10);
      
      setReferralEarnings(mockEarnings);
      setReferralCount(mockCount);
      
      return { earnings: mockEarnings, count: mockCount };
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      return { earnings: 0, count: 0 };
    }
  };

  return (
    <ReferralContext.Provider
      value={{
        referralCode,
        referredBy,
        referralLink,
        referralEarnings,
        referralCount,
        generateReferralCode,
        applyReferralCode,
        getReferralStats,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};