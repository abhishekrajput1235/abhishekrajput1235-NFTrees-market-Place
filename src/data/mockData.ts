import { NFT, AmmyiTier, TiercatData } from '../types';

// AMMYI Tier definitions
export const ammyiTiers: AmmyiTier[] = [
  {
    name: 'Bronze',
    price: 10,
    purpose: 'Entry-level, affordable NFTs',
    visualContent: 'Memes, simple animations, emojis, etc.',
    color: {
      primary: '#CD7F32',
      secondary: '#8B4513',
      gradient: 'from-amber-600 to-amber-800'
    },
    icon: '🥉'
  },
  {
    name: 'Silver',
    price: 20,
    purpose: 'Popular content, slightly rarer',
    visualContent: 'Hot girl images, stylish cartoons, nature',
    color: {
      primary: '#C0C0C0',
      secondary: '#808080',
      gradient: 'from-gray-400 to-gray-600'
    },
    icon: '🥈'
  },
  {
    name: 'Gold',
    price: 40,
    purpose: 'Viral & collectible visuals',
    visualContent: 'Guns, trending photos, cinematic styles',
    color: {
      primary: '#FFD700',
      secondary: '#DAA520',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    icon: '🥇'
  },
  {
    name: 'Platinum',
    price: 60,
    purpose: 'High-quality animations & exclusive art',
    visualContent: 'Fantasy, semi-NSFW, digital premium',
    color: {
      primary: '#E5E4E2',
      secondary: '#BCC6CC',
      gradient: 'from-slate-300 to-slate-500'
    },
    icon: '💎'
  },
  {
    name: 'Diamond',
    price: 100,
    purpose: 'Rare drops, AI art, legends, 1/1s',
    visualContent: 'Premium AI art, adult themes, luxury items',
    color: {
      primary: '#B9F2FF',
      secondary: '#4FC3F7',
      gradient: 'from-cyan-300 to-blue-500'
    },
    icon: '💠'
  }
  ,



];

export const mockNFTs: NFT[] = [
  // AMMYI Preminted Tiers
  {
    id: 'nft-1',
    name: 'Ancient Redwood Guardian',
    description: 'A majestic redwood tree that has stood for centuries, symbolizing strength and resilience in the face of environmental challenges.',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg',
    price: 10,
    currency: 'AMMYI',
    creator: {
      name: 'EcoArtist',
      username: 'ecoartist',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'EcoArtist',
      username: 'ecoartist',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'AMMYI Preminted',
    category: 'Bronze',
    tier: 'Bronze',
    status: 'For Sale',
    likes: 42,
    createdAt: '2023-10-15T14:30:00Z',
    tokenId: '1001',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Tier', value: 'Bronze' },
      { trait_type: 'Environment Type', value: 'Forest' },
      { trait_type: 'Age', value: 'Ancient' },
      { trait_type: 'Rarity', value: 'Common' },
      { trait_type: 'Carbon Offset', value: '100kg' },
    ]
    // ,
    // history: [
    //   {
    //     id: 'history-1',
    //     type: 'Mint',
    //     from: '0x0000000000000000000000000000000000000000',
    //     to: '0xEcoArtist',
    //     timestamp: '2023-10-15T14:30:00Z',
    //     txHash: '0xabcdef123456789',
    //   }
    // ]
  },
  {
    id: 'nft-2',
    name: 'Crystal Clear Waters',
    description: 'A stunning representation of pristine waters, reminding us of the importance of clean water ecosystems.',
    image: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
    price: 20,
    currency: 'AMMYI',
    creator: {
      name: 'AquaDesigner',
      username: 'aquadesigner',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'AquaDesigner',
      username: 'aquadesigner',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'AMMYI Preminted',
    category: 'Silver',
    tier: 'Silver',
    status: 'For Sale',
    likes: 38,
    createdAt: '2023-10-16T09:45:00Z',
    tokenId: '1002',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Tier', value: 'Silver' },
      { trait_type: 'Environment Type', value: 'Water' },
      { trait_type: 'Clarity', value: 'Crystal' },
      { trait_type: 'Rarity', value: 'Uncommon' },
      { trait_type: 'Water Conservation', value: '200 gallons' },
    ]
  },
  {
    id: 'nft-3',
    name: 'Endangered Wisdom',
    description: 'A depiction of an endangered elephant, representing the wisdom and memory of nature that we stand to lose.',
    image: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
    price: 40,
    currency: 'AMMYI',
    creator: {
      name: 'WildlifeProtector',
      username: 'wildlifeprotector',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'ConservationFund',
      username: 'conservationfund',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'AMMYI Preminted',
    category: 'Gold',
    tier: 'Gold',
    status: 'For Sale',
    likes: 64,
    createdAt: '2023-10-10T11:20:00Z',
    tokenId: '1003',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Tier', value: 'Gold' },
      { trait_type: 'Environment Type', value: 'Animals' },
      { trait_type: 'Species', value: 'African Elephant' },
      { trait_type: 'Rarity', value: 'Rare' },
      { trait_type: 'Conservation Status', value: 'Endangered' },
    ],
    endsIn: '2d 5h 30m'
  },
  {
    id: 'nft-4',
    name: 'Solar Harmony',
    description: 'A beautiful representation of solar energy harnessed in harmony with nature, powering our future sustainably.',
    image: 'https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg',
    price: 60,
    currency: 'AMMYI',
    creator: {
      name: 'SustainableFuture',
      username: 'sustainablefuture',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'SustainableFuture',
      username: 'sustainablefuture',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'AMMYI Preminted',
    category: 'Platinum',
    tier: 'Platinum',
    status: 'For Sale',
    likes: 29,
    createdAt: '2023-10-18T16:15:00Z',
    tokenId: '1004',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Tier', value: 'Platinum' },
      { trait_type: 'Environment Type', value: 'Energy' },
      { trait_type: 'Energy Type', value: 'Solar' },
      { trait_type: 'Rarity', value: 'Epic' },
      { trait_type: 'Carbon Reduction', value: '350kg' },
    ]
  },
  {
    id: 'nft-5',
    name: 'Sacred Mountain Peak',
    description: 'A majestic mountain landscape representing the untouched beauty of our natural world and the importance of land conservation.',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    price: 100,
    currency: 'AMMYI',
    creator: {
      name: 'LandKeeper',
      username: 'landkeeper',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'LandKeeper',
      username: 'landkeeper',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'AMMYI Preminted',
    category: 'Diamond',
    tier: 'Diamond',
    status: 'For Sale',
    likes: 87,
    createdAt: '2023-10-05T08:30:00Z',
    tokenId: '1005',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Tier', value: 'Diamond' },
      { trait_type: 'Environment Type', value: 'Land' },
      { trait_type: 'Terrain', value: 'Mountain' },
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Conservation Impact', value: 'Very High' },
    ],
    endsIn: '1d 12h 45m'
  },



  // Art Category
  {
    id: 'nft-6',
    name: 'Digital Renaissance',
    description: 'A modern interpretation of classical art techniques merged with digital innovation.',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
    price: 2.5,
    currency: 'ETH',
    creator: {
      name: 'DigitalMaster',
      username: 'digitalmaster',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'DigitalMaster',
      username: 'digitalmaster',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Digital Renaissance',
    category: 'Art',
    status: 'For Sale',
    likes: 156,
    createdAt: '2023-10-14T13:45:00Z',
    tokenId: '1006',
    blockchain: 'Ethereum',
    attributes: [
      { trait_type: 'Style', value: 'Renaissance' },
      { trait_type: 'Medium', value: 'Digital' },
      { trait_type: 'Rarity', value: 'Epic' },
      { trait_type: 'Artist Level', value: 'Master' },
    ]
  },

  // Photography Category
  {
    id: 'nft-7',
    name: 'Urban Sunset',
    description: 'A breathtaking capture of golden hour in the city, where nature meets urban architecture.',
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
    price: 1.2,
    currency: 'ETH',
    creator: {
      name: 'UrbanLens',
      username: 'urbanlens',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'UrbanLens',
      username: 'urbanlens',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Photography',
    category: 'Photography',
    status: 'For Sale',
    likes: 73,
    createdAt: '2023-10-17T10:20:00Z',
    tokenId: '1007',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Time of Day', value: 'Golden Hour' },
      { trait_type: 'Location', value: 'Urban' },
      { trait_type: 'Camera', value: 'Professional' },
      { trait_type: 'Edition', value: 'Limited' },
    ]
  },

  // Gaming Category
  {
    id: 'nft-8',
    name: 'Legendary Sword of Elements',
    description: 'A powerful weapon forged from the essence of fire, water, earth, and air. Grants special abilities in-game.',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    price: 0.8,
    currency: 'ETH',
    creator: {
      name: 'GameForge',
      username: 'gameforge',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'GameForge',
      username: 'gameforge',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Epic Weapons',
    category: 'Gaming',
    status: 'For Sale',
    likes: 234,
    createdAt: '2023-10-12T15:10:00Z',
    tokenId: '1008',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Weapon Type', value: 'Sword' },
      { trait_type: 'Element', value: 'All Elements' },
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Power Level', value: '9500' },
    ],
    endsIn: '3d 8h 15m'
  },

  // Music Category
  {
    id: 'nft-9',
    name: 'Ethereal Symphony #1',
    description: 'An exclusive audio-visual NFT featuring an original composition with stunning visual accompaniment.',
    image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg',
    price: 3,
    currency: 'ETH',
    creator: {
      name: 'SoundWave',
      username: 'soundwave',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'SoundWave',
      username: 'soundwave',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Ethereal Sounds',
    category: 'Music',
    status: 'For Sale',
    likes: 189,
    createdAt: '2023-10-11T14:30:00Z',
    tokenId: '1009',
    blockchain: 'Ethereum',
    attributes: [
      { trait_type: 'Genre', value: 'Ambient' },
      { trait_type: 'Duration', value: '4:32' },
      { trait_type: 'BPM', value: '120' },
      { trait_type: 'Key', value: 'C Major' },
    ]
  },

  // Sports Category
  {
    id: 'nft-10',
    name: 'Championship Moment',
    description: 'A historic sports moment captured forever on the blockchain. Relive the glory of victory.',
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
    price: 1.5,
    currency: 'ETH',
    creator: {
      name: 'SportsMoments',
      username: 'sportsmoments',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'SportsMoments',
      username: 'sportsmoments',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Historic Moments',
    category: 'Sports',
    status: 'For Sale',
    likes: 312,
    createdAt: '2023-10-09T16:45:00Z',
    tokenId: '1010',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Sport', value: 'Football' },
      { trait_type: 'Event', value: 'Championship' },
      { trait_type: 'Year', value: '2023' },
      { trait_type: 'Significance', value: 'Historic' },
    ]
  },

  // Collectibles Category
  {
    id: 'nft-11',
    name: 'Vintage Space Explorer',
    description: 'A rare collectible from the golden age of space exploration, featuring retro-futuristic design.',
    image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
    price: 2.2,
    currency: 'ETH',
    creator: {
      name: 'RetroCollector',
      username: 'retrocollector',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'RetroCollector',
      username: 'retrocollector',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Retro Future',
    category: 'Collectibles',
    status: 'For Sale',
    likes: 145,
    createdAt: '2023-10-08T11:15:00Z',
    tokenId: '1011',
    blockchain: 'Ethereum',
    attributes: [
      { trait_type: 'Era', value: '1960s' },
      { trait_type: 'Theme', value: 'Space' },
      { trait_type: 'Condition', value: 'Mint' },
      { trait_type: 'Series', value: 'Limited Edition' },
    ]
  },

  // Virtual Worlds Category
  {
    id: 'nft-12',
    name: 'Metaverse Villa',
    description: 'A luxurious virtual property in the heart of the metaverse. Perfect for hosting events and showcasing NFTs.',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
    price: 15,
    currency: 'ETH',
    creator: {
      name: 'MetaBuilder',
      username: 'metabuilder',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'MetaBuilder',
      username: 'metabuilder',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Virtual Real Estate',
    category: 'Virtual Worlds',
    status: 'For Sale',
    likes: 89,
    createdAt: '2023-10-07T09:30:00Z',
    tokenId: '1012',
    blockchain: 'Ethereum',
    attributes: [
      { trait_type: 'Size', value: 'Large' },
      { trait_type: 'Location', value: 'Prime' },
      { trait_type: 'Amenities', value: 'Luxury' },
      { trait_type: 'Accessibility', value: 'Public' },
    ]
  },

  // Trading Cards Category
  {
    id: 'nft-13',
    name: 'Legendary Dragon Card',
    description: 'An ultra-rare trading card featuring a mythical dragon with incredible stats and abilities.',
    image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg',
    price: 0.6,
    currency: 'ETH',
    creator: {
      name: 'CardMaster',
      username: 'cardmaster',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'CardMaster',
      username: 'cardmaster',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Mythical Creatures',
    category: 'Trading Cards',
    status: 'For Sale',
    likes: 267,
    createdAt: '2023-10-06T13:20:00Z',
    tokenId: '1013',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Creature', value: 'Dragon' },
      { trait_type: 'Attack', value: '9000' },
      { trait_type: 'Defense', value: '8500' },
      { trait_type: 'Rarity', value: 'Ultra Rare' },
    ]
  },

  // Utility Category
  {
    id: 'nft-14',
    name: 'Premium Access Pass',
    description: 'Grants exclusive access to premium features, events, and content across multiple platforms.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    price: 0.5,
    currency: 'ETH',
    creator: {
      name: 'AccessGrant',
      username: 'accessgrant',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'AccessGrant',
      username: 'accessgrant',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Access Tokens',
    category: 'Utility',
    status: 'For Sale',
    likes: 198,
    createdAt: '2023-10-05T15:45:00Z',
    tokenId: '1014',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Access Level', value: 'Premium' },
      { trait_type: 'Duration', value: '1 Year' },
      { trait_type: 'Platforms', value: 'Multi-Platform' },
      { trait_type: 'Transferable', value: 'Yes' },
    ]
  },

  // Domain Names Category
  {
    id: 'nft-15',
    name: 'crypto.eth',
    description: 'A premium ENS domain name perfect for crypto businesses and enthusiasts.',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    price: 25,
    currency: 'ETH',
    creator: {
      name: 'DomainKing',
      username: 'domainking',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'DomainKing',
      username: 'domainking',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Premium Domains',
    category: 'Domain Names',
    status: 'For Sale',
    likes: 156,
    createdAt: '2023-10-04T12:00:00Z',
    tokenId: '1015',
    blockchain: 'Ethereum',
    attributes: [
      { trait_type: 'Length', value: '6 Characters' },
      { trait_type: 'Extension', value: '.eth' },
      { trait_type: 'Category', value: 'Crypto' },
      { trait_type: 'Memorability', value: 'High' },
    ]
  },

  // Memes Category
  {
    id: 'nft-16',
    name: 'Doge to the Moon',
    description: 'The classic meme that started it all. A piece of internet history immortalized on the blockchain.',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    price: 0.3,
    currency: 'ETH',
    creator: {
      name: 'MemeKing',
      username: 'memeking',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'MemeKing',
      username: 'memeking',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Classic Memes',
    category: 'Memes',
    status: 'For Sale',
    likes: 445,
    createdAt: '2023-10-03T18:30:00Z',
    tokenId: '1016',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Meme Type', value: 'Classic' },
      { trait_type: 'Popularity', value: 'Viral' },
      { trait_type: 'Era', value: '2010s' },
      { trait_type: 'Cultural Impact', value: 'High' },
    ]
  },

  // PFPs (Profile Pictures) Category
  {
    id: 'nft-17',
    name: 'Cyber Punk Avatar #2847',
    description: 'A unique cyberpunk-style avatar with rare traits and accessories. Perfect for your digital identity.',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
    price: 1.8,
    currency: 'ETH',
    creator: {
      name: 'AvatarLab',
      username: 'avatarlab',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'AvatarLab',
      username: 'avatarlab',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Cyber Punks',
    category: 'PFPs (Profile Pictures)',
    status: 'For Sale',
    likes: 178,
    createdAt: '2023-10-02T14:15:00Z',
    tokenId: '1017',
    blockchain: 'Ethereum',
    attributes: [
      { trait_type: 'Background', value: 'Neon City' },
      { trait_type: 'Hair', value: 'Electric Blue' },
      { trait_type: 'Eyes', value: 'Cyber Implants' },
      { trait_type: 'Accessories', value: 'Neural Interface' },
    ]
  },

  // 1/1 Art Category
  {
    id: 'nft-18',
    name: 'Solitude in Motion',
    description: 'A one-of-a-kind artistic expression exploring the relationship between movement and stillness.',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
    price: 8.5,
    currency: 'ETH',
    creator: {
      name: 'SoloArtist',
      username: 'soloartist',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'SoloArtist',
      username: 'soloartist',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Solo Expressions',
    category: 'Art new',
    status: 'For Sale',
    likes: 234,
    createdAt: '2023-10-01T10:30:00Z',
    tokenId: '1018',
    blockchain: 'Ethereum',
    attributes: [
      { trait_type: 'Type', value: 'One of One' },
      { trait_type: 'Medium', value: 'Digital Paint' },
      { trait_type: 'Style', value: 'Abstract' },
      { trait_type: 'Emotion', value: 'Contemplative' },
    ]
  },

  // Additional Forest NFT
  {
    id: 'nft-19',
    name: 'Mystical Forest Path',
    description: 'A enchanting forest path that leads to unknown wonders, representing the journey of environmental discovery.',
    image: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg',
    price: 4.1,
    currency: 'AMMYI',
    creator: {
      name: 'ForestWalker',
      username: 'forestwalker',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'ForestWalker',
      username: 'forestwalker',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Enchanted Forest',
    category: 'Additional Forest',
    status: 'For Sale',
    likes: 92,
    createdAt: '2023-09-30T16:45:00Z',
    tokenId: '1019',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Path Type', value: 'Mystical' },
      { trait_type: 'Rarity', value: 'Epic' },
      { trait_type: 'Atmosphere', value: 'Enchanted' },
      { trait_type: 'Conservation Impact', value: 'High' },
    ]
  },

  // Additional Water NFT
  {
    id: 'nft-20',
    name: 'Ocean Depths Mystery',
    description: 'Dive into the mysterious depths of the ocean where countless species thrive in the blue unknown.',
    image: 'https://images.pexels.com/photos/3309886/pexels-photo-3309886.jpeg',
    price: 3.7,
    currency: 'AMMYI',
    creator: {
      name: 'DeepSea',
      username: 'deepsea',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    owner: {
      name: 'DeepSea',
      username: 'deepsea',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    collection: 'Water Wonders',
    category: 'Additional Water',
    status: 'For Sale',
    likes: 128,
    createdAt: '2023-09-29T11:20:00Z',
    tokenId: '1020',
    blockchain: 'Polygon',
    attributes: [
      { trait_type: 'Depth', value: 'Abyssal' },
      { trait_type: 'Marine Life', value: 'Diverse' },
      { trait_type: 'Rarity', value: 'Rare' },
      { trait_type: 'Ocean Conservation', value: 'Critical' },
    ]
  },

  // 
];

export type AmmyiTierName = "Premium" | "Rare" | "Elite";
export type { NFT, AmmyiTier, TiercatData } from '../types';



export const tierCategoriesData: TiercatData[] = [
  {
    id: 'bronze-1',
    tokenId: '1',
    blockchain: 'Ethereum',
    name: 'Cyberpunk Warrior',
    description: 'A futuristic warrior from the neon-lit streets of 2187',
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
    tier: 'Bronze',
    category: 'Cyberpunk Warrior',
    price: 10,
    currency: 'AMMYI',
    likes: 42,
    createdAt: '2023-05-15T10:00:00Z',
    collection: 'AMMYI Preminted',
    creator: {
      id: 'user1',
      name: 'DigitalArtist',
      username: 'digitalartist',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    attributes: [
      { trait_type: 'Background', value: 'Neon City' },
      { trait_type: 'Weapon', value: 'Plasma Katana' }
    ],
      perks: ['Exclusive Badge', 'Early Access to Bronze Events']

  },
  {
    id: 'bronze-2',
    tokenId: '2',
    blockchain: 'Ethereum',
    name: 'Robot Dog',
    description: 'A loyal robotic companion with advanced AI',
    image: 'https://images.pexels.com/photos/1230673/pexels-photo-1230673.jpeg',
    tier: 'Bronze',
    category: 'Robot Dog',
    price: 15,
    currency: 'AMMYI',
    likes: 30,
    createdAt: '2023-05-16T12:00:00Z',
    collection: 'AMMYI Preminted',
    creator: {
      id: 'user2',
      name: 'RobotMaster',
      username: 'robotmaster',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    attributes: [
      { trait_type: 'Loyalty', value: 'High' },
      { trait_type: 'Model', value: 'RX-78' }
    ],
    perks: ['Exclusive Badge', 'Early Access to Bronze Events']

  },
  {
    id: 'bronze-3',
    tokenId: '3',
    blockchain: 'Ethereum',
    name: 'Alien Creature',
    description: 'A mysterious being from the Andromeda galaxy',
    image: 'https://images.pexels.com/photos/5861905/pexels-photo-5861905.jpeg',
    tier: 'Bronze',
    category: 'Alien Creature',
    price: 20,
    currency: 'AMMYI',
    likes: 50,
    createdAt: '2023-05-17T14:00:00Z',
    collection: 'AMMYI Preminted',
    creator: {
      id: 'user3',
      name: 'GalaxyArtist',
      username: 'galaxyartist',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    attributes: [
      { trait_type: 'Planet', value: 'Zorblax' },
      { trait_type: 'Intelligence', value: 'Super High' }
    ],
    perks: ['Exclusive Badge', 'Early Access to Bronze Events']

  }
];

