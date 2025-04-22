import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { ShoppingList } from '@/types/ShoppingList';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchUserShoppingLists = async (userId: string): Promise<ShoppingList[] | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.warn('⚠️ No token found in AsyncStorage under "userToken".');
      return null;
    }

    const response = await axios.get(`${API_BASE_URL}/api/shopping-lists/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as ShoppingList[];
  } catch (error) {
    console.error('❌ Failed to fetch user shopping lists:', error);
    return null;
  }
};

export const createShoppingList = async (name: string, userId: string): Promise<ShoppingList | null> => {
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

export const deleteShoppingList = async (listId: string): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
        console.warn('⚠️ No token found in AsyncStorage under "userToken".');
        return false;
        }

        await axios.delete(`${API_BASE_URL}/api/shopping-lists/${listId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        return true;
    } catch (error) {
        console.error('❌ Failed to delete shopping list:', error);
        return false;
    }
};
  