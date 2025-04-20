import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { LocationProvider } from './src/context/LocationContext';
import { ShoppingListProvider } from './src/context/ShoppingListContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from './src/context/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper'; // 👈 Add this

function RootNavigation() {
  const { token, loading } = useAuth();

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
  );
}







