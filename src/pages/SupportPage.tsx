import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, HelpCircle, FileText, CreditCard, User, Box, Settings, Globe, Bookmark, Gift } from 'lucide-react'

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const faqs = {
    general: [
      {
        id: 'what-is-nft',
        question: 'What is an NFT?',
        answer: 'NFT stands for Non-Fungible Token. It is a unique digital asset that represents ownership of a specific item or piece of content, stored on a blockchain. Unlike cryptocurrencies like Bitcoin, each NFT has unique properties and cannot be exchanged on a one-to-one basis.'
      },
      {
        id: 'how-nft-works',
        question: 'How do NFTs work?',
        answer: 'NFTs work on blockchain technology, typically Ethereum or Polygon. Each NFT has a unique identifier that distinguishes it from other tokens. This allows for verifiable ownership and provenance of digital assets like art, music, collectibles, and more.'
      },
      {
        id: 'why-buy-nft',
        question: 'Why would I buy an NFT?',
        answer: 'People buy NFTs for various reasons: to support creators, as collectibles, for investment purposes, for exclusive access to content or communities, or simply to own unique digital items with verifiable ownership.'
      }
    ],
    account: [
      {
        id: 'create-account',
        question: 'How do I create an account?',
        answer: 'To create an account, connect your crypto wallet using the "Connect Wallet" button. No traditional account creation is needed - your wallet acts as your login.'
      },
      {
        id: 'recover-account',
        question: 'How do I recover my account?',
        answer: 'Since your account is tied to your crypto wallet, you just need to reconnect your wallet. If you lose access to your wallet, you\'ll need to use your wallet\'s recovery process (usually via seed phrase).'
      },
      {
        id: 'change-profile',
        question: 'How do I change my profile information?',
        answer: 'Go to your profile page and click "Edit Profile". You can update your username, bio, and social links. Some information like wallet address cannot be changed.'
      }
    ],
    creating: [
      {
        id: 'how-create-nft',
        question: 'How do I create an NFT?',
        answer: 'Click "Create" in the navigation, upload your digital file, add details like name and description, set your price or auction parameters, and confirm the transaction with your wallet.'
      },
      {
        id: 'cost-create-nft',
        question: 'Does it cost anything to create an NFT?',
        answer: 'Yes, creating an NFT requires paying gas fees for the blockchain transaction. These fees vary based on network congestion and the blockchain you\'re using.'
      },
      {
        id: 'what-can-create',
        question: 'What can I turn into an NFT?',
        answer: 'You can create NFTs from digital files like images, videos, music, 3D models, or documents. Ensure you own the rights to the content you\'re minting.'
      }
    ],
    buying: [
      {
        id: 'how-buy-nft',
        question: 'How do I buy an NFT?',
        answer: 'Connect your wallet, browse NFTs, click on one you like, and select "Buy Now" or place a bid if it\'s an auction. Confirm the transaction in your wallet.'
      },
      {
        id: 'what-need-buy',
        question: 'What do I need to buy an NFT?',
        answer: 'You need a connected crypto wallet with sufficient funds (usually ETH or MATIC) to cover the NFT price and gas fees.'
      },
      {
        id: 'after-purchase',
        question: 'What happens after I purchase an NFT?',
        answer: 'The NFT will be transferred to your wallet. You can view it in your collection, resell it, or display it in compatible applications.'
      }
    ]
  }

  return (
    <div className="fade-in pt-4 sm:pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="cyber-card p-4 sm:p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6 dark:text-white flex items-center">
              <HelpCircle className="mr-2" />
              Support Center
            </h2>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'general' 
                  ? 'bg-gradient-to-r from-golden/20 to-golden-dark/20 text-golden glow-effect' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal'}`}
              >
                <Shield className="mr-3" size={18} />
                General
              </button>
              
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'account' 
                  ? 'bg-gradient-to-r from-golden/20 to-golden-dark/20 text-golden glow-effect' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal'}`}
              >
                <User className="mr-3" size={18} />
                Account
              </button>
              
              <button
                onClick={() => setActiveTab('creating')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'creating' 
                  ? 'bg-gradient-to-r from-golden/20 to-golden-dark/20 text-golden glow-effect' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal'}`}
              >
                <Box className="mr-3" size={18} />
                Creating NFTs
              </button>
              
              <button
                onClick={() => setActiveTab('buying')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'buying' 
                  ? 'bg-gradient-to-r from-golden/20 to-golden-dark/20 text-golden glow-effect' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal'}`}
              >
                <CreditCard className="mr-3" size={18} />
                Buying NFTs
              </button>
            </nav>
            
         
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="cyber-card p-6 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
              {activeTab === 'general' && 'General Questions'}
              {activeTab === 'account' && 'Account Help'}
              {activeTab === 'creating' && 'Creating NFTs'}
              {activeTab === 'buying' && 'Buying NFTs'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions about {activeTab === 'general' && 'NFTs and our platform'}
              {activeTab === 'account' && 'managing your account'}
              {activeTab === 'creating' && 'creating and minting NFTs'}
              {activeTab === 'buying' && 'purchasing and collecting NFTs'}.
            </p>
          </div>
          
          {/* FAQ List */}
          <div className="space-y-4">
            {faqs[activeTab as keyof typeof faqs].map((faq) => (
              <div key={faq.id} className="cyber-card overflow-hidden">
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className={`w-full flex justify-between items-center p-4 sm:p-6 text-left ${
                    expandedQuestion === faq.id ? 'bg-gray-50 dark:bg-charcoal' : ''
                  }`}
                >
                  <h3 className="font-medium text-lg dark:text-white">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                      expandedQuestion === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedQuestion === faq.id && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-gray-600 dark:text-gray-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Still Need Help Section */}
          <div className="cyber-card mt-8 p-6 bg-gradient-to-br from-golden/10 to-golden-dark/10 dark:from-golden-light/20 dark:to-golden/20">
            <div className="text-center">
              <Gift className="mx-auto mb-4 text-golden-dark dark:text-golden-light" size={32} />
              <h3 className="text-xl font-bold mb-2 text-golden-dark dark:text-golden-light">Still need help?</h3>
              <p className="text-golden-dark/80 dark:text-golden-light/80 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  className="btn-primary glow-effect"
                >
                  Contact Support
                </button>
                <button className="btn-secondary glow-effect">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage