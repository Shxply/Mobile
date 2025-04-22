const jwtDecode = require('jwt-decode').default;
import { JwtPayload } from '@/types/JwtPayload';

export const getUserIdFromToken = (token: string | null): string | null => {
  if (!token || typeof token !== 'string') return null;

  try {
    const decoded = jwtDecode(token) as JwtPayload;
    return decoded.userId || decoded.sub || null;
  } catch (error) {
    console.error('❌ Failed to decode JWT:', error);
    return null;
  }
};




