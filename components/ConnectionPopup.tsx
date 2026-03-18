import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

interface ConnectionPopupProps {
  visible: boolean;
  user: {
    id: string;
    name: string;
    username: string;
    avatar_url?: string;
    bio?: string;
  };
  onAccept: (note: string) => void;
  onDecline: () => void;
  onViewProfile?: (userId: string) => void;
}

export default function ConnectionPopup({
  visible,
  user,
  onAccept,
  onDecline,
  onViewProfile,
}: ConnectionPopupProps) {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const insets = useSafeAreaInsets();

  const handleAccept = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onAccept(note);
    setConnected(true);
    setLoading(false);
    setNote('');
  };

  const handleDecline = () => {
    onDecline();
    setTimeout(() => {
      setConnected(false);
      setNote('');
    }, 300);
  };

  const handleViewProfile = () => {
    onViewProfile?.(user.id);
    onDecline();
    setTimeout(() => {
      setConnected(false);
      setNote('');
    }, 300);
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleDecline}
      onBackButtonPress={handleDecline}
      swipeDirection="down"
      onSwipeComplete={handleDecline}
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
                  {connected ? 'Connected!' : 'New Connection'}
                </Text>
                <TouchableOpacity onPress={handleDecline}>
                  <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View style={{ paddingHorizontal: 16 }}>
                {!connected ? (
                  <>
                    {/* Avatar */}
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: '#F12838',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 28,
                          fontWeight: '600',
                          color: '#FFFFFF',
                        }}
                      >
                        {initials}
                      </Text>
                    </View>

                    {/* Name */}
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#0D1B1E',
                        textAlign: 'center',
                        marginBottom: 4,
                      }}
                    >
                      {user.name}
                    </Text>

                    {/* Username */}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#6B7280',
                        textAlign: 'center',
                        marginBottom: 12,
                      }}
                    >
                      @{user.username}
                    </Text>

                    {/* Bio */}
                    {user.bio && (
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '400',
                          color: '#393E41',
                          textAlign: 'center',
                          marginBottom: 20,
                          fontStyle: 'italic',
                        }}
                      >
                        "{user.bio}"
                      </Text>
                    )}

                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#E8E9EB',
                        marginBottom: 16,
                      }}
                    />

                    {/* Note Input */}
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#0D1B1E',
                        marginBottom: 8,
                      }}
                    >
                      Add a note (personal, not visible to them)
                    </Text>

                    <TextInput
                      value={note}
                      onChangeText={setNote}
                      placeholder="Met at coffee shop, great conversation..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      numberOfLines={3}
                      editable={!loading}
                      style={{
                        borderWidth: 1,
                        borderColor: '#E8E9EB',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 14,
                        color: '#0D1B1E',
                        backgroundColor: '#FFFFFF',
                        textAlignVertical: 'top',
                        marginBottom: 20,
                      }}
                    />
                  </>
                ) : (
                  <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                    {/* Checkmark Circle */}
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: '#FFE8EB',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="check"
                        size={48}
                        color="#F12838"
                      />
                    </View>

                    {/* Success Message */}
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: '#F12838',
                        marginBottom: 24,
                      }}
                    >
                      Connected!
                    </Text>

                    {/* Detail Message */}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#393E41',
                        textAlign: 'center',
                        marginBottom: 20,
                      }}
                    >
                      Success! You've connected with {user.name}. View their profile to start exchanging information.
                    </Text>
                  </View>
                )}
              </View>

              {/* Bottom Buttons */}
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingBottom: Math.max(insets.bottom, 16),
                  paddingTop: 16,
                  gap: 12,
                  flexDirection: 'row',
                }}
              >
                {!connected ? (
                  <>
                    <TouchableOpacity
                      onPress={handleDecline}
                      disabled={loading}
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        backgroundColor: '#E8E9EB',
                        borderRadius: 8,
                        alignItems: 'center',
                        opacity: loading ? 0.5 : 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#0D1B1E',
                        }}
                      >
                        Decline
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleAccept}
                      disabled={loading}
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        backgroundColor: loading ? '#E8E9EB' : '#0D1B1E',
                        borderRadius: 8,
                        alignItems: 'center',
                      }}
                    >
                      {loading ? (
                        <ActivityIndicator color="#0D1B1E" />
                      ) : (
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#FFFFFF',
                          }}
                        >
                          Accept
                        </Text>
                      )}
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={handleDecline}
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        backgroundColor: '#E8E9EB',
                        borderRadius: 8,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#0D1B1E',
                        }}
                      >
                        Done
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleViewProfile}
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        backgroundColor: '#0D1B1E',
                        borderRadius: 8,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#FFFFFF',
                        }}
                      >
                        View Profile
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
        </ScrollView>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
