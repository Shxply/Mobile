import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@/screens/HomeScreen';
import ListScreen from '@/screens/ListScreen';
import ScanScreen from '@/screens/ScanScreen';
import CompareScreen from '@/screens/CompareScreen';
import SettingsScreen from '@/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'List':
              iconName = 'list';
              break;
            case 'Scan':
              iconName = 'camera';
              break;
            case 'Compare':
              iconName = 'swap-horizontal';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Compare" component={CompareScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}



