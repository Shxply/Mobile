import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import styles from '@/styles/LoginScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { signUp } = useAuth();
  const navigation = useNavigation<any>();

  const handleSignup = async () => {
    try {
      setError('');

      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      console.log('Creating account for:', name, email);
      await signUp(name, email, password); // ✅ context handles token + nav

      // Optional: Add a success message or animation here

    } catch (e: any) {
      console.error('Signup error:', e);
      if (e?.response?.data?.message?.includes('Email already exists')) {
        setError('That email is already registered.');
      } else {
        setError('Signup failed. Please try again.');
      }
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#aaa"
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>
          Already have an account?{' '}
          <Text style={styles.linkBold}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
