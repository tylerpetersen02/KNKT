import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Button from './Button';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MENU_WIDTH = Dimensions.get('window').width * 0.8;  // 80% screen width

interface MenuItem {
  icon: string;
  label: string;
  onPress: () => void;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export default function SideMenu({ isVisible, onClose, onLogout }: SideMenuProps) {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    onClose();
    setTimeout(() => {
      onLogout();
    }, 300);
  };

  const menuSections: MenuSection[] = [
    {
      items: [
        { icon: 'account-edit', label: 'Profile & Settings', onPress: onClose },
        { icon: 'link-variant', label: 'Platforms', onPress: onClose },
        { icon: 'account-lock', label: 'Account', onPress: onClose },
      ],
    },
    {
      items: [
        { icon: 'history', label: 'History', onPress: onClose },
        { icon: 'cog', label: 'Preferences', onPress: onClose },
      ],
    },
    {
      items: [
        { icon: 'help-circle', label: 'Help & Support', onPress: onClose },
        { icon: 'file-document', label: 'Terms & Conditions', onPress: onClose },
        { icon: 'shield-account', label: 'Privacy Policy', onPress: onClose },
        { icon: 'information', label: 'About KNKT', onPress: onClose },
      ],
    },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ margin: 0, flexDirection: 'row', justifyContent: 'flex-end' }}
    >
      <View
        style={{
          width: MENU_WIDTH,
          height: '100%',
          backgroundColor: '#F9FAFB',
        }}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header with Close Button - Respects Safe Area */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingTop: Math.max(insets.top, 16),
              paddingBottom: 12,
            }}
          >
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MaterialCommunityIcons name="close" size={24} color="#0D1B1E" />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View style={{ paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 }}>
            {/* Avatar + Info Layout */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
              {/* Avatar */}
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#F12838',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  flexShrink: 0,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#FFFFFF' }}>DU</Text>
              </View>

              {/* Text Info */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#0D1B1E', marginBottom: 2 }}>
                  Demo User
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280', marginBottom: 4 }}>
                  @demouser
                </Text>
                <Text style={{ fontSize: 11, fontWeight: '400', color: '#6B7280', lineHeight: 15 }}>
                  Making connections one tap at a time ✨
                </Text>
              </View>
            </View>

            {/* Edit Profile Button */}
            <Button label="Edit Profile" variant="secondary" onPress={onClose} />
          </View>

          {/* Menu Sections */}
          {menuSections.map((section, sectionIdx) => (
            <View
              key={sectionIdx}
              style={{
                paddingVertical: 4,
                marginBottom: 16,
                borderBottomWidth: sectionIdx < menuSections.length - 1 ? 1 : 0,
                borderBottomColor: '#E8E9EB',
              }}
            >
              {section.items.map((item, itemIdx) => (
                <TouchableOpacity
                  key={itemIdx}
                  onPress={item.onPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    gap: 12,
                  }}
                >
                  <MaterialCommunityIcons name={item.icon} size={20} color="#6B7280" />
                  <Text style={{ fontSize: 13, fontWeight: '400', color: '#0D1B1E' }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Logout Button - Respects Safe Area */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          <Button label="Logout" variant="danger" onPress={handleLogout} />
        </View>
      </View>
    </Modal>
  );
}
