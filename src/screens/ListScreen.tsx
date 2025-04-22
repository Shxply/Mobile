import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import ListScreenStyles from '../styles/ListScreenStyles';
import {
  createShoppingList,
  fetchUserShoppingLists,
  deleteShoppingList,
} from '@/services/ListService';
import { ShoppingList } from '@/types/ShoppingList';
import { useAuth } from '@/context/AuthContext';
import { getUserIdFromToken } from '@/utils/DecodeToken';

export default function ListScreen() {
  const navigation = useNavigation();
  const { token } = useAuth();

  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    const loadUserDataAndLists = async () => {
      const extractedUserId = getUserIdFromToken(token);
      if (!extractedUserId) {
        Alert.alert('Error', 'Invalid or missing token. Please log in again.');
        return;
      }

      setUserId(extractedUserId);

      try {
        const fetchedLists = await fetchUserShoppingLists(extractedUserId);
        if (fetchedLists) setLists(fetchedLists);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserDataAndLists();
  }, [token]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="add" size={28} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      Alert.alert('List name required', 'Please enter a name for your list.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User ID not available.');
      return;
    }

    try {
      const newList = await createShoppingList(newListName, userId);
      if (newList) {
        setLists((prev) => [...prev, newList]);
        setNewListName('');
        setModalVisible(false);
      } else {
        Alert.alert('Failed to create list', 'Please try again later.');
      }
    } catch (error) {
      console.error('Error creating shopping list:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleDelete = async (listId: string) => {
    const confirmed = await deleteShoppingList(listId);
    if (confirmed) {
      setLists((prev) => prev.filter((list) => list.shoppingListId !== listId));
    } else {
      Alert.alert('Failed', 'Could not delete list. Try again.');
    }
  };

  const handleListPress = (list: ShoppingList) => {
    setSelectedList(list);
    setBottomSheetVisible(true);
  };

  const renderItem = ({ item }: { item: ShoppingList }) => (
    <View style={ListScreenStyles.card}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Delete List',
            `Are you sure you want to delete "${item.name}"?`,
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => handleDelete(item.shoppingListId),
              },
            ]
          )
        }
        style={ListScreenStyles.emojiButton}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleListPress(item)}
        style={{ flex: 1 }}
        activeOpacity={0.8}
      >
        <Text style={ListScreenStyles.cardText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={ListScreenStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.shoppingListId}
          contentContainerStyle={{ padding: 16 }}
        />
      )}

      {/* Modal for creating new list */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={ListScreenStyles.modalContainer}>
          <View style={ListScreenStyles.modalContent}>
            <Text style={ListScreenStyles.modalTitle}>New Shopping List</Text>
            <TextInput
              placeholder="Enter list name"
              value={newListName}
              onChangeText={setNewListName}
              style={ListScreenStyles.input}
            />
            <TouchableOpacity
              style={ListScreenStyles.modalButton}
              onPress={handleCreateList}
            >
              <Text style={ListScreenStyles.modalButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom sheet modal */}
      <Modal
        visible={bottomSheetVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <View style={ListScreenStyles.bottomSheetBackdrop}>
          <View style={ListScreenStyles.bottomSheet}>
            <Text style={ListScreenStyles.modalTitle}>
              {selectedList?.name}
            </Text>
            <Text>More actions or details can go here...</Text>

            <TouchableOpacity
              style={[ListScreenStyles.modalButton, { marginTop: 16 }]}
              onPress={() => setBottomSheetVisible(false)}
            >
              <Text style={ListScreenStyles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

