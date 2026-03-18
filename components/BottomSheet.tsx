import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function BottomSheet({
  isVisible,
  onClose,
  title,
  children,
  actions,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 500,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, overlayOpacity, sheetTranslateY]);

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: overlayOpacity,
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateY: sheetTranslateY }],
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                marginTop: 100,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
              }}
            >
              <ScrollView
                style={{ flex: 1 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
              >
                {/* Header */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    marginBottom: 16,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#0D1B1E' }}>
                    {title}
                  </Text>
                  <TouchableOpacity onPress={onClose}>
                    <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
                  {children}
                </View>
              </ScrollView>

              {/* Action Buttons */}
              {actions && (
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingBottom: Math.max(insets.bottom, 16),
                    borderTopWidth: 1,
                    borderTopColor: '#E8E9EB',
                    backgroundColor: '#FFFFFF',
                    gap: 8,
                  }}
                >
                  {actions}
                </View>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
