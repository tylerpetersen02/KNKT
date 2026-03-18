import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

interface ConfirmPrivacyTogglePopupProps {
  visible: boolean;
  isGoingPublic: boolean;
  platformName: string;
  visibilityTerm?: string;
  affectedConnectionCount?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmPrivacyTogglePopup({
  visible,
  isGoingPublic,
  platformName,
  visibilityTerm = 'account',
  affectedConnectionCount = 0,
  onConfirm,
  onCancel,
}: ConfirmPrivacyTogglePopupProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      swipeDirection="down"
      onSwipeComplete={onCancel}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
              {isGoingPublic ? `Make ${platformName} Public?` : `Make ${platformName} Private?`}
            </Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            {isGoingPublic ? (
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#393E41', lineHeight: 20 }}>
                Anyone you share a connection with will be able to see your {visibilityTerm}.
              </Text>
            ) : (
              <>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#393E41', marginBottom: 12, lineHeight: 20 }}>
                  {affectedConnectionCount > 0
                    ? `${affectedConnectionCount} connection${affectedConnectionCount !== 1 ? 's' : ''} will lose access to this account (those you didn't manually approve).`
                    : 'Connections will lose access to this account (except those you manually approved).'}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#393E41', lineHeight: 20 }}>
                  Your manual approvals will be preserved.
                </Text>
              </>
            )}
          </View>

          {/* Buttons */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: Math.max(insets.bottom, 16),
              paddingTop: 16,
              gap: 12,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={onCancel}
              style={{
                flex: 1,
                backgroundColor: '#E8E9EB',
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E' }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1,
                backgroundColor: '#0D1B1E',
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                {isGoingPublic ? 'Make Public' : 'Make Private'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
