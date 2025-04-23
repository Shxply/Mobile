import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/api';
import { Store } from '@/types/Store';

export const preloadStoresNearUser = async (
    latitude: number,
    longitude: number
  ): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.warn('⚠️ No token found while preloading stores.');
        return false;
      }
  
      await axios.post(
        `${API_BASE_URL}/api/stores`,
        {},
        {
          params: { latitude, longitude },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return true;
    } catch (error) {
      console.error('❌ Failed to preload nearby stores:', error);
      return false;
    }
  };
  