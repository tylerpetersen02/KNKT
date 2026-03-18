import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestItem from './RequestItem';
import RequestDetailModal from './RequestDetailModal';
import Toast from './Toast';
import { mockSentRequests } from '../data/mockRequests';

export default function SentRequests() {
  const [requests, setRequests] = useState(
    mockSentRequests
      .filter(r => r.status === 'pending')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  );
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [cancelledRequestIds, setCancelledRequestIds] = useState<Set<string>>(new Set());

  const selectedRequest = selectedRequestId
    ? mockSentRequests.find(r => r.id === selectedRequestId)
    : null;

  const handleCancel = (id: string) => {
    Alert.alert('Cancel Request', 'Are you sure you want to cancel this request?', [
      { text: 'Keep', onPress: () => {}, style: 'cancel' },
      {
        text: 'Cancel Request',
        onPress: () => {
          console.log('Cancel request:', id);
          setCancelledRequestIds(new Set([...cancelledRequestIds, id]));

          // Remove after delay to show cancellation message
          setTimeout(() => {
            setRequests(requests.filter(r => r.id !== id));
            setCancelledRequestIds(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }, 1800);
        },
        style: 'destructive',
      },
    ]);
  };

  const handleUpdate = (id: string, selectedItems?: string[]) => {
    console.log('Update request:', id, 'with platforms:', selectedItems);
    // In a real app, this would update the request with new platforms
    setSelectedRequestId(null);
  };

  if (requests.length === 0) {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 40 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
          <MaterialCommunityIcons name="send-outline" size={48} color="#D1D5DB" style={{ marginBottom: 12 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#0D1B1E', marginBottom: 8 }}>
            You haven't sent any requests yet
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280', textAlign: 'center' }}>
            Search for people to connect with!
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          {requests.map((request) => {
            const isCancelled = cancelledRequestIds.has(request.id);

            return (
              <View key={request.id}>
                {isCancelled ? (
                  <View
                    style={{
                      backgroundColor: '#FEE2E2',
                      borderRadius: 8,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: '#FECACA',
                      padding: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <MaterialCommunityIcons name="close-circle" size={24} color="#DC2626" />
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#991B1B' }}>
                      Cancelled request to {request.to_user_id}
                    </Text>
                  </View>
                ) : (
                  <RequestItem
                    request={request}
                    isReceived={false}
                    onCancel={handleCancel}
                    onView={setSelectedRequestId}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>

      <RequestDetailModal
        request={selectedRequest || null}
        isVisible={selectedRequestId !== null}
        isReceived={false}
        onClose={() => setSelectedRequestId(null)}
        onCancel={handleCancel}
        onUpdate={handleUpdate}
      />
    </>
  );
}
