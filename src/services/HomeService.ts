import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { Product } from '@/types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProductByBarcode = async (barcode: string): Promise<Product | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found in AsyncStorage under "userToken".');
      return null;
    }

    console.log('🔐 Using token:', token);

    const response = await axios.get(`${API_BASE_URL}/api/products/compare/${barcode}`, {
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

export const fetchAllProducts = async (): Promise<Product[] | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found in AsyncStorage under "userToken".');
      return null;
    }

    const response = await axios.get(`${API_BASE_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Product[];
  } catch (error) {
    console.error('❌ Failed to fetch all products:', error);
    return null;
  }
};

export const compareProductsWithAI = async (productA: Product, productB: Product): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found for AI comparison');
      return null;
    }

    const response = await axios.post(`${API_BASE_URL}/api/products/compare/ai`, [productA, productB], {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data as string;
  } catch (error) {
    console.error('❌ Error comparing products with AI:', error);
    return null;
  }
};

// ✅ NEW: Add product to shopping list
export const addProductToShoppingList = async (shoppingListId: string, productId: string, quantity: number, preferredStoreId?: string): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found for adding shopping list item');
      return false;
    }

    await axios.post(
      `${API_BASE_URL}/api/shopping-lists/${shoppingListId}/items`,
      {
        productId,
        quantity,
        preferredStoreId: preferredStoreId || null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return true;
  } catch (error) {
    console.error('❌ Failed to add product to shopping list:', error);
    return false;
  }
};





