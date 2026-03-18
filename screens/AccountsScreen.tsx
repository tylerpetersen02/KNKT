import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Pressable, Switch, Alert, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from '../components/SafeAreaView';
import { PLATFORM_ICONS, PLATFORM_VISIBILITY_TERMS } from '../utils/platformIcons';
import ConfirmPrivacyTogglePopup from '../components/ConfirmPrivacyTogglePopup';
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'added' | 'other'>('added');
  const [isPublic, setIsPublic] = useState(false);
  const [privacyPopupVisible, setPrivacyPopupVisible] = useState(false);
  const [popupOriginalState, setPopupOriginalState] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(500)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 500,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible, overlayOpacity, sheetTranslateY]);


  const handleOverlayPress = () => {
    if (keyboardVisible) {
      Keyboard.dismiss();
    } else {
      setModalVisible(false);
    }
  };

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

  const handleTogglePrivacy = (platform: string, handleIndex: number, newIsPublic: boolean) => {
    setPopupOriginalState(!newIsPublic);
    setPrivacyPopupVisible(true);
    setEditingPlatform(platform);
    setEditingHandleIndex(handleIndex);
    setIsPublic(newIsPublic);
  };

  const confirmPrivacyToggle = () => {
    if (editingPlatform !== null && editingHandleIndex !== null) {
      const updatedAccounts = accounts.map(account => {
        if (account.platform === editingPlatform) {
          const updatedHandles = [...account.handles];
          updatedHandles[editingHandleIndex].isPublic = isPublic;
          return { ...account, handles: updatedHandles };
        }
        return account;
      });
      setAccounts(updatedAccounts);
      setPrivacyPopupVisible(false);
      setEditingPlatform(null);
      setEditingHandleIndex(null);
    }
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
              Other Accounts
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

                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity
                          onPress={() => handleTogglePrivacy(account.platform, index, !handle.isPublic)}
                          style={{ padding: 8 }}
                        >
                          <MaterialCommunityIcons
                            name={handle.isPublic ? 'eye' : 'eye-off'}
                            size={20}
                            color="#6B7280"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleDeleteHandle(account.platform, index)}
                          style={{ padding: 8 }}
                        >
                          <MaterialCommunityIcons name="trash-can-outline" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
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
                      {platformInfo?.icon && (
                        <MaterialCommunityIcons name={platformInfo.icon} size={20} color="#FFFFFF" />
                      )}
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E' }}>
                        {platformInfo?.label || account.platform}
                      </Text>
                    </View>

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

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="none">
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: overlayOpacity,
          }}
          onTouchEnd={handleOverlayPress}
        />

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: Math.max(insets.bottom, 16),
            maxHeight: '80%',
            transform: [{ translateY: sheetTranslateY }],
          }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#0D1B1E', marginBottom: 12 }}>
                  {editingPlatform ? 'Add ' + (ALL_PLATFORMS.find(p => p.id === editingPlatform)?.label || editingPlatform) : 'Select Platform'}
                </Text>

                {!editingPlatform ? (
                  <View style={{ gap: 8 }}>
                    {ALL_PLATFORMS.map((platform) => (
                      <TouchableOpacity
                        key={platform.id}
                        onPress={() => {
                          setEditingPlatform(platform.id);
                          setHandleInput('');
                          setIsPublic(false);
                        }}
                        style={{
                          backgroundColor: '#F3F4F6',
                          borderRadius: 8,
                          paddingVertical: 12,
                          paddingHorizontal: 12,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        {platform.icon ? (
                          <MaterialCommunityIcons name={platform.icon} size={24} color="#0D1B1E" />
                        ) : (
                          <View style={{ width: 24, height: 24, backgroundColor: '#E5E7EB', borderRadius: 4 }} />
                        )}
                        <Text style={{ fontSize: 14, color: '#0D1B1E', fontWeight: '500' }}>
                          {platform.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
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

                    <TouchableOpacity
                      onPress={handleAddHandle}
                      disabled={!handleInput.trim()}
                      style={{
                        backgroundColor: handleInput.trim() ? '#F12838' : '#D1D5DB',
                        borderRadius: 8,
                        paddingVertical: 12,
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
                        Add Handle
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setEditingPlatform(null);
                        setHandleInput('');
                        setIsPublic(false);
                      }}
                      style={{
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        borderRadius: 8,
                        paddingVertical: 12,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: '#6B7280', fontWeight: '600', fontSize: 14 }}>
                        Back
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </Modal>

      {/* Privacy Toggle Confirmation Popup */}
      {privacyPopupVisible && (
        <ConfirmPrivacyTogglePopup
          isPublic={isPublic}
          onConfirm={confirmPrivacyToggle}
          onCancel={() => {
            setPrivacyPopupVisible(false);
            setIsPublic(popupOriginalState);
          }}
        />
      )}
    </SafeAreaView>
  );
}
