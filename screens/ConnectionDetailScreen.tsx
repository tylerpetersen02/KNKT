import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaScrollView } from '../components/SafeAreaScrollView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockConnections } from '../data/mockConnections';
import { PLATFORM_ICONS } from '../utils/platformIcons';
import { openPlatformProfile } from '../utils/platformLinks';
import { PlatformIcon } from '../components/PlatformIcon';
import { useSwipeBack } from '../hooks/useSwipeBack';

export default function ConnectionDetailScreen({ route, navigation }: any) {
  const { connectionId } = route.params;
  const selectedConnection = mockConnections.find((c) => c.id === connectionId);

  const detailSwipeHandlers = useSwipeBack({
    onSwipeBack: () => navigation.goBack(),
  });

  if (!selectedConnection) {
    return (
      <SafeAreaScrollView>
        <Text>Connection not found</Text>
      </SafeAreaScrollView>
    );
  }

  return (
    <SafeAreaScrollView scrollable {...detailSwipeHandlers}>
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 16 }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#F12838' }}>
            ← Back to Connections
          </Text>
        </TouchableOpacity>

        {/* Connection Details */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#E8E9EB',
            alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#F12838',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: '600', color: '#FFFFFF' }}>
              {selectedConnection.avatarInitials}
            </Text>
          </View>

          {/* Name */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              color: '#0D1B1E',
              marginBottom: 4,
            }}
          >
            {selectedConnection.name}
          </Text>

          {/* Username */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#6B7280',
              marginBottom: 12,
            }}
          >
            @{selectedConnection.username}
          </Text>

          {/* Bio */}
          {selectedConnection.bio && (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#393E41',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {selectedConnection.bio}
            </Text>
          )}

          {/* Note */}
          {selectedConnection.note && (
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#6B7280',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              "{selectedConnection.note}"
            </Text>
          )}
        </View>

        {/* Shared Platforms */}
        {selectedConnection.sharedPlatforms.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#0D1B1E',
                marginBottom: 12,
              }}
            >
              Shared Platforms
            </Text>
            {selectedConnection.sharedPlatforms.map((platform, idx) => {
              const platformInfo = PLATFORM_ICONS[platform.type];
              const isPhone = platform.type === 'phone';
              const isEmail = platform.type === 'email';
              const buttonLabel = isPhone ? 'Add' : isEmail ? 'Email' : 'Open';

              return (
                <View
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: '#E8E9EB',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {/* Platform Icon */}
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: platformInfo.color,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 12,
                    }}
                  >
                    <PlatformIcon platform={platform.type} size={20} />
                  </View>

                  {/* Platform Info */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#0D1B1E',
                        marginBottom: 2,
                      }}
                    >
                      {platformInfo.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#6B7280',
                      }}
                    >
                      {platform.handle}
                    </Text>
                  </View>

                  {/* Action Button */}
                  <TouchableOpacity
                    onPress={() => openPlatformProfile(platform.type, platform.handle, selectedConnection.name)}
                    style={{
                      backgroundColor: '#0D1B1E',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 6,
                      minWidth: 70,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#FFFFFF',
                      }}
                    >
                      {buttonLabel}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            </View>
        )}

        {/* Available Platforms */}
        {selectedConnection.availablePlatforms.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#0D1B1E',
                marginBottom: 12,
              }}
            >
              Available Platforms
            </Text>
            {selectedConnection.availablePlatforms.map((platformId, idx) => {
              const platformInfo = PLATFORM_ICONS[platformId as any];
              if (!platformInfo) return null;
              return (
                <View
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: '#E8E9EB',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {/* Platform Icon */}
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: platformInfo.color,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 12,
                    }}
                  >
                    <PlatformIcon platform={platformId as any} size={20} />
                  </View>

                  {/* Platform Info */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#0D1B1E',
                        marginBottom: 2,
                      }}
                    >
                      {platformInfo.label}
                    </Text>
                  </View>

                  {/* Request Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#0D1B1E',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 6,
                      minWidth: 70,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#FFFFFF',
                      }}
                    >
                      Request
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            </View>
        )}
      </View>
    </SafeAreaScrollView>
  );
}
