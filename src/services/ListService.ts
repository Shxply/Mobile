import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/api';
import { ShoppingList } from '@/types/ShoppingList';
import { ShoppingListItem } from '@/types/ShoppingListItem';
import { Product } from '@/types/Product';

export const fetchUserShoppingLists = async (
  userId: string
): Promise<ShoppingList[] | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found in AsyncStorage under "userToken".');
      return null;
    }

    const response = await axios.get(
      `${API_BASE_URL}/api/shopping-lists/user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('❌ Failed to fetch user shopping lists:', error);
    return null;
  }
};

export const createShoppingList = async (
  name: string,
  userId: string
): Promise<ShoppingList | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found in AsyncStorage under "userToken".');
      return null;
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/shopping-lists`,
      { name, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data as ShoppingList;
  } catch (error) {
    console.error('❌ Failed to create shopping list:', error);
    return null;
  }
};

export const deleteShoppingList = async (
  listId: string
): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found in AsyncStorage under "userToken".');
      return false;
    }

    await axios.delete(`${API_BASE_URL}/api/shopping-lists/${listId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return true;
  } catch (error) {
    console.error('❌ Failed to delete shopping list:', error);
    return false;
  }
};

export const fetchShoppingListItems = async (
  shoppingListId: string
): Promise<ShoppingListItem[] | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found in AsyncStorage under "userToken".');
      return null;
    }

    const response = await axios.get(
      `${API_BASE_URL}/api/shopping-lists/${shoppingListId}/items`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const items = Array.isArray(response.data) ? response.data : [];

    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        try {
          const productResponse = await axios.get(
            `${API_BASE_URL}/api/products/${item.productId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          return {
            ...item,
            product: productResponse.data as Product,
          };
        } catch (err) {
          console.warn(`⚠️ Failed to fetch product for ID ${item.productId}`, err);
          return item;
        }
      })
    );

    return enrichedItems;
  } catch (error) {
    console.error('❌ Failed to fetch shopping list items:', error);
    return null;
  }
};



  