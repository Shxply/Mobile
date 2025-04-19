// services/ProductService.ts
import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { Product } from '@/types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProductByBarcode = async (barcode: string): Promise<Product | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No token found in storage.');
      return null;
    }

    const response = await axios.get(`${API_BASE_URL}/products/compare/${barcode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Product;
  } catch (error) {
    console.error('❌ Failed to fetch product by barcode:', error);
    return null;
  }
};


