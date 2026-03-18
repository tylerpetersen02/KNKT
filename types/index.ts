export interface User {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPlatform {
  id: string;
  user_id: string;
  platform: 'phone' | 'email' | 'instagram' | 'snapchat' | 'linkedin' | 'venmo' | 'tiktok' | 'twitter' | 'bereal' | 'website' | 'grint' | '18birdies';
  handle: string;
  url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExchangeAttempt {
  id: string;
  initiator_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  responded_at: string | null;
}

export interface ConnectionRequest {
  id: string;
  from_user_id: string;
  to_user_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  responded_at: string | null;
}

export interface Connection {
  id: string;
  user_a_id: string;
  user_b_id: string;
  user_a_note: string | null;
  user_b_note: string | null;
  connection_type: 'nfc' | 'search';
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  from_user_id: string;
  type: 'exchange_attempt' | 'connection_request' | 'exchange_accepted' | 'request_accepted';
  related_id: string | null;
  read: boolean;
  created_at: string;
  read_at: string | null;
}

export type Platform = UserPlatform['platform'];
