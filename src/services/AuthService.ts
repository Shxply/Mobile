// services/AuthService.ts
import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
  return { token: response.data as string };
};

export const signup = async (name: string, email: string, password: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
};



