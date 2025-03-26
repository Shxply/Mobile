import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginApi, signup as signupApi } from '@/services/authService';
import { setAuthToken } from '@/services/api';

export type AuthContextType = {
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  setAuthState: (auth: { token: string | null }) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
      }
      setLoading(false);
    };

    loadToken();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { token } = await loginApi(email, password);
    setToken(token);
    setAuthToken(token);
    await AsyncStorage.setItem('userToken', token);
  };

  const signUp = async (name: string, email: string, password: string) => {
    await signupApi(name, email, password);
    await signIn(email, password);
  };

  const signOut = async () => {
    setToken(null);
    setAuthToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  const setAuthState = ({ token }: { token: string | null }) => {
    setToken(token);
    if (token) {
      setAuthToken(token);
      AsyncStorage.setItem('userToken', token);
    } else {
      setAuthToken(null);
      AsyncStorage.removeItem('userToken');
    }
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signUp, signOut, loading, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


