import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from '../components/SafeAreaView';
import Button from '../components/Button';
import { mockReceivedRequests, mockSentRequests } from '../data/mockRequests';

export default function ProfileScreen({ onLogout }: any) {
  // Combine and sort all requests by date (most recent first)
  const allRequests = [
    ...mockReceivedRequests.map(r => ({ ...r, direction: 'received' as const })),
    ...mockSentRequests.map(r => ({ ...r, direction: 'sent' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'accepted':
        return { bg: '#DCFCE7', text: '#166534' };
      case 'declined':
        return { bg: '#FEE2E2', text: '#991B1B' };
      default:
        return { bg: '#E0E7FF', text: '#3730A3' };
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#0D1B1E', marginBottom: 24 }}>Profile</Text>

          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 8 }}>Name</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#0D1B1E' }}>Demo User</Text>
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 8 }}>Email</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#0D1B1E' }}>demo@example.com</Text>
          </View>

          {/* Request History */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#0D1B1E', marginBottom: 12 }}>Request History</Text>

            {allRequests.length === 0 ? (
              <Text style={{ fontSize: 13, fontWeight: '400', color: '#6B7280' }}>No requests yet</Text>
            ) : (
              allRequests.map((request) => {
                const statusColor = getStatusBadgeColor(request.status);
                const userName = request.direction === 'received' ? request.from_user.name : 'Pending';
                const timeAgo = getTimeAgo(request.created_at);

                return (
                  <View
                    key={request.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: '#E8E9EB',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 4 }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#0D1B1E' }}>
                          {userName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '500',
                            color: '#9CA3AF',
                            backgroundColor: '#F3F4F6',
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            borderRadius: 4,
                          }}
                        >
                          {request.direction === 'received' ? 'Received' : 'Sent'}
                        </Text>
                      </View>

                      <Text style={{ fontSize: 11, fontWeight: '400', color: '#6B7280', marginBottom: 4 }}>
                        {request.type === 'exchange' ? 'Contact Exchange' : 'Platform Share'}
                      </Text>

                      <Text style={{ fontSize: 10, fontWeight: '400', color: '#9CA3AF' }}>
                        {timeAgo}
                      </Text>
                    </View>

                    {/* Status Badge */}
                    <View
                      style={{
                        backgroundColor: statusColor.bg,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 4,
                        marginLeft: 8,
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: '600', color: statusColor.text, textTransform: 'capitalize' }}>
                        {request.status}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          <Button
            label="Logout"
            variant="danger"
            onPress={onLogout}
            style={{ marginTop: 24, marginBottom: 32 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
