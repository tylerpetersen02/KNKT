import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { SharedPlatform } from '../data/mockConnections';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import { PlatformIcon } from './PlatformIcon';
import { getTimeAgo } from '../utils/timeUtils';

interface ConnectionCardProps {
  id: string;
  name: string;
  username: string;
  note?: string;
  connectedDate: string;
  sharedPlatforms: SharedPlatform[];
  profilePicture?: string;
  onPress: (id: string) => void;
}

export default function ConnectionCard({
  id,
  name,
  username,
  note,
  connectedDate,
  sharedPlatforms,
  profilePicture,
  onPress,
}: ConnectionCardProps) {
  // Get initials for avatar
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E8E9EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
      }}
    >
      {/* Avatar Circle - centered vertically, left aligned */}
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#0D1B1E',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFFFFF' }}>
            {initials}
          </Text>
        )}
      </View>

      {/* Content Stack - 3 rows: name/username, note/date, icons */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPress(id)}
        style={{
          flex: 1,
        }}
      >
        {/* Row 1: Name & Username */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E' }}>
            {name}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '400', color: '#6B7280', marginLeft: 6 }}>
            @{username}
          </Text>
        </View>

        {/* Row 2: Connected Date */}
        <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 8 }}>
          Connected {getTimeAgo(connectedDate)}
        </Text>

        {/* Row 3: Icons - max 5 with +X indicator */}
        {sharedPlatforms.length > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {sharedPlatforms.slice(0, 5).map((platform, idx) => {
              const platformInfo = PLATFORM_ICONS[platform.type];
              return (
                <View
                  key={idx}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: platformInfo.color,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PlatformIcon platform={platform.type} size={16} />
                </View>
              );
            })}

            {sharedPlatforms.length > 5 && (
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#9CA3AF', marginLeft: 4 }}>
                +{sharedPlatforms.length - 5}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>

      {/* Chevron */}
      <MaterialCommunityIcons name="chevron-right" size={20} color="#6B7280" style={{ marginLeft: 8 }} />
    </View>
  );
}
