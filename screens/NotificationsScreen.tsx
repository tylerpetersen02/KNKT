import { View, Text } from 'react-native';

export default function NotificationsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '600', color: '#0D1B1E', marginBottom: 12 }}>
        Notifications
      </Text>
      <Text style={{ fontSize: 14, fontWeight: '400', color: '#393E41' }}>Coming soon...</Text>
    </View>
  );
}
