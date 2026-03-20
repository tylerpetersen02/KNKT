import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  Image,
} from 'react-native';
import { SafeAreaScrollView } from '../components/SafeAreaScrollView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConnectionCard from '../components/ConnectionCard';
import SortSheet from '../components/SortSheet';
import { mockConnections } from '../data/mockConnections';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import { useSortPreference } from '../hooks/useSortPreference';
import { openPlatformProfile } from '../utils/platformLinks';
import { PlatformIcon } from '../components/PlatformIcon';

export default function ConnectionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
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

  const selectedConnection = selectedConnectionId
    ? mockConnections.find((c) => c.id === selectedConnectionId)
    : null;

  // Show detail view if a connection is selected
  if (selectedConnection) {
    return (
      <SafeAreaScrollView scrollable>
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => setSelectedConnectionId(null)}
            style={{ marginBottom: 16 }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#F12838' }}>
              ← Back to Connections
            </Text>
          </TouchableOpacity>

          {/* Connection Details */}
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
            {/* Avatar */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#F12838',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
                overflow: 'hidden',
              }}
            >
              {selectedConnection.profilePicture ? (
                <Image
                  source={{ uri: selectedConnection.profilePicture }}
                  style={{ width: 80, height: 80 }}
                />
              ) : (
                <Text style={{ fontSize: 32, fontWeight: '600', color: '#FFFFFF' }}>
                  {selectedConnection.avatarInitials}
                </Text>
              )}
            </View>

            {/* Name */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#0D1B1E',
                marginBottom: 4,
              }}
            >
              {selectedConnection.name}
            </Text>

            {/* Username */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#6B7280',
                marginBottom: 12,
              }}
            >
              @{selectedConnection.username}
            </Text>

            {/* Bio */}
            {selectedConnection.bio && (
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#393E41',
                  textAlign: 'center',
                  marginBottom: 12,
                }}
              >
                {selectedConnection.bio}
              </Text>
            )}

            {/* Note */}
            {selectedConnection.note && (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#6B7280',
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                "{selectedConnection.note}"
              </Text>
            )}
          </View>

          {/* Shared Platforms */}
          {selectedConnection.sharedPlatforms.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#0D1B1E',
                  marginBottom: 12,
                }}
              >
                Shared Platforms
              </Text>
              {selectedConnection.sharedPlatforms.map((platform, idx) => {
                const platformInfo = PLATFORM_ICONS[platform.type];
                const isPhone = platform.type === 'phone';
                const isEmail = platform.type === 'email';
                const buttonLabel = isPhone ? 'Call' : isEmail ? 'Email' : 'Open';

                return (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: '#E8E9EB',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {/* Platform Icon */}
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: platformInfo.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                      }}
                    >
                      <PlatformIcon platform={platform.type} size={20} />
                    </View>

                    {/* Platform Info */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '600',
                          color: '#0D1B1E',
                          marginBottom: 2,
                        }}
                      >
                        {platformInfo.label}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: '#6B7280',
                        }}
                      >
                        {platform.handle}
                      </Text>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                      onPress={() => openPlatformProfile(platform.type, platform.handle, selectedConnection.name)}
                      style={{
                        backgroundColor: '#0D1B1E',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 6,
                        minWidth: 70,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#FFFFFF',
                        }}
                      >
                        {buttonLabel}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}

          {/* Available Platforms */}
          {selectedConnection.availablePlatforms.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#0D1B1E',
                  marginBottom: 12,
                }}
              >
                Available Platforms
              </Text>
              {selectedConnection.availablePlatforms.map((platformId, idx) => {
                const platformInfo = PLATFORM_ICONS[platformId as any];
                if (!platformInfo) return null;
                return (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: '#E8E9EB',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {/* Platform Icon */}
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: platformInfo.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                      }}
                    >
                      <PlatformIcon platform={platformId as any} size={20} />
                    </View>

                    {/* Platform Info */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '600',
                          color: '#0D1B1E',
                          marginBottom: 2,
                        }}
                      >
                        {platformInfo.label}
                      </Text>
                    </View>

                    {/* Request Button */}
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#0D1B1E',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 6,
                        minWidth: 70,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#FFFFFF',
                        }}
                      >
                        Request
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
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
                  onPress={() => setSelectedConnectionId(connection.id)}
                  activeOpacity={0.7}
                >
                  <ConnectionCard
                    id={connection.id}
                    name={connection.name}
                    username={connection.username}
                    note={connection.note}
                    connectedDate={connection.connectedDate}
                    sharedPlatforms={connection.sharedPlatforms}
                    profilePicture={connection.profilePicture}
                    onPress={() => setSelectedConnectionId(connection.id)}
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
