import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LocationProvider, useLocation } from './src/context/LocationContext';
import { ShoppingListProvider } from './src/context/ShoppingListContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { preloadStoresNearUser } from '@/services/LocationService';

function RootNavigation() {
  const { token, loading } = useAuth();
  const { setLocation } = useLocation(); // 👈 Access the global location setter

  useEffect(() => {
    const preload = async () => {
      if (!token) return;

      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        console.warn('📍 Location permission denied');
        return;
      }

      try {
        const coords = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords.coords;

        // ✅ Save location to global context
        setLocation(latitude, longitude);

        // ✅ Preload stores within 25km
        await preloadStoresNearUser(latitude, longitude);
      } catch (err) {
        console.error('❌ Failed to preload stores:', err);
      }
    };

    preload();
  }, [token]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return token ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    VarelaRound: require('./assets/fonts/VarelaRound-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <LocationProvider>
            <ShoppingListProvider>
              <NavigationContainer>
                <RootNavigation />
              </NavigationContainer>
            </ShoppingListProvider>
          </LocationProvider>
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}