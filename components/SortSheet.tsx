import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import type { SortPreference } from '../hooks/useSortPreference';

interface SortSheetProps {
  isVisible: boolean;
  currentSort: SortPreference;
  onSortChange: (sort: SortPreference) => void;
  onClose: () => void;
}

const SORT_OPTIONS: { value: SortPreference; label: string; icon: string }[] = [
  { value: 'a-z', label: 'A-Z', icon: 'sort-alphabetical-ascending' },
  { value: 'z-a', label: 'Z-A', icon: 'sort-alphabetical-descending' },
  { value: 'recent', label: 'Most Recent', icon: 'clock-outline' },
  { value: 'oldest', label: 'Oldest', icon: 'history' },
];

export default function SortSheet({ isVisible, currentSort, onSortChange, onClose }: SortSheetProps) {
  const handleSortSelect = (sort: SortPreference) => {
    onSortChange(sort);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
      >
        {/* Handle bar */}
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#D1D5DB',
            }}
          />
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#0D1B1E',
            marginBottom: 16,
          }}
        >
          Sort Connections
        </Text>

        {/* Sort options */}
        <View style={{ gap: 8 }}>
          {SORT_OPTIONS.map((option) => {
            const isActive = option.value === currentSort;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSortSelect(option.value)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  backgroundColor: isActive ? '#F3F4F6' : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: isActive ? '#0D1B1E' : '#E8E9EB',
                }}
              >
                <MaterialCommunityIcons
                  name={option.icon}
                  size={20}
                  color={isActive ? '#F12838' : '#6B7280'}
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? '600' : '400',
                    color: '#0D1B1E',
                    flex: 1,
                  }}
                >
                  {option.label}
                </Text>
                {isActive && (
                  <MaterialCommunityIcons name="check" size={20} color="#F12838" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}
