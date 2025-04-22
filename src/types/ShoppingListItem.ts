import { Product } from './Product';

export interface ShoppingListItem {
  shoppingListItemId: string;
  shoppingListId: string;
  productId: string;
  quantity: number;
  preferredStoreId?: string;
  product?: Product;
}

  