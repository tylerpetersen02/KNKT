import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from '../components/SafeAreaView';
import { mockConnections } from '../data/mockConnections';

interface ConnectionDetailScreenProps {
  route: any;
  navigation: any;
}

export default function ConnectionDetailScreen({
  route,
  navigation,
}: ConnectionDetailScreenProps) {
  const { connectionId } = route.params;
  const connection = mockConnections.find((c) => c.id === connectionId);

  if (!connection) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} backgroundColor="#E8E9EB">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#0D1B1E' }}>Connection not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} backgroundColor="#E8E9EB">
      <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 24 }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#F12838' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: '600', color: '#0D1B1E', marginBottom: 8 }}>
          {connection.name}
        </Text>
        <Text style={{ fontSize: 14, color: '#6B7280' }}>
          @{connection.username}
        </Text>
      </View>
    </SafeAreaView>
  );
}
