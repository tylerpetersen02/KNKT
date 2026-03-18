export type PlatformType =
  // Social Media
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'tiktok'
  | 'snapchat'
  | 'bluesky'
  | 'mastodon'
  | 'threads'
  // Messaging & Communication
  | 'whatsapp'
  | 'telegram'
  | 'discord'
  | 'slack'
  | 'signal'
  | 'viber'
  | 'wechat'
  | 'line'
  // Professional & Development
  | 'linkedin'
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'stackoverflow'
  | 'devto'
  | 'hashnode'
  | 'indiehackers'
  // Creative & Design
  | 'behance'
  | 'dribbble'
  | 'pinterest'
  | 'flickr'
  | '500px'
  | 'deviantart'
  | 'artstation'
  // Video & Streaming
  | 'youtube'
  | 'twitch'
  | 'vimeo'
  | 'soundcloud'
  | 'kick'
  | 'rumble'
  // Gaming
  | 'steam'
  | 'epicgames'
  | 'psn'
  | 'xbox'
  | 'nintendoswitch'
  | 'riotgames'
  | 'valorant'
  | 'fortnite'
  | 'roblox'
  | 'minecraft'
  // Finance & Payment
  | 'venmo'
  | 'paypal'
  | 'squarecash'
  | 'applepay'
  | 'googlepay'
  | 'cryptowallet'
  // Music
  | 'spotify'
  | 'applemusic'
  | 'bandcamp'
  // Sports & Fitness
  | 'strava'
  | 'grint'
  | '18birdies'
  | 'golfnow'
  // Community & Discussion
  | 'reddit'
  | 'quora'
  | 'producthunt'
  | 'hackernews'
  | 'nextdoor'
  | 'medium'
  // Content & Monetization
  | 'patreon'
  | 'kofi'
  | 'gumroad'
  | 'substack'
  // Shopping & Marketplace
  | 'amazon'
  | 'ebay'
  | 'depop'
  | 'poshmark'
  | 'mercari'
  | 'etsy'
  // Dating & Social
  | 'tinder'
  | 'bumble'
  | 'hinge'
  | 'match'
  // Travel & Meetup
  | 'meetup'
  | 'airbnb'
  // Basic Contact
  | 'phone'
  | 'email'
  | 'website'
  | 'businesscard';

export interface SharedPlatform {
  type: PlatformType;
  handle: string;
}

export interface Connection {
  id: string;
  name: string;
  username: string;
  avatarInitials: string;
  bio?: string;
  note?: string;
  connectedDate: string;
  sharedPlatforms: SharedPlatform[];
  availablePlatforms: string[];
}

export const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatarInitials: 'SC',
    bio: 'Designer & coffee enthusiast ☕',
    note: 'Met at Expo Conf 2024',
    connectedDate: '2024-10-15',
    sharedPlatforms: [
      { type: 'instagram', handle: '@sarahchen' },
      { type: 'email', handle: 'sarah@example.com' },
      { type: 'discord', handle: 'sarahchen#1234' },
    ],
    availablePlatforms: ['twitter', 'linkedin', 'tiktok'],
  },
  {
    id: '2',
    name: 'Jordan Rodriguez',
    username: 'jrodriguez',
    avatarInitials: 'JR',
    bio: 'Full-stack developer',
    note: 'Colleague from previous project',
    connectedDate: '2024-09-22',
    sharedPlatforms: [
      { type: 'email', handle: 'jordan@example.com' },
      { type: 'linkedin', handle: 'linkedin.com/in/jrodriguez' },
      { type: 'github', handle: 'jrodriguez' },
      { type: 'twitter', handle: '@jrodriguez_dev' },
    ],
    availablePlatforms: ['instagram', 'snapchat', 'discord'],
  },
  {
    id: '3',
    name: 'Alex Kim',
    username: 'alexkim',
    avatarInitials: 'AK',
    bio: 'Product Manager at TechCorp',
    note: 'Connected at networking event',
    connectedDate: '2024-08-10',
    sharedPlatforms: [
      { type: 'phone', handle: '+1 (555) 123-4567' },
      { type: 'email', handle: 'alex@techcorp.com' },
      { type: 'linkedin', handle: 'linkedin.com/in/alexkim' },
      { type: 'slack', handle: 'alex.kim@techcorp' },
    ],
    availablePlatforms: ['instagram', 'twitter', 'discord', 'website'],
  },
  {
    id: '4',
    name: 'Taylor Moore',
    username: 'taylormoore',
    avatarInitials: 'TM',
    bio: 'Photographer & creative director',
    connectedDate: '2024-07-05',
    sharedPlatforms: [
      { type: 'instagram', handle: '@taylormoore_photo' },
      { type: 'snapchat', handle: 'taylormoore_snap' },
      { type: 'tiktok', handle: '@taylormoore_' },
      { type: 'youtube', handle: 'Taylor Moore' },
    ],
    availablePlatforms: ['email', 'twitter', 'linkedin'],
  },
  {
    id: '5',
    name: 'Casey Johnson',
    username: 'caseyjohnson',
    avatarInitials: 'CJ',
    bio: 'Startup founder & gamer',
    note: 'From Y Combinator cohort',
    connectedDate: '2024-06-18',
    sharedPlatforms: [
      { type: 'email', handle: 'casey@startup.com' },
      { type: 'twitter', handle: '@casey_johnson' },
      { type: 'linkedin', handle: 'linkedin.com/in/caseyjohnson' },
      { type: 'discord', handle: 'CaseyJ#9999' },
      { type: 'twitch', handle: 'caseyjdev' },
      { type: 'github', handle: 'caseyjdev' },
      { type: 'youtube', handle: 'Casey Johnson' },
      { type: 'instagram', handle: '@caseyjdev' },
      { type: 'facebook', handle: 'casey.johnson.dev' },
      { type: 'tiktok', handle: '@caseyjdev' },
    ],
    availablePlatforms: ['phone', 'steam', 'xbox'],
  },
  {
    id: '6',
    name: 'Michael Lubin',
    username: 'mlubin',
    avatarInitials: 'ML',
    bio: 'Finance enthusiast & social butterfly',
    connectedDate: '2024-11-20',
    sharedPlatforms: [
      { type: 'venmo', handle: 'Lub1n' },
      { type: 'instagram', handle: 'Lub1n' },
      { type: 'snapchat', handle: 'Lub1n' },
      { type: 'discord', handle: 'Lub1n' },
      { type: 'facebook', handle: 'Lub1n' },
      { type: 'twitter', handle: 'Lub1n' },
      { type: 'tiktok', handle: 'Lub1n' },
      { type: 'whatsapp', handle: '+1234567890' },
      { type: 'telegram', handle: 'Lub1n' },
      { type: 'linkedin', handle: 'Lub1n' },
      { type: 'github', handle: 'Lub1n' },
      { type: 'youtube', handle: 'Lub1n' },
      { type: 'twitch', handle: 'Lub1n' },
      { type: 'spotify', handle: 'Lub1n' },
      { type: 'reddit', handle: 'Lub1n' },
      { type: 'phone', handle: '555-123-4567' },
      { type: 'email', handle: 'lub1n@example.com' },
      { type: 'website', handle: 'lub1n.com' },
    ],
    availablePlatforms: ['email', 'phone', 'twitter'],
  },
];
