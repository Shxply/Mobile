import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreenStyles from '../styles/SettingsScreenStyles';

export default function SettingsScreen() {
  const { setAuthState } = useAuth();

  const handleLogout = () => {
    setAuthState({ token: null });
  };

  return (
    <View style={SettingsScreenStyles.container}>
      <View style={SettingsScreenStyles.card}>
        <Ionicons
          name="settings-outline"
          size={32}
          color="#333"
          style={SettingsScreenStyles.icon}
        />
        <Text style={SettingsScreenStyles.title}>Settings</Text>

        <TouchableOpacity
          onPress={handleLogout}
          style={SettingsScreenStyles.logoutButton}
          activeOpacity={0.8}
        >
          <Ionicons
            name="log-out-outline"
            size={18}
            color="#fff"
            style={SettingsScreenStyles.logoutIcon}
          />
          <Text style={SettingsScreenStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



