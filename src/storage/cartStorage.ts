import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../models/cartItem';

const CART_KEY = 'cart_items';

export const CartStorage = {
  async save(items: CartItem[]) {
    await AsyncStorage.setItem(
      CART_KEY,
      JSON.stringify(items),
    );
  },

  async load(): Promise<CartItem[]> {
    const value = await AsyncStorage.getItem(CART_KEY);

    return value ? JSON.parse(value) : [];
  },
};