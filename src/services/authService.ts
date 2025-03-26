import api, { setAuthToken } from './api';

export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await api.post('/api/auth/login', null, {
    params: { email, password },
  });
  const token = response.data as string;
  setAuthToken(token);
  return { token };
};

export const signup = async (name: string, email: string, password: string): Promise<void> => {
  await api.post('/api/auth/register', null, {
    params: { name, email, password },
  });
};