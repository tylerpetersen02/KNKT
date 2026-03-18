import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  onDismiss: () => void;
}

export default function Toast({ message, type, visible, onDismiss }: ToastProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onDismiss();
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, opacity, onDismiss]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      case 'info':
        return 'information';
      default:
        return 'check-circle';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return { bg: '#DCFCE7', text: '#166534', icon: '#10B981' };
      case 'error':
        return { bg: '#FEE2E2', text: '#991B1B', icon: '#EF4444' };
      case 'info':
        return { bg: '#DBEAFE', text: '#1E40AF', icon: '#3B82F6' };
      default:
        return { bg: '#DCFCE7', text: '#166534', icon: '#10B981' };
    }
  };

  const colors = getColors();

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 40,
        left: 16,
        right: 16,
        opacity,
      }}
    >
      <View
        style={{
          backgroundColor: colors.bg,
          borderRadius: 8,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <MaterialCommunityIcons name={getIcon()} size={20} color={colors.icon} />
        <Text style={{ fontSize: 13, fontWeight: '500', color: colors.text, flex: 1 }}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
