import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Menu,
  Provider as PaperMenuProvider,
  TextInput,
} from 'react-native-paper';

import HomeScreenStyles from '../styles/HomeScreenStyles';
import { Product } from '@/types/Product';
import { ShoppingList } from '@/types/ShoppingList';
import { fetchAllProducts } from '@/services/ProductService';
import { fetchUserShoppingLists } from '@/services/ListService';
import { getUserIdFromToken } from '@/utils/DecodeToken';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { token } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [selectedList, setSelectedList] = useState<ShoppingList | null>(null);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../assets/images/shoply-text.png')}
          style={{ width: 100, height: 20 }}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <View style={{ paddingRight: 12 }}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity
                onPress={openMenu}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ fontSize: 16, color: '#007AFF', marginRight: 4 }}>
                  Lists
                </Text>
                <Ionicons name="chevron-down" size={16} color="#007AFF" />
              </TouchableOpacity>
            }
          >
            {lists.map((list) => {
              const isSelected = selectedList?.shoppingListId === list.shoppingListId;
              return (
                <Menu.Item
                  key={list.shoppingListId}
                  onPress={() => {
                    setSelectedList(list);
                    closeMenu();
                  }}
                  title={
                    isSelected ? `✓ ${list.name}` : list.name
                  }
                  titleStyle={{
                    fontWeight: isSelected ? 'bold' : 'normal',
                    color: isSelected ? '#007AFF' : '#000',
                  }}
                />
              );
            })}
          </Menu>
        </View>
      ),
    });
  }, [menuVisible, lists, selectedList]);

  useEffect(() => {
    const loadListsAndProducts = async () => {
      const userId = getUserIdFromToken(token);
      if (!userId) return;

      const [fetchedLists, fetchedProducts] = await Promise.all([
        fetchUserShoppingLists(userId),
        fetchAllProducts(),
      ]);

      if (fetchedLists) {
        setLists(fetchedLists);
        if (
          !selectedList ||
          !fetchedLists.find((l) => l.shoppingListId === selectedList.shoppingListId)
        ) {
          setSelectedList(fetchedLists[0]);
        }
      }

      if (fetchedProducts) setProducts(fetchedProducts);
    };

    if (isFocused) {
      loadListsAndProducts();
    }
  }, [token, isFocused]);

  const groupIntoRows = (items: Product[], columns = 2) => {
    const rows = [];
    for (let i = 0; i < items.length; i += columns) {
      rows.push(items.slice(i, i + columns));
    }
    return rows;
  };

  const increaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (id: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return {
        ...prev,
        [id]: current - 1,
      };
    });
  };

  const filteredProducts = products.filter(
    (item) =>
      item.name &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const groupedProducts = groupIntoRows(filteredProducts);

  return (
    <PaperMenuProvider>
      <View style={{ flex: 1 }}>
        <View style={HomeScreenStyles.searchBarWrapper}>
          <TextInput
            mode="outlined"
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
            style={HomeScreenStyles.searchBar}
            left={<TextInput.Icon icon="magnify" />}
          />
        </View>

        <ScrollView contentContainerStyle={[HomeScreenStyles.container, { paddingTop: 80 }]}>
          {groupedProducts.map((row, rowIndex) => (
            <View key={rowIndex} style={HomeScreenStyles.row}>
              {row.map((item) => {
                const id = item.productId ?? '';
                const quantity = id ? quantities[id] || 0 : 0;

                return (
                  <TouchableOpacity key={id} style={HomeScreenStyles.cardWrapper} activeOpacity={0.8}>
                    <View style={HomeScreenStyles.card}>
                      {quantity === 0 && (
                        <TouchableOpacity
                          style={HomeScreenStyles.tileAddButton}
                          onPress={() => id && increaseQuantity(id)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="add" size={16} color="#fff" />
                        </TouchableOpacity>
                      )}

                      <Image
                        source={{ uri: item.imageFrontUrl || item.imageUrl || '' }}
                        style={HomeScreenStyles.productImage}
                      />
                      <Text
                        style={HomeScreenStyles.productName}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>

                      {quantity > 0 && (
                        <View style={HomeScreenStyles.counterBar}>
                          <TouchableOpacity
                            onPress={() => id && decreaseQuantity(id)}
                            style={HomeScreenStyles.counterButton}
                          >
                            {quantity === 1 ? (
                              <Ionicons name="trash" size={16} color="#d11a2a" />
                            ) : (
                              <Ionicons name="remove" size={16} color="#333" />
                            )}
                          </TouchableOpacity>

                          <Text style={HomeScreenStyles.counterText}>
                            {quantity}
                          </Text>

                          <TouchableOpacity
                            onPress={() => id && increaseQuantity(id)}
                            style={HomeScreenStyles.counterButton}
                          >
                            <Ionicons name="add" size={16} color="#333" />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </PaperMenuProvider>
  );
}
