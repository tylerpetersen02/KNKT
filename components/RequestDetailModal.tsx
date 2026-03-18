import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import type { RequestItem } from '../data/mockRequests';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import { PlatformIcon } from './PlatformIcon';

interface RequestDetailModalProps {
  request: RequestItem | null;
  isVisible: boolean;
  isReceived: boolean;
  onClose: () => void;
  onAccept?: (id: string, selectedItems?: string[]) => void;
  onDecline?: (id: string) => void;
  onCancel?: (id: string) => void;
  onUpdate?: (id: string, selectedItems?: string[]) => void;
  acceptedItems?: Set<string>;
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

function getRequestTypeLabel(type: string): string {
  if (type === 'exchange') {
    return 'Contact Exchange';
  }
  return 'Platform Share Request';
}

export default function RequestDetailModal({
  request,
  isVisible,
  isReceived,
  onClose,
  onAccept,
  onDecline,
  onCancel,
  onUpdate,
  acceptedItems = new Set(),
}: RequestDetailModalProps) {
  const insets = useSafeAreaInsets();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [originalPlatforms, setOriginalPlatforms] = useState<Set<string>>(new Set());

  // Reset selected items when modal opens
  useEffect(() => {
    if (isVisible && request) {
      const platforms = request.metadata?.platforms || [];
      const platformsSet = new Set(platforms);
      setSelectedItems(platformsSet);
      setOriginalPlatforms(platformsSet);
    }
  }, [isVisible, request?.id]);

  // Check if selection has changed
  const hasChanges = selectedItems.size !== originalPlatforms.size ||
    Array.from(selectedItems).some(item => !originalPlatforms.has(item));

  if (!request) return null;

  // For sent requests, show the recipient; for received requests, show the sender
  const displayUser = isReceived ? request.from_user : request.to_user || request.from_user;

  const initials = displayUser.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const timeAgo = getTimeAgo(request.created_at);
  const platforms = request.metadata?.platforms || [];
  const requestTypeLabel = getRequestTypeLabel(request.type);

  const toggleItem = (platformType: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(platformType)) {
      newSelected.delete(platformType);
    } else {
      newSelected.add(platformType);
    }
    setSelectedItems(newSelected);
  };

  const handleAcceptSelected = () => {
    onAccept?.(request.id, Array.from(selectedItems));
    onClose();
  };

  const handleDeclineAll = () => {
    // Decline all platforms in the request
    const allItems = request.metadata?.platforms || [];
    onDecline?.(request.id, allItems);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
          }}
        >
            <ScrollView style={{ flex: 1 }} scrollEnabled={true} keyboardShouldPersistTaps="handled">
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingTop: 16,
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#0D1B1E' }}>
                Request Details
              </Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 16 }}>
              {/* User Info Card */}
              <View
                style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 20,
                  alignItems: 'center',
                }}
              >
                {/* Avatar */}
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: '#0D1B1E',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ fontSize: 32, fontWeight: '600', color: '#FFFFFF' }}>
                    {initials}
                  </Text>
                </View>

                {/* Name */}
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#0D1B1E', marginBottom: 4 }}>
                  {displayUser.name}
                </Text>

                {/* Username */}
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280', marginBottom: 12 }}>
                  @{displayUser.username}
                </Text>

                {/* Sender Message - Speech Bubble */}
                {request.senderMessage && (
                  <View
                    style={{
                      marginTop: 12,
                      alignItems: 'center',
                    }}
                  >
                    {/* Speech Bubble Pointer */}
                    <View
                      style={{
                        width: 0,
                        height: 0,
                        borderLeftWidth: 8,
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 8,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: '#F0F1F3',
                        marginBottom: -2,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#F0F1F3',
                        borderRadius: 16,
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        maxWidth: '85%',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#393E41',
                          textAlign: 'left',
                        }}
                        numberOfLines={3}
                      >
                        "{request.senderMessage}"
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Requested Items - For Received Requests */}
              {isReceived && platforms.length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 4 }}>
                    Select items to share ({selectedItems.size} of {platforms.length})
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 12 }}>
                    {acceptedItems.size > 0
                      ? `${acceptedItems.size} already accepted. Tap to select remaining items.`
                      : 'Tap to toggle which items you want to share'}
                  </Text>

                  {platforms.map((platformType, idx) => {
                    const platformInfo = PLATFORM_ICONS[platformType as any];
                    if (!platformInfo) return null;

                    const isSelected = selectedItems.has(platformType);

                    return (
                      <Pressable
                        key={idx}
                        onPress={() => toggleItem(platformType)}
                        style={{
                          backgroundColor: isSelected ? '#F3F4F6' : '#FFFFFF',
                          borderRadius: 8,
                          padding: 12,
                          marginBottom: 8,
                          borderWidth: 2,
                          borderColor: isSelected ? '#0D1B1E' : '#E8E9EB',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                          <View
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              backgroundColor: platformInfo.color,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: 12,
                            }}
                          >
                            <PlatformIcon platform={platformType} size={20} />
                          </View>

                          <Text style={{ fontSize: 14, fontWeight: '500', color: '#0D1B1E' }}>
                            {platformInfo.label}
                          </Text>
                        </View>

                        {/* Checkbox */}
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            backgroundColor: isSelected ? '#F12838' : '#E8E9EB',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {isSelected && (
                            <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
                          )}
                        </View>
                      </Pressable>
                    );
                  })}

                  {/* Previously Accepted Items */}
                  {acceptedItems.size > 0 && (
                    <View style={{ marginTop: 16 }}>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 }}>
                        Already Accepted ({acceptedItems.size})
                      </Text>
                      {Array.from(acceptedItems).map((platformType, idx) => {
                        const platformInfo = PLATFORM_ICONS[platformType as any];
                        if (!platformInfo) return null;

                        return (
                          <View
                            key={idx}
                            style={{
                              backgroundColor: '#F9FAFB',
                              borderRadius: 8,
                              padding: 12,
                              marginBottom: 8,
                              borderWidth: 1,
                              borderColor: '#D1D5DB',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              opacity: 0.7,
                            }}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                              <View
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 20,
                                  backgroundColor: platformInfo.color,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginRight: 12,
                                  opacity: 0.6,
                                }}
                              >
                                <PlatformIcon platform={platformType} size={20} />
                              </View>

                              <Text style={{ fontSize: 14, fontWeight: '500', color: '#9CA3AF' }}>
                                {platformInfo.label}
                              </Text>
                            </View>

                            {/* Accepted Badge */}
                            <View
                              style={{
                                backgroundColor: '#DCFCE7',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 4,
                              }}
                            >
                              <Text style={{ fontSize: 11, fontWeight: '600', color: '#166534' }}>
                                Accepted
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              )}

              {/* For Sent Requests - Allow Selection to Update */}
              {!isReceived && (
                <View style={{ marginBottom: 20 }}>
                  {/* Get all available platforms (originally requested + available) */}
                  {(() => {
                    const allAvailable = [
                      ...new Set([
                        ...(request.metadata?.platforms || []),
                        ...(request.metadata?.availablePlatforms || []),
                      ]),
                    ];

                    // Split into requesting and available based on current selection
                    const requesting = allAvailable.filter(p => selectedItems.has(p));
                    const available = allAvailable.filter(p => !selectedItems.has(p));

                    const renderPlatformItem = (platformType: string, idx: number) => {
                      const platformInfo = PLATFORM_ICONS[platformType as any];
                      if (!platformInfo) return null;

                      const isSelected = selectedItems.has(platformType);

                      return (
                        <Pressable
                          key={idx}
                          onPress={() => toggleItem(platformType)}
                          style={{
                            backgroundColor: isSelected ? '#F3F4F6' : '#FFFFFF',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 8,
                            borderWidth: 2,
                            borderColor: isSelected ? '#0D1B1E' : '#E8E9EB',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: platformInfo.color,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 12,
                              }}
                            >
                              <PlatformIcon platform={platformType as any} size={20} />
                            </View>

                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#0D1B1E',
                              }}
                            >
                              {platformInfo.label}
                            </Text>
                          </View>

                          {/* Checkbox */}
                          <View
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              backgroundColor: isSelected ? '#F12838' : '#E8E9EB',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {isSelected && (
                              <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
                            )}
                          </View>
                        </Pressable>
                      );
                    };

                    return (
                      <>
                        {/* Requesting Platforms Section */}
                        {requesting.length > 0 && (
                          <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 4 }}>
                              Requesting ({requesting.length})
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 12 }}>
                              Tap to remove from request
                            </Text>
                            {requesting.map((platform, idx) => renderPlatformItem(platform, idx))}
                          </View>
                        )}

                        {/* Available Platforms Section */}
                        {available.length > 0 && (
                          <View>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 4 }}>
                              Available to request
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 12 }}>
                              Tap to add to request
                            </Text>
                            {available.map((platform, idx) => renderPlatformItem(platform, idx))}
                          </View>
                        )}
                      </>
                    );
                  })()}
                </View>
              )}

              {/* Time */}
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 20 }}>
                Sent {timeAgo}
              </Text>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              paddingBottom: Math.max(insets.bottom, 16),
              borderTopWidth: 1,
              borderTopColor: '#E8E9EB',
              backgroundColor: '#FFFFFF',
              gap: 8,
            }}
          >
            {isReceived ? (
              <>
                {/* Accept Selected Button */}
                <TouchableOpacity
                  onPress={handleAcceptSelected}
                  disabled={selectedItems.size === 0}
                  style={{
                    backgroundColor: selectedItems.size === 0 ? '#D1D5DB' : '#0D1B1E',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                    Accept Selected ({selectedItems.size})
                  </Text>
                </TouchableOpacity>

                {/* Decline All Button */}
                <TouchableOpacity
                  onPress={handleDeclineAll}
                  style={{
                    backgroundColor: '#E8E9EB',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E' }}>
                    Decline All
                  </Text>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{
                    backgroundColor: '#F3F4F6',
                    paddingVertical: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B7280' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              /* For Sent Requests */
              <>
                {/* Update Button */}
                <TouchableOpacity
                  onPress={() => {
                    onUpdate?.(request.id, Array.from(selectedItems));
                    onClose();
                  }}
                  disabled={!hasChanges}
                  style={{
                    backgroundColor: !hasChanges ? '#D1D5DB' : '#0D1B1E',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                    Update Request
                  </Text>
                </TouchableOpacity>

                {/* Cancel Request Button */}
                <TouchableOpacity
                  onPress={() => {
                    onCancel?.(request.id);
                    onClose();
                  }}
                  style={{
                    backgroundColor: '#E8E9EB',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E' }}>
                    Cancel Request
                  </Text>
                </TouchableOpacity>
              </>
            )}
        </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
