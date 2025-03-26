import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsScreen() {
  const { setAuthState } = useAuth();

  const handleLogout = () => {
    setAuthState({ token: null });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>⚙️ Settings Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

