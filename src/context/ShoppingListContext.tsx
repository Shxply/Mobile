import React, { createContext, useContext, useState } from 'react';

interface ShoppingItem {
  id: string;
  name: string;
  store: string;
  price: number;
}

interface ShoppingListContextType {
  shoppingList: ShoppingItem[];
  addItem: (item: ShoppingItem) => void;
  removeItem: (id: string) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider = ({ children }: { children: React.ReactNode }) => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  const addItem = (item: ShoppingItem) => {
    setShoppingList(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ShoppingListContext.Provider value={{ shoppingList, addItem, removeItem }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) throw new Error('useShoppingList must be used within a ShoppingListProvider');
  return context;
};
