import React, { useLayoutEffect, useState } from 'react';
import {View,Text,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ListScreenStyles from '../styles/ListScreenStyles';

const initialLists = [
  { id: '1', name: 'Grocery List' },
  { id: '2', name: 'Meal Prep' },
  { id: '3', name: 'Party Supplies' },
];

export default function ListScreen() {
  const navigation = useNavigation();
  const [lists, setLists] = useState(initialLists);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleAddList}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="add" size={28} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, lists]);

  const handleAddList = () => {
    const newId = (lists.length + 1).toString();
    const newList = { id: newId, name: `New List ${newId}` };
    setLists([...lists, newList]);
  };

  const renderItem = ({ item }: { item: typeof lists[0] }) => (
    <TouchableOpacity style={ListScreenStyles.card} activeOpacity={0.8}>
      <Ionicons name="list-outline" size={28} color="#333" />
      <Text style={ListScreenStyles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={ListScreenStyles.container}>
      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

