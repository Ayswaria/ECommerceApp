import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorite_products';

export const FavoritesStorage = {
  async save(ids: number[]) {
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(ids),
    );
  },

  async load(): Promise<number[]> {
    const value = await AsyncStorage.getItem(
      FAVORITES_KEY,
    );

    return value ? JSON.parse(value) : [];
  },
};