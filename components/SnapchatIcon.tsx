import React from 'react';
import { Image, View } from 'react-native';

export function SnapchatIcon({ size = 20 }: { size?: number }) {
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
        source={require('../assets/snapchat-logo.png')}
        style={{
          width: size * 1.1,
          height: size * 1.1,
          transform: [{ scale: 1.1 }],
        }}
        resizeMode="cover"
      />
    </View>
  );
}
