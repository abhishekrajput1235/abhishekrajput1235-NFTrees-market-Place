import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiConfig, createConfig } from 'wagmi'
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { NFTProvider } from './contexts/NFTContext'
import { ReferralProvider } from './contexts/ReferralContext'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// Get environment variables with fallbacks
const alchemyId = import.meta.env.VITE_ALCHEMY_ID
const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

// Only create wagmi config if we have valid API keys
let wagmiConfig

try {
  wagmiConfig = createConfig(
  
    getDefaultConfig({
      appName: 'NFTrees Marketplace',
      walletConnectProjectId: walletConnectProjectId, // ✅ Add this line
      chains: [mainnet, polygon, polygonMumbai]
    })
    
  )
} catch (error) {
  console.warn('Failed to initialize wagmi config with provided API keys. Using minimal config.')
  
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      {wagmiConfig && <WagmiConfig config={wagmiConfig} >
      <ConnectKitProvider>
            <ThemeProvider>
              <AuthProvider>
                <NFTProvider>
                  <ReferralProvider>
                    <App />
                  </ReferralProvider>
                </NFTProvider>
              </AuthProvider>
            </ThemeProvider>
          </ConnectKitProvider>
        </WagmiConfig>}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)