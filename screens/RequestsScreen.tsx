import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from '../components/SafeAreaView';
import ReceivedRequests from '../components/ReceivedRequests';
import SentRequests from '../components/SentRequests';
import { mockReceivedRequests } from '../data/mockRequests';

export default function RequestsScreen() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  // Count unread received requests (pending only)
  const unreadCount = mockReceivedRequests.filter(r => r.status === 'pending').length;

  return (
    <SafeAreaView edges={['left', 'right']} backgroundColor="#E8E9EB" style={{ paddingTop: 5 }}>
      <View style={{ flex: 1 }}>
      {/* Tab Switcher */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          marginBottom: 16,
          marginTop: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#E8E9EB',
        }}
      >
        <Pressable
          onPress={() => setActiveTab('received')}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderBottomWidth: activeTab === 'received' ? 2 : 0,
            borderBottomColor: '#F12838',
            marginBottom: -1,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: activeTab === 'received' ? '600' : '400',
                color: '#0D1B1E',
                fontSize: 14,
              }}
            >
              Received
            </Text>
            {unreadCount > 0 && (
              <View
                style={{
                  backgroundColor: '#F12838',
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  minWidth: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600' }}>
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('sent')}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderBottomWidth: activeTab === 'sent' ? 2 : 0,
            borderBottomColor: '#F12838',
            marginBottom: -1,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: activeTab === 'sent' ? '600' : '400',
              color: '#0D1B1E',
              fontSize: 14,
            }}
          >
            Sent
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      {activeTab === 'received' ? <ReceivedRequests /> : <SentRequests />}
      </View>
    </SafeAreaView>
  );
}
