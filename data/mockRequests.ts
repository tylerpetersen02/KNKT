export interface RequestItem {
  id: string;
  type: 'exchange' | 'platform_share';
  from_user: {
    id: string;
    name: string;
    username: string;
    avatar_url?: string;
  };
  to_user_id: string;
  to_user?: {
    id: string;
    name: string;
    username: string;
    avatar_url?: string;
  };
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  senderMessage?: string;
  metadata?: {
    platforms?: string[];
    platform?: string;
    note?: string;
  };
}

export const mockReceivedRequests: RequestItem[] = [
  {
    id: 'req-1',
    type: 'platform_share',
    from_user: {
      id: 'user-5',
      name: 'Morgan Lee',
      username: 'morganlee',
      avatar_url: '👩',
    },
    to_user_id: 'current-user',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    senderMessage: "Hey! Met you at the networking conference last week!",
    metadata: {
      platforms: ['instagram', 'tiktok', 'snapchat'],
    },
  },
  {
    id: 'req-2',
    type: 'exchange',
    from_user: {
      id: 'user-6',
      name: 'Robert Chen',
      username: 'robertchen',
      avatar_url: '👨',
    },
    to_user_id: 'current-user',
    status: 'pending',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    senderMessage: "Hey! Met you at the bar, let's stay connected",
    metadata: {
      platforms: ['phone', 'instagram', 'whatsapp'],
      note: 'Met at the bar',
    },
  },
  {
    id: 'req-3',
    type: 'platform_share',
    from_user: {
      id: 'user-1',
      name: 'Sarah Chen',
      username: 'sarahchen',
      avatar_url: '👩',
    },
    to_user_id: 'current-user',
    status: 'pending',
    created_at: new Date(Date.now() - 1800000).toISOString(),
    senderMessage: "Would love to connect and collaborate on projects!",
    metadata: {
      platforms: ['phone', 'email', 'discord', 'linkedin', 'twitter', 'github'],
    },
  },
];

export const mockSentRequests: RequestItem[] = [
  {
    id: 'req-4',
    type: 'platform_share',
    from_user: {
      id: 'current-user',
      name: 'Tyler',
      username: 'tyler',
      avatar_url: '👨',
    },
    to_user_id: 'user-7',
    to_user: {
      id: 'user-7',
      name: 'Alex Park',
      username: 'alexpark',
      avatar_url: '👨',
    },
    status: 'pending',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    senderMessage: "Hey! Let me know if you want to stay connected",
    metadata: {
      platforms: ['discord', 'twitch'],
      // Available platforms that user has but we're not requesting yet
      availablePlatforms: ['instagram', 'email', 'linkedin', 'github', 'youtube'],
    },
  },
  {
    id: 'req-5',
    type: 'platform_share',
    from_user: {
      id: 'current-user',
      name: 'Tyler',
      username: 'tyler',
      avatar_url: '👨',
    },
    to_user_id: 'user-2',
    to_user: {
      id: 'user-2',
      name: 'Jordan Smith',
      username: 'jordansmith',
      avatar_url: '👩',
    },
    status: 'pending',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    senderMessage: "Great meeting you! Let's connect on these platforms",
    metadata: {
      platforms: ['instagram', 'snapchat', 'tiktok', 'youtube', 'twitter'],
      // Available platforms that user has but we're not requesting yet
      availablePlatforms: ['email', 'phone', 'linkedin', 'github', 'discord', 'slack'],
    },
  },
];
