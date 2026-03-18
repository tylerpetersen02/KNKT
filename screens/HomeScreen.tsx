import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import type { MockUser } from '../data/mockUsers';
import ConnectionPopup from '../components/ConnectionPopup';
import { exchangeService } from '../services/exchangeService';

export default function HomeScreen() {
  const [connectionPopupVisible, setConnectionPopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  const handleAcceptConnection = async (note: string) => {
    if (!selectedUser) return;

    try {
      // Create exchange attempt
      await exchangeService.createExchangeAttempt({
        initiator_id: 'current-user',
        receiver_id: selectedUser.id,
        user_note: note,
      });

      // Show success toast/alert
      Alert.alert(
        'Connected! 🎉',
        `Connected with ${selectedUser.name}!`,
        [{ text: 'Great!', onPress: () => {} }]
      );

      // Close popup
      setConnectionPopupVisible(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error accepting connection:', error);
      Alert.alert('Error', 'Failed to create connection');
    }
  };

  const handleDeclineConnection = () => {
    setConnectionPopupVisible(false);
    setSelectedUser(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Connection Popup */}
      {selectedUser && (
        <ConnectionPopup
          visible={connectionPopupVisible}
          user={selectedUser}
          onAccept={handleAcceptConnection}
          onDecline={handleDeclineConnection}
        />
      )}

      {/* Placeholder content */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: '#9CA3AF' }}>
          NFC home screen
        </Text>
      </View>
    </View>
  );
}
