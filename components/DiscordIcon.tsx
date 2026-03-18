import React from 'react';
import { Image, View } from 'react-native';

export function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../assets/discord-logo.png')}
        style={{
          width: size * 1.3,
          height: size * 1.3,
          transform: [{ scale: 1.3 }],
        }}
        resizeMode="cover"
      />
    </View>
  );
}
