import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from './components/SafeAreaView';
import ConnectionsScreen from './screens/ConnectionsScreen';
import RequestsScreen from './screens/RequestsScreen';
import AccountsScreen from './screens/AccountsScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import SideMenu from './components/SideMenu';
import { mockReceivedRequests } from './data/mockRequests';

const Tab = createBottomTabNavigator();


// TABS NAVIGATOR
function TabsNavigator({ onLogout }: any) {
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#E8E9EB',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#0D1B1E',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={{ paddingRight: 16, padding: 8 }}
          >
            <Feather name="menu" size={24} color="#0D1B1E" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#F12838',
        tabBarInactiveTintColor: '#6B7280',
        tabBarBadgeBackground: '#0D1B1E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E8E9EB',
          borderTopWidth: 1,
          paddingBottom: insets.bottom,
          height: 56 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{
          headerTitle: 'Connections',
          tabBarLabel: 'Connections',
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          headerTitle: 'Requests',
          tabBarLabel: 'Requests',
          tabBarBadge: mockReceivedRequests.filter(r => r.status === 'pending').length || undefined,
          tabBarIcon: ({ color }) => <Feather name="mail" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          headerTitle: 'My Accounts',
          tabBarLabel: 'Accounts',
          tabBarIcon: ({ color }) => <Feather name="layers" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>

    <SideMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} onLogout={onLogout} />
    </>
  );
}

// MAIN APP
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isLoggedIn ? (
          <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
          <TabsNavigator onLogout={() => setIsLoggedIn(false)} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
