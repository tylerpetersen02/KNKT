import React, { ReactNode } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PageWrapperProps {
  children: ReactNode;
  backgroundColor?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  contentContainerStyle?: any;
  noPadding?: boolean;
}

/**
 * Global page wrapper with keyboard avoidance (good-vibes-cup pattern).
 * Uses KeyboardAwareScrollView to automatically scroll focused inputs above the keyboard
 * with smooth animations synced to the system keyboard.
 *
 * Features:
 * - Automatically scrolls to focused inputs
 * - Smooth keyboard animation syncing
 * - Works on iOS and Android
 * - Dismiss keyboard on background tap
 *
 * Usage:
 * ```tsx
 * <PageWrapper>
 *   <TextInput ... />
 * </PageWrapper>
 * ```
 */
export default function PageWrapper({
  children,
  backgroundColor = '#fff',
  edges = ['left', 'right'],
  contentContainerStyle,
  noPadding = false,
}: PageWrapperProps) {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={edges}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        extraHeight={150}
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        enableAutomaticScroll={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={noPadding ? undefined : styles.innerContainer}>{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});
