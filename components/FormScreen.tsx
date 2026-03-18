import React, { useState } from 'react';
import {
  FlatList,
  View,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CONTENT_PADDING } from '../utils/spacing';

interface FormFieldConfig {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  maxLength?: number;
  error?: string;
}

interface FormScreenProps {
  title: string;
  subtitle?: string;
  fields: FormFieldConfig[];
  onSubmit: () => Promise<void>;
  submitButtonText: string;
  isLoading?: boolean;
  footerText?: React.ReactNode;
}

export const FormScreen: React.FC<FormScreenProps> = ({
  title,
  subtitle,
  fields,
  onSubmit,
  submitButtonText,
  isLoading = false,
  footerText,
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSubmit = async () => {
    setLocalLoading(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  const loading = isLoading || localLoading;

  // Add spacer at top to center content vertically
  const dataWithSpacer = [{ id: '__spacer__', isSpacer: true }, ...fields];

  return (
    <FlatList
      data={dataWithSpacer}
      renderItem={({ item }: { item: any }) => {
        // Render spacer that takes up vertical space
        if (item.isSpacer) {
          return <View style={{ flex: 1, minHeight: 60 }} />;
        }
        return (
          <View style={{ marginBottom: CONTENT_PADDING.vertical, paddingHorizontal: CONTENT_PADDING.horizontal }}>
            {/* Label */}
            <Text
              style={{
                marginBottom: 8,
                fontSize: 12,
                fontWeight: '400',
                color: '#0D1B1E',
              }}
            >
              {item.label}
            </Text>

            {/* Input */}
            <TextInput
              value={item.value}
              onChangeText={item.onChange}
              placeholder={item.placeholder}
              placeholderTextColor="#6B7280"
              secureTextEntry={item.secureTextEntry}
              keyboardType={item.keyboardType || 'default'}
              maxLength={item.maxLength}
              editable={!loading}
              style={{
                borderWidth: 1,
                borderColor: item.error ? '#EF4444' : '#E8E9EB',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                color: '#0D1B1E',
                backgroundColor: '#FFFFFF',
              }}
              returnKeyType="next"
              blurOnSubmit={false}
            />

            {/* Error message */}
            {item.error && (
              <Text
                style={{
                  color: '#EF4444',
                  marginTop: 4,
                  fontSize: 12,
                }}
              >
                {item.error}
              </Text>
            )}
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      ListHeaderComponent={() => (
        <View style={{ marginBottom: CONTENT_PADDING.section, paddingHorizontal: CONTENT_PADDING.horizontal }}>
          <Text style={{ fontSize: 28, fontWeight: '600', color: '#F12838', marginBottom: 12 }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#393E41' }}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      ListFooterComponent={() => (
        <View style={{ paddingVertical: CONTENT_PADDING.section, paddingHorizontal: CONTENT_PADDING.horizontal }}>
          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#6B7280' : '#0D1B1E',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF' }}>
                {submitButtonText}
              </Text>
            )}
          </Pressable>

          {/* Footer text (e.g., "Don't have an account? Sign up") */}
          {footerText && (
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              {footerText}
            </View>
          )}

          {/* Bottom spacing for keyboard */}
          <View style={{ height: 300 }} />
        </View>
      )}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      bounces={false}
    />
  );
};
