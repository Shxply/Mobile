import React, { useLayoutEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/images/shoply-text.png')}
          style={{ width: 100, height: 20 }}
          resizeMode="contain"
        />
      ),
    });
  }, [navigation]);

  return null;
}

