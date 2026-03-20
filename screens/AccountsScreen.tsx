import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Keyboard, Pressable, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from '../components/SafeAreaView';
import { PLATFORM_ICONS, PLATFORM_VISIBILITY_TERMS } from '../utils/platformIcons';
import { PlatformIcon } from '../components/PlatformIcon';
import BottomSheet from '../components/BottomSheet';
import { mockConnections } from '../data/mockConnections';

interface Handle {
  value: string;
  isPublic: boolean;
  manuallyApprovedConnections: string[];
}

interface UserAccount {
  platform: string;
  handles: Handle[];
}

const ALL_PLATFORMS = Object.entries(PLATFORM_ICONS)
  .map(([key, value]) => ({
    id: key,
    ...value,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null);
  const [editingHandleIndex, setEditingHandleIndex] = useState<number | null>(null);
  const [handleInput, setHandleInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'added' | 'other'>('added');
  const [isPublic, setIsPublic] = useState(false);
  const insets = useSafeAreaInsets();

  const handleAddHandle = () => {
    if (!editingPlatform || !handleInput.trim()) return;

    const existingIndex = accounts.findIndex(a => a.platform === editingPlatform);
    const newHandle: Handle = {
      value: handleInput.trim(),
      isPublic,
      manuallyApprovedConnections: [],
    };

    if (existingIndex >= 0) {
      const updatedAccounts = [...accounts];
      updatedAccounts[existingIndex].handles.push(newHandle);
      setAccounts(updatedAccounts);
    } else {
      setAccounts([...accounts, { platform: editingPlatform, handles: [newHandle] }]);
    }

    setHandleInput('');
    setIsPublic(false);
    setEditingPlatform(null);
    setModalVisible(false);
  };

  const handleUpdateHandle = () => {
    if (!editingPlatform || editingHandleIndex === null || !handleInput.trim()) return;

    const updatedAccounts = accounts.map(account => {
      if (account.platform === editingPlatform) {
        const updatedHandles = [...account.handles];
        updatedHandles[editingHandleIndex] = {
          ...updatedHandles[editingHandleIndex],
          value: handleInput.trim(),
          isPublic,
        };
        return { ...account, handles: updatedHandles };
      }
      return account;
    });

    setAccounts(updatedAccounts);
    setHandleInput('');
    setIsPublic(false);
    setEditingPlatform(null);
    setEditingHandleIndex(null);
    setModalVisible(false);
  };

  const handleDeleteHandle = (platform: string, index: number) => {
    const updatedAccounts = accounts.map(account => {
      if (account.platform === platform) {
        return {
          ...account,
          handles: account.handles.filter((_, i) => i !== index),
        };
      }
      return account;
    }).filter(account => account.handles.length > 0);

    setAccounts(updatedAccounts);
  };

  const openAddModal = (platform?: string) => {
    setModalMode('add');
    if (platform) {
      setEditingPlatform(platform);
      const platformAccount = otherAccounts.find(a => a.platform === platform);
      if (platformAccount && platformAccount.handles.length > 0) {
        setHandleInput(platformAccount.handles[0].value);
        setIsPublic(platformAccount.handles[0].isPublic);
      }
    } else {
      setEditingPlatform(null);
      setHandleInput('');
      setIsPublic(false);
    }
    setModalVisible(true);
  };

  const openEditModal = (platform: string, handleIndex: number) => {
    setModalMode('edit');
    setEditingPlatform(platform);
    setEditingHandleIndex(handleIndex);
    const account = accounts.find(a => a.platform === platform);
    if (account) {
      setHandleInput(account.handles[handleIndex].value);
      setIsPublic(account.handles[handleIndex].isPublic);
    }
    setModalVisible(true);
  };

  const myAccounts = accounts;

  const otherAccounts = useMemo(() => {
    const accountPlatformSet = new Set(accounts.map(a => a.platform));
    const others: UserAccount[] = [];

    mockConnections.forEach(connection => {
      connection.sharedPlatforms.forEach(platform => {
        if (!accountPlatformSet.has(platform.type)) {
          const existingIdx = others.findIndex(a => a.platform === platform.type);
          const handle: Handle = {
            value: platform.handle,
            isPublic: true,
            manuallyApprovedConnections: [],
          };

          if (existingIdx >= 0) {
            others[existingIdx].handles.push(handle);
          } else {
            others.push({ platform: platform.type, handles: [handle] });
          }
        }
      });
    });

    return others;
  }, [accounts]);

  const filteredMyAccounts = useMemo(() => {
    return myAccounts.filter(account => {
      const platformLabel = ALL_PLATFORMS.find(p => p.id === account.platform)?.label || account.platform;
      return platformLabel.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [myAccounts, searchQuery]);

  const filteredOtherAccounts = useMemo(() => {
    const filtered = otherAccounts.filter(account => {
      const platformLabel = ALL_PLATFORMS.find(p => p.id === account.platform)?.label || account.platform;
      return platformLabel.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return filtered.sort((a, b) => {
      const labelA = ALL_PLATFORMS.find(p => p.id === a.platform)?.label || a.platform;
      const labelB = ALL_PLATFORMS.find(p => p.id === b.platform)?.label || b.platform;
      return labelA.localeCompare(labelB);
    });
  }, [otherAccounts, searchQuery]);

  return (
    <SafeAreaView edges={['left', 'right']} backgroundColor="#E8E9EB" style={{ paddingTop: 5 }}>
      <View style={{ flex: 1 }}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
          <TextInput
            placeholder="Search accounts..."
            placeholderTextColor={'#9CA3AF'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              fontSize: 14,
              color: '#0D1B1E',
            }}
          />
        </View>

        {/* Tab Switcher */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E8E9EB',
          }}
        >
          <Pressable
            onPress={() => setActiveTab('added')}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderBottomWidth: activeTab === 'added' ? 2 : 0,
              borderBottomColor: '#F12838',
              marginBottom: -1,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: activeTab === 'added' ? '600' : '400',
                color: '#0D1B1E',
                fontSize: 14,
              }}
            >
              My Accounts
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('other')}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderBottomWidth: activeTab === 'other' ? 2 : 0,
              borderBottomColor: '#F12838',
              marginBottom: -1,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: activeTab === 'other' ? '600' : '400',
                color: '#0D1B1E',
                fontSize: 14,
              }}
            >
              All Platforms
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          {activeTab === 'added' ? (
            <FlatList
              data={filteredMyAccounts}
              keyExtractor={(item) => item.platform}
              ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
                  <MaterialCommunityIcons name="account-plus" size={48} color="#D1D5DB" />
                  <Text style={{ marginTop: 12, color: '#6B7280', fontSize: 14, textAlign: 'center' }}>
                    No accounts added yet
                  </Text>
                </View>
              }
              renderItem={({ item: account }) => (
                <View key={account.platform} style={{ marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#0D1B1E' }}>
                      {ALL_PLATFORMS.find(p => p.id === account.platform)?.label || account.platform}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setEditingPlatform(account.platform);
                        setModalVisible(true);
                      }}
                      style={{ padding: 8 }}
                    >
                      <MaterialCommunityIcons name="plus" size={20} color="#F12838" />
                    </TouchableOpacity>
                  </View>

                  {account.handles.map((handle, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, color: '#0D1B1E', marginBottom: 4 }}>
                          {handle.value}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6B7280' }}>
                          {handle.isPublic ? 'Public' : 'Private'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => openEditModal(account.platform, index)}
                        style={{
                          backgroundColor: '#0D1B1E',
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                          minWidth: 70,
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#FFFFFF' }}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            />
          ) : (
            <FlatList
              data={filteredOtherAccounts}
              keyExtractor={(item) => item.platform}
              ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
                  <MaterialCommunityIcons name="account-search" size={48} color="#D1D5DB" />
                  <Text style={{ marginTop: 12, color: '#6B7280', fontSize: 14, textAlign: 'center' }}>
                    No other accounts available
                  </Text>
                </View>
              }
              renderItem={({ item: account }) => {
                const platformInfo = ALL_PLATFORMS.find(p => p.id === account.platform);
                return (
                  <View
                    key={account.platform}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 12,
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
                      <PlatformIcon platform={account.platform as any} size={20} color="#FFFFFF" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E' }}>
                        {platformInfo?.label || account.platform}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => openAddModal(account.platform)}
                      style={{
                        backgroundColor: '#0D1B1E',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 6,
                        minWidth: 70,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: '600', color: '#FFFFFF' }}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
        </View>

      </View>

      {/* Add/Edit Platform BottomSheet */}
      <BottomSheet
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setTimeout(() => {
            setEditingPlatform(null);
            setHandleInput('');
            setIsPublic(false);
            setEditingHandleIndex(null);
          }, 300);
        }}
        title={
          !editingPlatform
            ? 'Select Platform'
            : modalMode === 'add'
            ? 'Add ' + (ALL_PLATFORMS.find(p => p.id === editingPlatform)?.label || editingPlatform)
            : 'Edit ' + (ALL_PLATFORMS.find(p => p.id === editingPlatform)?.label || editingPlatform)
        }
        actions={
          editingPlatform ? (
            <>
              <TouchableOpacity
                onPress={modalMode === 'add' ? handleAddHandle : handleUpdateHandle}
                disabled={!handleInput.trim()}
                style={{
                  backgroundColor: handleInput.trim() ? '#0D1B1E' : '#D1D5DB',
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
                  {modalMode === 'add' ? 'Confirm' : 'Update'}
                </Text>
              </TouchableOpacity>

              {modalMode === 'edit' && (
                <TouchableOpacity
                  onPress={() => {
                    if (editingPlatform && editingHandleIndex !== null) {
                      handleDeleteHandle(editingPlatform, editingHandleIndex);
                      setModalVisible(false);
                    }
                  }}
                  style={{
                    backgroundColor: '#EF4444',
                    borderRadius: 8,
                    paddingVertical: 12,
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setEditingPlatform(null);
                  setHandleInput('');
                  setIsPublic(false);
                  setEditingHandleIndex(null);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#6B7280', fontWeight: '600', fontSize: 14 }}>
                  {modalMode === 'edit' ? 'Cancel' : 'Back'}
                </Text>
              </TouchableOpacity>
            </>
          ) : null
        }
      >
        <View>
          <TextInput
            placeholder="Enter handle"
            placeholderTextColor={'#9CA3AF'}
            value={handleInput}
            onChangeText={setHandleInput}
            style={{
              backgroundColor: '#F3F4F6',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 14,
              color: '#0D1B1E',
              marginBottom: 12,
            }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#0D1B1E', fontWeight: '500' }}>
              Public
            </Text>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ false: '#E5E7EB', true: '#FECACA' }}
              thumbColor={isPublic ? '#F12838' : '#D1D5DB'}
            />
          </View>

          {isPublic && (
            <View
              style={{
                backgroundColor: '#FEE2E2',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 12, color: '#991B1B', lineHeight: 16 }}>
                {PLATFORM_VISIBILITY_TERMS[editingPlatform as keyof typeof PLATFORM_VISIBILITY_TERMS] ||
                  'This account will be visible to your connections.'}
              </Text>
            </View>
          )}
        </View>
      </BottomSheet>

    </SafeAreaView>
  );
}
