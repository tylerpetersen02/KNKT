# KNKT Keyboard Handling Implementation Guide

## PROBLEM

On mobile, when a user taps a text input and the keyboard appears, it often covers the input field they're trying to type in. This is a critical UX issue.

**Production apps solve this by:**
1. Automatically scrolling the focused input into view above the keyboard
2. Adding bottom padding so inputs aren't hidden
3. Allowing smooth interaction while keyboard is open

---

## SOLUTION: FlatList Approach (Production Standard)

### Why FlatList?

- **React Native official recommendation** (per Expo docs)
- **Automatic keyboard avoidance** built-in
- **Works on both iOS & Android** without platform-specific code
- **Smooth scrolling animations** when keyboard appears
- **Memory efficient** (even with 100+ form fields)
- **Used by major apps:** Instagram, Discord, Stripe, etc.

### Core Pattern

```typescript
// Example: Login Form with FlatList
import React, { useState } from 'react';
import {
  FlatList,
  View,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formFields = [
    {
      id: 'email',
      label: 'Email',
      placeholder: 'your@email.com',
      value: email,
      onChange: setEmail,
      keyboardType: 'email-address',
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: '••••••••',
      value: password,
      onChange: setPassword,
      secureTextEntry: true,
    },
  ];

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Call auth service
      await loginUser(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FlatList
      // CRITICAL: Use FlatList instead of ScrollView for forms
      data={formFields}

      // Render each form field
      renderItem={({ item }) => (
        <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
          {/* Label */}
          <Text
            style={{
              marginBottom: 8,
              fontSize: 14,
              fontWeight: '600',
              color: '#0D1B1E',
            }}
          >
            {item.label}
          </Text>

          {/* Input Field */}
          <TextInput
            value={item.value}
            onChangeText={item.onChange}
            placeholder={item.placeholder}
            placeholderTextColor="#6B7280"
            secureTextEntry={item.secureTextEntry}
            keyboardType={item.keyboardType || 'default'}
            // CRITICAL: 16px font size for iOS smooth behavior
            style={{
              borderWidth: 1,
              borderColor: '#E8E9EB',
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              color: '#0D1B1E',
              backgroundColor: '#FFFFFF',
            }}
            // CRITICAL: Enable return key
            returnKeyType={item.id === 'password' ? 'done' : 'next'}
            blurOnSubmit={item.id === 'password'}
          />
        </View>
      )}

      // List configuration
      keyExtractor={(item) => item.id}
      scrollEnabled={true}

      // CRITICAL: Prevents keyboard from dismissing on taps
      keyboardShouldPersistTaps="handled"

      // CRITICAL: Smooth scrolling when keyboard appears
      scrollEventThrottle={16}

      // CRITICAL: Bottom padding to prevent keyboard from covering inputs
      ListFooterComponent={() => (
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#6B7280' : '#F12838',
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>
                Sign In
              </Text>
            )}
          </Pressable>
          {/* Keyboard spacing */}
          <View style={{ height: 300 }} />
        </View>
      )}

      // CRITICAL: Allow content to grow if less than screen height
      contentContainerStyle={{ flexGrow: 1 }}

      // Top padding
      ListHeaderComponent={() => (
        <View style={{ paddingTop: 24, paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 28, fontWeight: '600', color: '#F12838' }}>
            Sign In
          </Text>
        </View>
      )}

      // Safe area on Android
      bounces={false}
    />
  );
};
```

---

## CRITICAL PROPS EXPLAINED

### `keyboardShouldPersistTaps="handled"`

**What it does:** Prevents keyboard from dismissing when user taps on interactive elements (buttons, inputs).

**Why it's critical:** Without this, tapping submit button dismisses keyboard instead of submitting form.

**Options:**
- `"handled"` ← Use this for forms
- `"always"` ← Keyboard never dismisses (usually wrong)
- `"never"` ← Keyboard always dismisses on tap (usually wrong)

---

### `ListFooterComponent={() => <View style={{ height: 300 }} />}`

**What it does:** Adds 300px of empty space at bottom of list.

**Why it's critical:** Keyboard on mobile is ~250-300px tall. Without this, last input field gets hidden behind keyboard. With this, FlatList auto-scrolls so input stays visible.

**Height value:** Adjust based on your keyboard height:
- iOS: ~260px in portrait, ~170px in landscape
- Android: ~250px in portrait, ~0px in landscape (system handles it)
- Safe default: 300px (covers both)

---

### `contentContainerStyle={{ flexGrow: 1 }}`

**What it does:** Makes content grow to fill available space (prevents keyboard from pushing content up).

**Why it's critical:** On short forms, content might not scroll. This ensures even short forms can scroll if needed.

---

### `scrollEventThrottle={16}`

**What it does:** Limits scroll event frequency to ~60fps (every 16ms).

**Why it matters:** Prevents performance issues from excessive re-renders during keyboard animation.

---

## COMPLETE FORM PATTERN (Copy This)

Use this exact pattern for all forms: login, signup, profile edit, add platform.

```typescript
// components/FormScreen.tsx
import React, { useState } from 'react';
import {
  FlatList,
  View,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';

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
  fields: FormFieldConfig[];
  onSubmit: () => Promise<void>;
  submitButtonText: string;
  isLoading?: boolean;
}

export const FormScreen: React.FC<FormScreenProps> = ({
  title,
  fields,
  onSubmit,
  submitButtonText,
  isLoading = false,
}) => {
  const [localLoading, setLocalLoading] = useState(false);

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

  return (
    <FlatList
      data={fields}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
          {/* Label */}
          <Text style={{ fontWeight: '600', marginBottom: 8, fontSize: 14, color: '#0D1B1E' }}>
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
      )}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
      ListHeaderComponent={() => (
        <View style={{ paddingTop: 24, paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 28, fontWeight: '600', color: '#F12838' }}>
            {title}
          </Text>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#6B7280' : '#F12838',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
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

          {/* Bottom spacing for keyboard */}
          <View style={{ height: 300 }} />
        </View>
      )}
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
    />
  );
};
```

---

## USAGE EXAMPLE (Login Screen)

```typescript
// App.tsx - LoginScreen
import React, { useState } from 'react';
import { FormScreen } from './components/FormScreen';

function LoginScreen({ onLoginSuccess }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fields = [
    {
      id: 'email',
      label: 'Email',
      placeholder: 'you@example.com',
      value: email,
      onChange: setEmail,
      keyboardType: 'email-address' as const,
      error: error ? 'Invalid email or password' : undefined,
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: '••••••••',
      value: password,
      onChange: setPassword,
      secureTextEntry: true,
      error: error ? 'Invalid email or password' : undefined,
    },
  ];

  const handleSubmit = async () => {
    try {
      setError('');
      setIsLoading(true);
      // Validate
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      // Call auth
      await loginUser(email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormScreen
      title="Login"
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Sign In"
      isLoading={isLoading}
    />
  );
}
```

---

## IMPORTANT: What NOT To Do

### ❌ DON'T Use ScrollView for Forms

```typescript
// WRONG
<ScrollView keyboardDismissMode="on-drag">
  <TextInput />
  <TextInput />
  <Button />
</ScrollView>
```

**Why:** Inconsistent behavior, doesn't auto-scroll to focused input, requires manual height calculation.

### ❌ DON'T Use KeyboardAwareScrollView

```typescript
// WRONG
<KeyboardAwareScrollView extraHeight={150}>
  <TextInput />
  <TextInput />
  <Button />
</KeyboardAwareScrollView>
```

**Why:** Third-party library, not as reliable as native FlatList, inconsistent on Android.

### ❌ DON'T Use KeyboardAvoidingView

```typescript
// WRONG
<KeyboardAvoidingView behavior="padding">
  <ScrollView>
    <TextInput />
  </ScrollView>
</KeyboardAvoidingView>
```

**Why:** Breaks on Android, conflicts with navigation, causes jank.

### ❌ DON'T Manually Calculate Keyboard Height

```typescript
// WRONG - Don't do this
const [keyboardHeight, setKeyboardHeight] = useState(0);
useEffect(() => {
  const subscription = Keyboard.addListener('keyboardDidShow', (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  });
  return () => subscription.remove();
}, []);
```

**Why:** Unnecessary complexity. FlatList handles it automatically.

---

## APPLY TO ALL FORM SCREENS

Use the FormScreen component pattern for:

1. **Login** (current screen)
2. **Signup** (new screen)
3. **Edit Profile** (new screen)
4. **Add Platform** (new screen)
5. **Search** (enhance current search tab)

All use the same pattern.

---

## KEYBOARD TYPES (Use Correct One)

```typescript
// Email input
keyboardType="email-address"

// Phone input
keyboardType="phone-pad"

// Numbers only
keyboardType="numeric"

// Numbers + decimal
keyboardType="decimal-pad"

// Default (letters + numbers)
keyboardType="default"
```

---

## PLATFORM-SPECIFIC BEHAVIOR (FYI)

FlatList handles these automatically. You don't need to do anything:

**iOS:**
- Keyboard slides up smoothly
- System handles safe area
- ListFooterComponent spacing works perfectly

**Android:**
- Keyboard appears (may push content up)
- FlatList auto-adjusts scroll position
- ListFooterComponent ensures bottom spacing

---

## TESTING CHECKLIST

For each form screen:

- [ ] Tap first input → keyboard appears, input stays visible
- [ ] Type something → keyboard doesn't dismiss
- [ ] Tap next input → auto-scrolls to show it
- [ ] Tap submit button → form submits (keyboard doesn't dismiss)
- [ ] Keyboard dismisses → form resets properly
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on actual devices (different keyboard heights)

---

## REFERENCES

**Official Documentation:**
- React Native FlatList: https://reactnative.dev/docs/flatlist
- React Native Keyboard: https://reactnative.dev/docs/keyboard
- Expo Keyboard Handling: https://docs.expo.dev/guides/keyboard/

**Best Practices:**
- Always use FlatList for forms (not ScrollView)
- Always set `keyboardShouldPersistTaps="handled"` on list
- Always include `ListFooterComponent` with bottom spacing (300px)
- Always set `contentContainerStyle={{ flexGrow: 1 }}`

---

## SUMMARY

**Use the `FormScreen` component pattern above.**

**Apply it to all forms in the app.**

**That's it.**

FlatList handles keyboard behavior automatically. You don't need custom hooks, useEffect listeners, or platform-specific code. Just follow the pattern.
