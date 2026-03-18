import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { RequestItem as RequestItemType } from '../data/mockRequests';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import Button from './Button';

interface RequestItemProps {
  request: RequestItemType;
  isReceived: boolean;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onCancel?: (id: string) => void;
  onView?: (id: string) => void;
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getRequestMessage(request: RequestItemType, isReceived: boolean): string {
  if (request.type === 'exchange') {
    return isReceived
      ? 'Sent you a request for contact exchange'
      : 'You requested contact exchange';
  }

  if (request.type === 'platform_share') {
    const platforms = request.metadata?.platforms || [];

    if (platforms.length === 0) {
      return isReceived ? 'Requested your information' : 'You requested information';
    }

    if (platforms.length <= 3) {
      const labels = platforms
        .map((p) => PLATFORM_ICONS[p as any]?.label || p)
        .join(', ');
      return isReceived ? `Requested your ${labels}` : `You requested ${labels}`;
    }

    return `You requested ${platforms.length} items`;
  }

  return isReceived ? 'Sent you a request' : 'Pending response';
}

export default function RequestItem({
  request,
  isReceived,
  onAccept,
  onDecline,
  onCancel,
  onView,
}: RequestItemProps) {
  // For sent requests, show the recipient; for received requests, show the sender
  const displayUser = isReceived ? request.from_user : request.to_user || request.from_user;

  const initials = displayUser.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const timeAgo = getTimeAgo(request.created_at);
  const message = getRequestMessage(request, isReceived);

  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E9EB',
        borderRadius: 8,
      }}
    >
      {/* SECTION 1: Avatar + Info Text */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Avatar */}
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#F12838',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
            flexShrink: 0,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
            {initials}
          </Text>
        </View>

        {/* Pressable Info Section */}
        <Pressable
          onPress={() => onView?.(request.id)}
          style={{ flex: 1 }}
        >
          {/* Line 1: Name @Username */}
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 4 }}>
            {displayUser.name} @{displayUser.username}
          </Text>

          {/* Line 2: Request Message */}
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: '#393E41',
              marginBottom: 4,
            }}
          >
            {message}
          </Text>

          {/* Line 3: Time Ago */}
          <Text style={{ fontSize: 11, fontWeight: '400', color: '#9CA3AF' }}>
            {timeAgo}
          </Text>
        </Pressable>
      </View>

      {/* SECTION 2: Buttons */}
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          gap: 8,
        }}
      >
        {isReceived ? (
          <>
            <Button
              label="Accept"
              variant="primary"
              onPress={() => onAccept?.(request.id)}
              style={{ flex: 1 }}
            />
            <Button
              label="Decline"
              variant="secondary"
              onPress={() => onDecline?.(request.id)}
              style={{ flex: 1 }}
            />
          </>
        ) : (
          <Button
            label="Cancel"
            variant="secondary"
            onPress={() => onCancel?.(request.id)}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </View>
  );
}
