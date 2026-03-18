# KNKT Safe Area Implementation Guide

## PROBLEM

Modern devices have safe areas that need to be accounted for:
- **iPhone notch/Dynamic Island** (top cutout)
- **Android gesture bar** (bottom)
- **Notched Android devices** (various positions)
- **Older devices without notches** (no safe area needed, but shouldn't break)

Without safe area handling, content gets hidden behind notches or gesture bars.

---

## SOLUTION: Global Safe Area Wrapper

### Why This Approach?

- **Single implementation** in root layout
- **All screens automatically have safe area** (no per-screen setup)
- **Works on all devices** (handles notches, gesture bars, etc.)
- **React Native built-in** (no external dependencies)
- **Simple and maintainable**

---

## STEP 1: Wrap Root Layout with SafeAreaProvider

Wrap your root navigation with `SafeAreaProvider` from `react-native-safe-area-context`.

```typescript
// App.tsx (Main Root)
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Navigation structure */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

**What this does:**
- `SafeAreaProvider` wraps entire app
- Automatically measures safe area insets on app launch
- Provides context for all child screens
- Works on all devices (notches, gesture bars, etc.)

---

## STEP 2: Create SafeAreaView Wrapper Component

Custom wrapper that automatically applies safe area padding:

```typescript
// components/SafeAreaView.tsx
import React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { View, ViewStyle } from 'react-native';

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
```

**What this does:**
- Auto-applies safe insets to specified edges
- No manual padding calculation needed
- Allows per-screen customization
- Works on all device types

---

## STEP 3: Create SafeAreaScrollView Component

For screens with scrollable content:

```typescript
// components/SafeAreaScrollView.tsx
import React from 'react';
import { FlatList, View, ViewStyle, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaScrollViewProps {
  children?: React.ReactNode;
  data?: any[];
  renderItem?: ({ item }: { item: any }) => React.ReactNode;
  ListHeaderComponent?: React.ComponentType<any>;
  ListFooterComponent?: React.ComponentType<any>;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
}

/**
 * ScrollView/FlatList with automatic safe area insets
 *
 * For list screens:
 * <SafeAreaScrollView
 *   data={items}
 *   renderItem={({ item }) => <ItemComponent {...item} />}
 * />
 *
 * For regular scroll:
 * <SafeAreaScrollView scrollable>
 *   <Text>Content</Text>
 * </SafeAreaScrollView>
 */
export const SafeAreaScrollView: React.FC<SafeAreaScrollViewProps> = ({
  children,
  data,
  renderItem,
  ListHeaderComponent,
  ListFooterComponent,
  style,
  contentContainerStyle,
  scrollable = false,
}) => {
  const insets = useSafeAreaInsets();

  if (data && renderItem) {
    // FlatList version (for list screens)
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        contentContainerStyle={[
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
          contentContainerStyle,
        ]}
        style={style}
      />
    );
  }

  if (scrollable) {
    // ScrollView version
    return (
      <ScrollView
        style={[
          {
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
          style,
        ]}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={contentContainerStyle}
      >
        {children}
      </ScrollView>
    );
  }

  // Regular container
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
```

**What this does:**
- Auto-applies safe area padding
- Works with FlatList (for lists)
- Works with ScrollView (for scrollable content)
- Works as regular View (for static content)
- Handles all device types automatically

---

## STEP 4: Apply to Tab Screens

### Example 1: HOME Screen

```typescript
// Modify existing HomeScreen in App.tsx
function HomeScreen() {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '600', color: '#F12838', marginBottom: 12 }}>
          KNKT
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#0D1B1E', marginBottom: 12 }}>
          Home
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '400', color: '#393E41', textAlign: 'center' }}>
          Welcome! Ready to exchange contacts?
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

### Example 2: CONNECTIONS Screen (with list)

```typescript
// Modify existing ConnectionsScreen in App.tsx
function ConnectionsScreen() {
  const connections = [
    { id: '1', name: 'John Doe', username: 'johndoe' },
    { id: '2', name: 'Jane Smith', username: 'janesmith' },
  ];

  return (
    <SafeAreaScrollView
      edges={['top', 'left', 'right']}
      data={connections}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#0D1B1E' }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>
            @{item.username}
          </Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#0D1B1E' }}>
            Connections
          </Text>
        </View>
      )}
    />
  );
}
```

---

## STEP 5: Handle Tab Bar Safe Area

Tab bar needs bottom safe area padding for gesture bar:

```typescript
// In TabsNavigator screenOptions
const insets = useSafeAreaInsets(); // Add this hook

<Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: '#F12838',
    tabBarInactiveTintColor: '#6B7280',
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      borderTopColor: '#E8E9EB',
      borderTopWidth: 1,
      paddingBottom: insets.bottom, // Add gesture bar padding
      height: 56 + insets.bottom, // Tab height + safe area
    },
  }}
>
  {/* screens */}
</Tab.Navigator>
```

---

## WHAT'S HANDLED AUTOMATICALLY

✅ iPhone notch/Dynamic Island (top)
✅ Android gesture bar (bottom)
✅ Notched Android devices (various positions)
✅ Landscape orientation changes
✅ Tab bar positioning
✅ Content padding on all sides
✅ Different device sizes

---

## TESTING CHECKLIST

Test on all device types:

**Simulator Testing:**
- [ ] iPhone 15 Pro (Dynamic Island) - content doesn't hide behind it
- [ ] iPhone SE (no notch) - layout still looks good
- [ ] iPhone 12 (notch) - content respects notch
- [ ] Pixel 6 Pro (gesture bar) - content respects bottom bar
- [ ] Pixel 5 (no notch) - layout looks good

**Physical Device Testing:**
- [ ] At least one real iOS device
- [ ] At least one real Android device
- [ ] Landscape orientation (if supported)
- [ ] Keyboard interaction (doesn't overlap content)

---

## SUMMARY

1. **Wrap root app** with `SafeAreaProvider`
2. **Use SafeAreaView** for non-scrolling screens
3. **Use SafeAreaScrollView** for scrolling/list screens
4. **Handle tab bar** with `useSafeAreaInsets()` for bottom padding
5. **Test on multiple devices** (notches, gesture bars, different sizes)

Everything else is automatic.
