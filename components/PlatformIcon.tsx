import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SnapchatIcon } from './SnapchatIcon';
import { DiscordIcon } from './DiscordIcon';
import { VenmoIcon } from './VenmoIcon';
import { TikTokIcon } from './TikTokIcon';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import type { PlatformType } from '../data/mockConnections';

interface PlatformIconProps {
  platform: PlatformType;
  size?: number;
  color?: string;
}

export function PlatformIcon({ platform, size = 20, color = '#FFFFFF' }: PlatformIconProps) {
  switch (platform) {
    case 'snapchat':
      return <SnapchatIcon size={size} />;
    case 'discord':
      return <DiscordIcon size={size} />;
    case 'venmo':
      return <VenmoIcon size={size} />;
    case 'tiktok':
      return <TikTokIcon size={size} />;
    default:
      const platformInfo = PLATFORM_ICONS[platform];
      return <MaterialCommunityIcons name={platformInfo?.icon || 'help-circle'} size={size} color={color} />;
  }
}
