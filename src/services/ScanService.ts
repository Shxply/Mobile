import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/api';
import { Store } from '@/types/Store';


export const trackBarcodeScan = async (
  userId: string,
  storeId: string,
  productId: string,
  scannedPrice: number
): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found for barcode scan tracking');
      return false;
    }

    await axios.post(
      `${API_BASE_URL}/api/barcode-scans/track`,
      { userId, storeId, productId, scannedPrice },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return true;
  } catch (error) {
    console.error('❌ Failed to track barcode scan:', error);
    return false;
  }
};

// 📍 Fetch nearby stores based on geolocation
export const fetchNearbyStores = async (
  latitude: number,
  longitude: number
): Promise<Store[] | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found for fetching nearby stores.');
      return null;
    }

    const response = await axios.get(
      `${API_BASE_URL}/api/stores?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as Store[];
  } catch (error) {
    console.error('❌ Failed to fetch nearby stores:', error);
    return null;
  }
};

