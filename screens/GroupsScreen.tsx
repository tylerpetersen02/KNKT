import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaScrollView } from '../components/SafeAreaScrollView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupCard from '../components/GroupCard';
import { mockGroups } from '../data/mockGroups';
import { getTimeAgo } from '../utils/timeUtils';

export default function GroupsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Filter groups based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockGroups;
    }

    const query = searchQuery.toLowerCase().trim();
    return mockGroups.filter((group) =>
      group.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const selectedGroup = selectedGroupId
    ? mockGroups.find((g) => g.id === selectedGroupId)
    : null;

  // Update header when detail view is shown/hidden
  useEffect(() => {
    if (selectedGroupId) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => setSelectedGroupId(null)}
            style={{ paddingLeft: 16, padding: 8 }}
          >
            <MaterialCommunityIcons name="chevron-left" size={24} color="#0D1B1E" />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: () => null,
      });
    }
  }, [selectedGroupId, navigation]);

  // Show detail view if a group is selected
  if (selectedGroup) {
    return (
      <SafeAreaScrollView scrollable>
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          {/* Group Details */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: '#E8E9EB',
              alignItems: 'center',
            }}
          >
            {/* Emoji Avatar */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#F9FAFB',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 48, lineHeight: 48 }}>{selectedGroup.emoji}</Text>
            </View>

            {/* Group Name */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#0D1B1E',
                marginBottom: 4,
              }}
            >
              {selectedGroup.name}
            </Text>

            {/* Member Count */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#6B7280',
                marginBottom: 12,
              }}
            >
              {selectedGroup.memberCount} members
            </Text>

            {/* Created Date */}
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#6B7280',
              }}
            >
              Created {getTimeAgo(selectedGroup.createdDate)}
            </Text>
          </View>
        </View>
      </SafeAreaScrollView>
    );
  }

  // Show list view
  return (
    <>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <SafeAreaScrollView scrollable style={{ backgroundColor: '#E8E9EB' }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            {/* Search Bar + Add Button */}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 5, marginBottom: 16 }}>
              {/* Search Bar */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E8E9EB',
                  paddingHorizontal: 12,
                  height: 40,
                }}
              >
                <MaterialCommunityIcons name="magnify" size={18} color="#6B7280" />
                <TextInput
                  placeholder="Search by name..."
                  placeholderTextColor="#6B7280"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#0D1B1E',
                    padding: 0,
                  }}
                />
              </View>

              {/* Add Button */}
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: '#E8E9EB',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name="plus" size={20} color="#0D1B1E" />
              </TouchableOpacity>
            </View>

            {/* Groups List */}
            {filteredGroups.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 32 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#6B7280',
                  }}
                >
                  No groups found
                </Text>
              </View>
            ) : (
              filteredGroups.map((group) => (
                <TouchableOpacity
                  key={group.id}
                  onPress={() => setSelectedGroupId(group.id)}
                  activeOpacity={0.7}
                >
                  <GroupCard
                    id={group.id}
                    name={group.name}
                    memberCount={group.memberCount}
                    createdDate={group.createdDate}
                    emoji={group.emoji}
                    onPress={() => setSelectedGroupId(group.id)}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        </SafeAreaScrollView>
      </Pressable>
    </>
  );
}
