import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestItem from './RequestItem';
import RequestDetailModal from './RequestDetailModal';
import Toast from './Toast';
import { mockReceivedRequests } from '../data/mockRequests';

export default function ReceivedRequests() {
  const [requests, setRequests] = useState(
    mockReceivedRequests
      .filter(r => r.status === 'pending')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  );
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [acceptedRequestIds, setAcceptedRequestIds] = useState<Set<string>>(new Set());
  const [declinedRequestIds, setDeclinedRequestIds] = useState<Set<string>>(new Set());
  const [acceptedItemsByRequest, setAcceptedItemsByRequest] = useState<Record<string, Set<string>>>({});

  const selectedRequest = selectedRequestId
    ? requests.find(r => r.id === selectedRequestId)
    : null;

  const handleAccept = (id: string, selectedItems?: string[]) => {
    console.log('Accept request:', id, 'Items:', selectedItems);
    setSelectedRequestId(null);

    // Track accepted items for this request
    if (selectedItems) {
      setAcceptedItemsByRequest(prev => ({
        ...prev,
        [id]: new Set([...(prev[id] || []), ...selectedItems])
      }));
    }

    // Remove after delay to show acceptance message (only if fully accepted)
    setTimeout(() => {
      setRequests(prevRequests => {
        const request = prevRequests.find(r => r.id === id);
        if (!request) return prevRequests;

        // Get items that were NOT accepted (remaining items)
        const allItems = request.metadata?.platforms || [];
        const remainingItems = selectedItems
          ? allItems.filter(item => !selectedItems.includes(item))
          : [];

        // If all items were accepted or no items remain, remove the request and show message
        if (remainingItems.length === 0) {
          setAcceptedRequestIds(prev => new Set([...prev, id]));
          setTimeout(() => {
            setAcceptedRequestIds(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }, 1800);
          return prevRequests.filter(r => r.id !== id);
        }

        // Otherwise, just update the request with only remaining items (no message)
        return prevRequests.map(r =>
          r.id === id
            ? { ...r, metadata: { ...r.metadata, platforms: remainingItems } }
            : r
        );
      });
    }, 300);
  };

  const handleDecline = (id: string, selectedItems?: string[]) => {
    // If called from detail modal with specific items, process immediately
    if (selectedItems !== undefined) {
      console.log('Decline specific items:', selectedItems);
      setSelectedRequestId(null);

      setTimeout(() => {
        setRequests(prevRequests => {
          const request = prevRequests.find(r => r.id === id);
          if (!request) return prevRequests;

          // Get items that were NOT declined (remaining items)
          const allItems = request.metadata?.platforms || [];
          const remainingItems = allItems.filter(item => !selectedItems.includes(item));

          // If all items were declined or no items remain, remove the request and show message
          if (remainingItems.length === 0) {
            setDeclinedRequestIds(prev => new Set([...prev, id]));
            setTimeout(() => {
              setDeclinedRequestIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
              });
            }, 1800);
            return prevRequests.filter(r => r.id !== id);
          }

          // Otherwise, just update the request with only remaining items (no message)
          return prevRequests.map(r =>
            r.id === id
              ? { ...r, metadata: { ...r.metadata, platforms: remainingItems } }
              : r
          );
        });
      }, 300);
      return;
    }

    // If called from request item (decline all), show alert
    Alert.alert('Decline Request', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Decline',
        onPress: () => {
          console.log('Decline all items for request:', id);
          setSelectedRequestId(null);

          // Remove after delay
          setTimeout(() => {
            setRequests(requests.filter(r => r.id !== id));
            setDeclinedRequestIds(prev => new Set([...prev, id]));

            setTimeout(() => {
              setDeclinedRequestIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
              });
            }, 1800);
          }, 300);
        },
        style: 'destructive',
      },
    ]);
  };

  if (requests.length === 0) {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 40 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
          <MaterialCommunityIcons name="inbox-outline" size={48} color="#D1D5DB" style={{ marginBottom: 12 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#0D1B1E', marginBottom: 8 }}>
            No pending requests
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280', textAlign: 'center' }}>
            Start exchanging contacts to see requests here!
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
            const isAccepted = acceptedRequestIds.has(request.id);
            const isDeclined = declinedRequestIds.has(request.id);

            return (
              <View key={request.id}>
                {isAccepted ? (
                  <View
                    style={{
                      backgroundColor: '#DCFCE7',
                      borderRadius: 8,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: '#86EFAC',
                      padding: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    <MaterialCommunityIcons name="check-circle" size={24} color="#10B981" />
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#166534' }}>
                      Accepted {request.from_user.name}'s request
                    </Text>
                  </View>
                ) : isDeclined ? (
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
                      Declined
                    </Text>
                  </View>
                ) : (
                  <RequestItem
                    request={request}
                    isReceived={true}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
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
        isReceived={true}
        onClose={() => setSelectedRequestId(null)}
        onAccept={handleAccept}
        onDecline={handleDecline}
        acceptedItems={selectedRequestId ? acceptedItemsByRequest[selectedRequestId] : undefined}
      />
    </>
  );
}
