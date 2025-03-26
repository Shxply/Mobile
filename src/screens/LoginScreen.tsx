import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Linking } from 'react-native';
import styles from '@/styles/LoginScreenStyles';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    try {
      setError('');
      await signIn(email, password);
    } catch (e: any) {
      console.error('Login error:', e);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/shoply-text.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>
          Don’t have an account?{' '}
          <Text style={styles.linkBold}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}




