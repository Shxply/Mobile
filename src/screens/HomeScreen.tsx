import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Menu,
  Provider as PaperMenuProvider,
  TextInput,
} from 'react-native-paper';
import HomeScreenStyles from '../styles/HomeScreenStyles';

const mockProducts = [
  { id: '1', name: 'Milk', image: require('../../assets/images/milk.png') },
  { id: '2', name: 'Bread', image: require('../../assets/images/bread.png') },
  { id: '3', name: 'Eggs', image: require('../../assets/images/eggs.png') },
  { id: '4', name: 'Apples', image: require('../../assets/images/apples.png') },
];

const userLists = ['Grocery List', 'Meal Prep', 'Favorites'];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState('');

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
            {userLists.map((list) => (
              <Menu.Item
                key={list}
                onPress={() => {
                  closeMenu();
                  console.log(`Selected list: ${list}`);
                }}
                title={list}
              />
            ))}
          </Menu>
        </View>
      ),
    });
  }, [menuVisible]);

  const groupIntoRows = (items: typeof mockProducts, columns = 2) => {
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

  const filteredProducts = mockProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const groupedProducts = groupIntoRows(filteredProducts);

  return (
    <PaperMenuProvider>
      <View style={{ flex: 1 }}>
        {/* Fixed Search Bar */}
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

        {/* Scrollable Product List */}
        <ScrollView contentContainerStyle={[HomeScreenStyles.container, { paddingTop: 80 },]}>
          {groupedProducts.map((row, rowIndex) => (
            <View key={rowIndex} style={HomeScreenStyles.row}>
              {row.map((item) => {
                const quantity = quantities[item.id] || 0;
                return (
                  <View key={item.id} style={HomeScreenStyles.cardWrapper}>
                    <View style={HomeScreenStyles.card}>
                      {quantity === 0 && (
                        <TouchableOpacity
                          style={HomeScreenStyles.tileAddButton}
                          onPress={() => increaseQuantity(item.id)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="add" size={16} color="#fff" />
                        </TouchableOpacity>
                      )}

                      <Image
                        source={item.image}
                        style={HomeScreenStyles.productImage}
                      />
                      <Text style={HomeScreenStyles.productName}>
                        {item.name}
                      </Text>

                      {quantity > 0 && (
                        <View style={HomeScreenStyles.counterBar}>
                          <TouchableOpacity
                            onPress={() => decreaseQuantity(item.id)}
                            style={HomeScreenStyles.counterButton}
                          >
                            {quantity === 1 ? (
                              <Ionicons
                                name="trash"
                                size={16}
                                color="#d11a2a"
                              />
                            ) : (
                              <Ionicons
                                name="remove"
                                size={16}
                                color="#333"
                              />
                            )}
                          </TouchableOpacity>

                          <Text style={HomeScreenStyles.counterText}>
                            {quantity}
                          </Text>

                          <TouchableOpacity
                            onPress={() => increaseQuantity(item.id)}
                            style={HomeScreenStyles.counterButton}
                          >
                            <Ionicons name="add" size={16} color="#333" />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </PaperMenuProvider>
  );
}




