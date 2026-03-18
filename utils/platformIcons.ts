import type { PlatformType } from '../data/mockConnections';

export const PLATFORM_ICONS: Record<
  PlatformType,
  {
    icon: string;
    label: string;
    color: string;
    deepLink?: (handle: string) => string;
  }
> = {
  // SOCIAL MEDIA (8)
  instagram: {
    icon: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
  },
  facebook: {
    icon: 'facebook',
    label: 'Facebook',
    color: '#1877F2',
  },
  twitter: {
    icon: 'twitter',
    label: 'Twitter/X',
    color: '#000000',
  },
  tiktok: {
    icon: 'tiktok',
    label: 'TikTok',
    color: '#000000',
  },
  snapchat: {
    icon: 'snapchat',
    label: 'Snapchat',
    color: '#FFFC00',
  },
  bluesky: {
    icon: 'cloud',
    label: 'Bluesky',
    color: '#1185FE',
  },
  mastodon: {
    icon: 'mastodon',
    label: 'Mastodon',
    color: '#6364FF',
  },
  threads: {
    icon: 'thread',
    label: 'Threads',
    color: '#000000',
  },

  // MESSAGING & COMMUNICATION (8)
  whatsapp: {
    icon: 'whatsapp',
    label: 'WhatsApp',
    color: '#25D366',
  },
  telegram: {
    icon: 'telegram',
    label: 'Telegram',
    color: '#0088CC',
  },
  discord: {
    icon: 'discord',
    label: 'Discord',
    color: '#5865F2',
  },
  slack: {
    icon: 'slack',
    label: 'Slack',
    color: '#E01E5A',
  },
  signal: {
    icon: 'shield-alert',
    label: 'Signal',
    color: '#3A76F0',
  },
  viber: {
    icon: 'phone-message',
    label: 'Viber',
    color: '#665CAC',
  },
  wechat: {
    icon: 'wechat',
    label: 'WeChat',
    color: '#09B83E',
  },
  line: {
    icon: 'line',
    label: 'LINE',
    color: '#00B900',
  },

  // PROFESSIONAL & DEVELOPMENT (8)
  linkedin: {
    icon: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
  },
  github: {
    icon: 'github',
    label: 'GitHub',
    color: '#181717',
  },
  gitlab: {
    icon: 'gitlab',
    label: 'GitLab',
    color: '#FC6D26',
  },
  bitbucket: {
    icon: 'bitbucket',
    label: 'Bitbucket',
    color: '#0052CC',
  },
  stackoverflow: {
    icon: 'stack-overflow',
    label: 'Stack Overflow',
    color: '#F47F17',
  },
  devto: {
    icon: 'dev-to',
    label: 'Dev.to',
    color: '#0A0A0A',
  },
  hashnode: {
    icon: 'hash',
    label: 'HashNode',
    color: '#2962FF',
  },
  indiehackers: {
    icon: 'account-multiple',
    label: 'Indie Hackers',
    color: '#000000',
  },

  // CREATIVE & DESIGN (7)
  behance: {
    icon: 'behance',
    label: 'Behance',
    color: '#1769FF',
  },
  dribbble: {
    icon: 'dribbble',
    label: 'Dribbble',
    color: '#EA4C89',
  },
  pinterest: {
    icon: 'pinterest',
    label: 'Pinterest',
    color: '#E60023',
  },
  flickr: {
    icon: 'flickr',
    label: 'Flickr',
    color: '#0063DC',
  },
  '500px': {
    icon: 'image-multiple',
    label: '500px',
    color: '#000000',
  },
  deviantart: {
    icon: 'palette',
    label: 'DeviantArt',
    color: '#05CC47',
  },
  artstation: {
    icon: 'palette',
    label: 'ArtStation',
    color: '#13AFF0',
  },

  // VIDEO & STREAMING (6)
  youtube: {
    icon: 'youtube',
    label: 'YouTube',
    color: '#FF0000',
  },
  twitch: {
    icon: 'twitch',
    label: 'Twitch',
    color: '#9146FF',
  },
  vimeo: {
    icon: 'vimeo',
    label: 'Vimeo',
    color: '#1AB7EA',
  },
  soundcloud: {
    icon: 'soundcloud',
    label: 'SoundCloud',
    color: '#FF5500',
  },
  kick: {
    icon: 'video',
    label: 'Kick',
    color: '#53FC18',
  },
  rumble: {
    icon: 'play-circle',
    label: 'Rumble',
    color: '#57B93B',
  },

  // GAMING (10)
  steam: {
    icon: 'steam',
    label: 'Steam',
    color: '#1B2838',
  },
  epicgames: {
    icon: 'gamepad-variant',
    label: 'Epic Games',
    color: '#313131',
  },
  psn: {
    icon: 'playstation',
    label: 'PlayStation Network',
    color: '#003087',
  },
  xbox: {
    icon: 'xbox',
    label: 'Xbox Live',
    color: '#107C10',
  },
  nintendoswitch: {
    icon: 'nintendo-switch',
    label: 'Nintendo Switch',
    color: '#E60012',
  },
  riotgames: {
    icon: 'gamepad-variant',
    label: 'Riot Games',
    color: '#0A1428',
  },
  valorant: {
    icon: 'gamepad-variant',
    label: 'Valorant',
    color: '#FA4454',
  },
  fortnite: {
    icon: 'gamepad-variant',
    label: 'Fortnite',
    color: '#3B0080',
  },
  roblox: {
    icon: 'gamepad-variant',
    label: 'Roblox',
    color: '#E4405F',
  },
  minecraft: {
    icon: 'cube',
    label: 'Minecraft',
    color: '#00AE00',
  },

  // FINANCE & PAYMENT (6)
  venmo: {
    icon: 'cash',
    label: 'Venmo',
    color: '#008CFF',
  },
  paypal: {
    icon: 'paypal',
    label: 'PayPal',
    color: '#003087',
  },
  squarecash: {
    icon: 'cash-usd',
    label: 'Square Cash',
    color: '#00A4EF',
  },
  applepay: {
    icon: 'apple',
    label: 'Apple Pay',
    color: '#000000',
  },
  googlepay: {
    icon: 'google-pay',
    label: 'Google Pay',
    color: '#4285F4',
  },
  cryptowallet: {
    icon: 'bitcoin',
    label: 'Crypto Wallet',
    color: '#F7931A',
  },

  // MUSIC (3)
  spotify: {
    icon: 'spotify',
    label: 'Spotify',
    color: '#1DB954',
  },
  applemusic: {
    icon: 'apple-music',
    label: 'Apple Music',
    color: '#FA243C',
  },
  bandcamp: {
    icon: 'bandcamp',
    label: 'Bandcamp',
    color: '#1EA0C3',
  },

  // SPORTS & FITNESS (4)
  strava: {
    icon: 'run',
    label: 'Strava',
    color: '#FC5200',
  },
  grint: {
    icon: 'golf',
    label: 'GRINT',
    color: '#00A344',
  },
  '18birdies': {
    icon: 'golf',
    label: '18Birdies',
    color: '#1B5E20',
  },
  golfnow: {
    icon: 'golf',
    label: 'GolfNow',
    color: '#0056B3',
  },

  // COMMUNITY & DISCUSSION (6)
  reddit: {
    icon: 'reddit',
    label: 'Reddit',
    color: '#FF4500',
  },
  quora: {
    icon: 'help-circle',
    label: 'Quora',
    color: '#B92B27',
  },
  producthunt: {
    icon: 'trophy',
    label: 'Product Hunt',
    color: '#DA552F',
  },
  hackernews: {
    icon: 'code-braces',
    label: 'Hacker News',
    color: '#FF6600',
  },
  nextdoor: {
    icon: 'home-heart',
    label: 'Nextdoor',
    color: '#00B4A6',
  },
  medium: {
    icon: 'book-open',
    label: 'Medium',
    color: '#000000',
  },

  // CONTENT & MONETIZATION (4)
  patreon: {
    icon: 'heart',
    label: 'Patreon',
    color: '#FF424D',
  },
  kofi: {
    icon: 'coffee',
    label: 'Ko-fi',
    color: '#13C0FC',
  },
  gumroad: {
    icon: 'shopping',
    label: 'Gumroad',
    color: '#FF6B6B',
  },
  substack: {
    icon: 'email-newsletter',
    label: 'Substack',
    color: '#FF6B6B',
  },

  // SHOPPING & MARKETPLACE (6)
  amazon: {
    icon: 'amazon',
    label: 'Amazon',
    color: '#FF9900',
  },
  ebay: {
    icon: 'shopping-outline',
    label: 'eBay',
    color: '#E53238',
  },
  depop: {
    icon: 'shopping-bag',
    label: 'Depop',
    color: '#000000',
  },
  poshmark: {
    icon: 'clothes-hanger',
    label: 'Poshmark',
    color: '#E1205B',
  },
  mercari: {
    icon: 'hand-heart',
    label: 'Mercari',
    color: '#3CCBDA',
  },
  etsy: {
    icon: 'store',
    label: 'Etsy',
    color: '#F1641E',
  },

  // DATING & SOCIAL (4)
  tinder: {
    icon: 'heart',
    label: 'Tinder',
    color: '#FD5068',
  },
  bumble: {
    icon: 'bee',
    label: 'Bumble',
    color: '#FCD034',
  },
  hinge: {
    icon: 'heart-outline',
    label: 'Hinge',
    color: '#F63A3A',
  },
  match: {
    icon: 'account-heart',
    label: 'Match',
    color: '#E1165B',
  },

  // TRAVEL & MEETUP (2)
  meetup: {
    icon: 'account-group',
    label: 'Meetup',
    color: '#F64060',
  },
  airbnb: {
    icon: 'home-city',
    label: 'Airbnb',
    color: '#FF5A5F',
  },

  // BASIC CONTACT (4)
  phone: {
    icon: 'phone',
    label: 'Phone',
    color: '#4CAF50',
    deepLink: (handle) => `tel:${handle}`,
  },
  email: {
    icon: 'email',
    label: 'Email',
    color: '#2196F3',
    deepLink: (handle) => `mailto:${handle}`,
  },
  website: {
    icon: 'web',
    label: 'Website',
    color: '#FF9800',
  },
  businesscard: {
    icon: 'card',
    label: 'Business Card',
    color: '#9C27B0',
  },
};

export const PLATFORM_VISIBILITY_TERMS: Record<string, string> = {
  // Social Media
  instagram: 'username',
  facebook: 'username',
  twitter: 'handle',
  tiktok: 'username',
  snapchat: 'username',
  bluesky: 'handle',
  mastodon: 'handle',
  threads: 'username',

  // Messaging & Communication
  whatsapp: 'phone number',
  telegram: 'username',
  discord: 'username',
  slack: 'workspace',
  signal: 'phone number',
  viber: 'phone number',
  wechat: 'ID',
  line: 'ID',

  // Professional & Development
  linkedin: 'profile name',
  github: 'username',
  gitlab: 'username',
  bitbucket: 'username',
  stackoverflow: 'profile name',
  devto: 'username',
  hashnode: 'username',
  indiehackers: 'username',

  // Creative & Design
  behance: 'profile name',
  dribbble: 'profile name',
  pinterest: 'username',
  flickr: 'account name',
  '500px': 'profile name',
  deviantart: 'profile name',
  artstation: 'profile name',

  // Video & Streaming
  youtube: 'channel',
  twitch: 'username',
  vimeo: 'profile name',
  soundcloud: 'profile name',
  kick: 'username',
  rumble: 'channel',

  // Gaming
  steam: 'profile name',
  epicgames: 'username',
  psn: 'username',
  xbox: 'gamertag',
  nintendoswitch: 'friend code',
  riotgames: 'summoner name',
  valorant: 'Riot ID',
  fortnite: 'username',
  roblox: 'username',
  minecraft: 'username',

  // Finance & Payment
  venmo: 'account name',
  paypal: 'email address',
  squarecash: 'cash tag',
  applepay: 'email address',
  googlepay: 'email address',
  cryptowallet: 'wallet address',

  // Music
  spotify: 'profile name',
  applemusic: 'artist name',
  bandcamp: 'profile name',

  // Sports & Fitness
  strava: 'profile name',
  grint: 'username',
  '18birdies': 'username',
  golfnow: 'account name',

  // Community & Discussion
  reddit: 'username',
  quora: 'profile name',
  producthunt: 'profile name',
  hackernews: 'username',
  nextdoor: 'profile name',
  medium: 'username',

  // Content & Monetization
  patreon: 'profile name',
  kofi: 'profile name',
  gumroad: 'profile name',
  substack: 'publication',

  // Shopping & Marketplace
  amazon: 'profile name',
  ebay: 'username',
  depop: 'shop',
  poshmark: 'closet',
  mercari: 'username',
  etsy: 'shop',

  // Dating & Social
  tinder: 'profile name',
  bumble: 'profile name',
  hinge: 'profile name',
  match: 'profile name',

  // Travel & Meetup
  meetup: 'profile name',
  airbnb: 'profile name',

  // Basic Contact
  phone: 'phone number',
  email: 'email address',
  website: 'website',
  businesscard: 'business card info',
};
