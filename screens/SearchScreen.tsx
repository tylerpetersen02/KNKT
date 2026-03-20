import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable, Keyboard } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from '../components/SafeAreaView';
import { mockConnections } from '../data/mockConnections';
import { mockReceivedRequests } from '../data/mockRequests';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import { PlatformIcon } from '../components/PlatformIcon';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'connections' | 'accounts'>('all');

  // Get all accounts from connections (simplified mock)
  const allAccounts = [
    { id: 'ig1', platform: 'instagram', handle: '@johndoe' },
    { id: 'tw1', platform: 'twitter', handle: '@johndoe' },
    { id: 'gh1', platform: 'github', handle: 'johndoe' },
  ];

  // Filter connections
  const filteredConnections = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return mockConnections.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.username.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter accounts
  const filteredAccounts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allAccounts.filter(
      (a) =>
        a.platform.toLowerCase().includes(query) ||
        a.handle.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter requests
  const filteredRequests = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return mockReceivedRequests.filter(
      (r) =>
        r.from_user.name.toLowerCase().includes(query) ||
        r.from_user.username.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const renderContent = () => {
    if (!searchQuery.trim()) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
          <MaterialCommunityIcons name="magnify" size={48} color="#D1D5DB" style={{ marginBottom: 16 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#6B7280', marginBottom: 8 }}>
            Start searching
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#9CA3AF', textAlign: 'center' }}>
            Search for connections, accounts, or requests
          </Text>
        </View>
      );
    }

    const showConnections = activeTab === 'all' || activeTab === 'connections';
    const showAccounts = activeTab === 'all' || activeTab === 'accounts';
    const showRequests = activeTab === 'all' || activeTab === 'connections';

    const hasResults =
      (showConnections && filteredConnections.length > 0) ||
      (showAccounts && filteredAccounts.length > 0) ||
      (showRequests && filteredRequests.length > 0);

    if (!hasResults) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#6B7280', marginBottom: 8 }}>
            No results found
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#9CA3AF' }}>
            Try a different search term
          </Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
        {showConnections && filteredConnections.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 12, textTransform: 'uppercase' }}>
              Connections ({filteredConnections.length})
            </Text>
            {filteredConnections.map((conn) => (
              <View
                key={conn.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E8E9EB',
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: '#F12838',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                    {conn.name.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 2 }}>
                    {conn.name}
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: '400', color: '#6B7280' }}>
                    @{conn.username}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {showAccounts && filteredAccounts.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 12, textTransform: 'uppercase' }}>
              Accounts ({filteredAccounts.length})
            </Text>
            {filteredAccounts.map((account) => {
              const platformInfo = PLATFORM_ICONS[account.platform as any];
              return (
                <View
                  key={account.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#E8E9EB',
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: platformInfo?.color || '#9CA3AF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 12,
                    }}
                  >
                    <PlatformIcon platform={account.platform as any} size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 2 }}>
                      {platformInfo?.label || account.platform}
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: '400', color: '#6B7280' }}>
                      {account.handle}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {showRequests && filteredRequests.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 12, textTransform: 'uppercase' }}>
              Requests ({filteredRequests.length})
            </Text>
            {filteredRequests.map((req) => (
              <View
                key={req.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E8E9EB',
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: '#F12838',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                    {req.from_user.name.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 2 }}>
                    {req.from_user.name}
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: '400', color: '#6B7280' }}>
                    @{req.from_user.username}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
    <SafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: '#E8E9EB', paddingTop: 5 }}>
      {/* Search Bar */}
      <View style={{ paddingHorizontal: 16, marginTop: 5, marginBottom: 16 }}>
        <View
          style={{
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
            placeholder="Search..."
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
      </View>

      {/* Tab Bar */}
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#E8E9EB',
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveTab('all')}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderBottomWidth: activeTab === 'all' ? 3 : 0,
            borderBottomColor: activeTab === 'all' ? '#F12838' : 'transparent',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: activeTab === 'all' ? '600' : '400', color: '#0D1B1E', textAlign: 'center' }}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('connections')}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderBottomWidth: activeTab === 'connections' ? 3 : 0,
            borderBottomColor: activeTab === 'connections' ? '#F12838' : 'transparent',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: activeTab === 'connections' ? '600' : '400', color: '#0D1B1E', textAlign: 'center' }}>
            Connections
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('accounts')}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderBottomWidth: activeTab === 'accounts' ? 3 : 0,
            borderBottomColor: activeTab === 'accounts' ? '#F12838' : 'transparent',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: activeTab === 'accounts' ? '600' : '400', color: '#0D1B1E', textAlign: 'center' }}>
            Accounts
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>
    </SafeAreaView>
    </Pressable>
  );
}
