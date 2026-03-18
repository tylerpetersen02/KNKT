import React, { useRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Text,
} from 'react-native';

interface CenteredInputProps extends TextInputProps {
  containerStyle?: any;
  label?: string;
}

/**
 * TextInput that works with KeyboardAwareScrollView to automatically
 * scroll to center position when focused. No manual repositioning needed.
 *
 * Usage:
 * ```tsx
 * <CenteredInput
 *   label="Email"
 *   placeholder="you@example.com"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 * ```
 */
export function CenteredInput({
  containerStyle,
  label,
  ...textInputProps
}: CenteredInputProps) {
  const textInputRef = useRef<RNTextInput>(null);

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={{ fontSize: 12, fontWeight: '400', color: '#0D1B1E', marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <RNTextInput
        ref={textInputRef}
        {...textInputProps}
        style={[
          {
            height: 48,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E8E9EB',
            paddingHorizontal: 12,
            paddingVertical: 12,
            backgroundColor: '#fff',
            color: '#0D1B1E',
            fontSize: 16, // CRITICAL: 16px minimum for iOS smooth behavior
          },
          textInputProps.style,
        ]}
      />
    </View>
  );
}
