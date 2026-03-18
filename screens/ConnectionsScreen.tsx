import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import { SafeAreaScrollView } from '../components/SafeAreaScrollView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConnectionCard from '../components/ConnectionCard';
import SortSheet from '../components/SortSheet';
import { mockConnections } from '../data/mockConnections';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import { useSortPreference } from '../hooks/useSortPreference';

export default function ConnectionsScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const { sortPreference, setSortPreference } = useSortPreference();

  // Helper function to sort connections
  const sortConnections = (connections: typeof mockConnections) => {
    const sorted = [...connections];

    switch (sortPreference) {
      case 'a-z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'recent':
        return sorted.sort((a, b) => new Date(b.connectedDate).getTime() - new Date(a.connectedDate).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.connectedDate).getTime() - new Date(b.connectedDate).getTime());
      default:
        return sorted;
    }
  };

  // Filter and sort connections based on search query and sort preference
  const filteredConnections = useMemo(() => {
    let result = mockConnections;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (connection) =>
          connection.name.toLowerCase().includes(query) ||
          connection.username.toLowerCase().includes(query)
      );
    }

    return sortConnections(result);
  }, [searchQuery, sortPreference]);

  return (
    <>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <SafeAreaScrollView scrollable style={{ backgroundColor: '#E8E9EB' }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            {/* Search Bar + Sort Button */}
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
                <MaterialCommunityIcons name="magnify" size={18} color={'#6B7280'} />
                <TextInput
                  placeholder="Search by name..."
                  placeholderTextColor={'#6B7280'}
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

              {/* Sort Button */}
              <TouchableOpacity
                onPress={() => setSortSheetVisible(true)}
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
                <MaterialCommunityIcons name="sort" size={20} color={'#0D1B1E'} />
              </TouchableOpacity>
            </View>

            {/* Connections List */}
            {filteredConnections.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 32 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#6B7280',
                  }}
                >
                  No connections found
                </Text>
              </View>
            ) : (
              filteredConnections.map((connection) => (
                <TouchableOpacity
                  key={connection.id}
                  onPress={() => navigation.navigate('ConnectionDetail', { connectionId: connection.id })}
                  activeOpacity={0.7}
                >
                  <ConnectionCard
                    id={connection.id}
                    name={connection.name}
                    username={connection.username}
                    note={connection.note}
                    connectedDate={connection.connectedDate}
                    sharedPlatforms={connection.sharedPlatforms}
                    onPress={() => navigation.navigate('ConnectionDetail', { connectionId: connection.id })}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        </SafeAreaScrollView>
      </Pressable>

      {/* Sort Sheet */}
      <SortSheet
        isVisible={sortSheetVisible}
        currentSort={sortPreference}
        onSortChange={setSortPreference}
        onClose={() => setSortSheetVisible(false)}
      />
    </>
  );
}
