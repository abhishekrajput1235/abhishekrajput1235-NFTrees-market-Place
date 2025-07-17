import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

interface User {
  address: string;
  username: string | null;
  avatar: string | null;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  updateProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const checkAuth = async () => {
      setIsLoading(true);
      
      if (isConnected && address) {
        const storedUser = localStorage.getItem(`nftrees_user_${address}`);
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Create a default user object
          const newUser = {
            address,
            username: null,
            avatar: null,
            isVerified: false
          };
          
          setUser(newUser);
          localStorage.setItem(`nftrees_user_${address}`, JSON.stringify(newUser));
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [isConnected, address]);

  const login = async (): Promise<boolean> => {
    try {
      if (!isConnected || !address) return false;
      
      // Sign a message to verify ownership of the address
      const message = `Sign this message to log in to NFTrees Marketplace. Timestamp: ${Date.now()}`;
      const signature = await signMessageAsync({ message });
      
      if (signature) {
        // In a real app, you'd verify this signature on the backend
        // For now, we'll just create a user object
        const newUser = {
          address,
          username: `user_${address.slice(2, 8)}`,
          avatar: `https://avatars.dicebear.com/api/personas/${address}.svg`,
          isVerified: true
        };
        
        setUser(newUser);
        localStorage.setItem(`nftrees_user_${address}`, JSON.stringify(newUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    disconnect();
  };

  const updateProfile = (data: Partial<User>) => {
    if (user && address) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem(`nftrees_user_${address}`, JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.isVerified,
        isLoading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};