import React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
} from 'react-native-safe-area-context';
import { ViewStyle } from 'react-native';

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  backgroundColor?: string;
}

/**
 * Custom SafeAreaView that handles notches, gesture bars, etc.
 * Automatically applies safe area padding to all edges.
 *
 * Usage:
 * <SafeAreaView>
 *   <Text>Content</Text>
 * </SafeAreaView>
 */
export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
  edges = ['top', 'bottom'],
  backgroundColor = '#FFFFFF',
}) => {
  return (
    <RNSafeAreaView
      edges={edges}
      style={[
        {
          flex: 1,
          backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </RNSafeAreaView>
  );
};
