import React from 'react';
import { FlatList, View, ViewStyle, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaScrollViewProps {
  children?: React.ReactNode;
  data?: any[];
  renderItem?: ({ item }: { item: any }) => React.ReactNode;
  ListHeaderComponent?: React.ComponentType<any> | null;
  ListFooterComponent?: React.ComponentType<any> | null;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  backgroundColor?: string;
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
  backgroundColor = '#FFFFFF',
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
            paddingTop: 5,
            paddingBottom: insets.bottom + 16,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
          contentContainerStyle,
        ]}
        style={[{ backgroundColor }, style]}
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
            paddingTop: 5,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            backgroundColor,
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
          backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
