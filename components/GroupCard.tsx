import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTimeAgo } from '../utils/timeUtils';

interface GroupCardProps {
  id: string;
  name: string;
  memberCount: number;
  createdDate: string;
  emoji: string;
  onPress: (id: string) => void;
}

export default function GroupCard({
  id,
  name,
  memberCount,
  createdDate,
  emoji,
  onPress,
}: GroupCardProps) {
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
      {/* Emoji Avatar */}
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#F9FAFB',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
          flexShrink: 0,
        }}
      >
        <Text style={{ fontSize: 28, lineHeight: 28 }}>{emoji}</Text>
      </View>

      {/* Content Stack */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPress(id)}
        style={{
          flex: 1,
        }}
      >
        {/* Row 1: Group Name */}
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 6 }}>
          {name}
        </Text>

        {/* Row 2: Member Count */}
        <Text style={{ fontSize: 13, fontWeight: '400', color: '#6B7280', marginBottom: 6 }}>
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </Text>

        {/* Row 3: Created Date */}
        <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280' }}>
          Created {getTimeAgo(createdDate)}
        </Text>
      </TouchableOpacity>

      {/* Chevron */}
      <MaterialCommunityIcons name="chevron-right" size={20} color="#6B7280" style={{ marginLeft: 8 }} />
    </View>
  );
}
