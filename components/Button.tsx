import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'primaryOutline' | 'secondaryOutline';

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
}

const BUTTON_STYLES: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary: {
    bg: '#0D1B1E',
    text: '#FFFFFF',
    border: '#0D1B1E',
  },
  secondary: {
    bg: '#E8E9EB',
    text: '#0D1B1E',
    border: '#E8E9EB',
  },
  danger: {
    bg: '#EF4444',
    text: '#FFFFFF',
    border: '#EF4444',
  },
  primaryOutline: {
    bg: '#FFFFFF',
    text: '#0D1B1E',
    border: '#0D1B1E',
  },
  secondaryOutline: {
    bg: '#FFFFFF',
    text: '#0D1B1E',
    border: '#E8E9EB',
  },
};

// Standard button dimensions - applies to ALL buttons
const BUTTON_HEIGHT = 40;
const BUTTON_PADDING_HORIZONTAL = 16;
const BUTTON_PADDING_VERTICAL = 10;
const BUTTON_FONT_SIZE = 13;
const BUTTON_BORDER_RADIUS = 8;

export default function Button({
  onPress,
  label,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  const colors = BUTTON_STYLES[variant];
  const isOutline = variant.includes('Outline');

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        {
          height: BUTTON_HEIGHT,
          paddingVertical: BUTTON_PADDING_VERTICAL,
          paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
          borderRadius: BUTTON_BORDER_RADIUS,
          backgroundColor: colors.bg,
          borderWidth: isOutline ? 1 : 0,
          borderColor: colors.border,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: BUTTON_FONT_SIZE,
          fontWeight: '600',
          color: colors.text,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
