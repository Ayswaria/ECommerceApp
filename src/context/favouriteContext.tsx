import React, { createContext, useEffect, useState } from 'react';

import { FavoritesStorage } from '../storage/favouritesStorage';

interface FavoritesContextType {
  favorites: number[];

  toggleFavorite: (productId: number) => void;

  isFavorite: (productId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>(
  null as any,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const stored = await FavoritesStorage.load();

    setFavorites(stored);
  }

  async function toggleFavorite(productId: number) {
    let updated: number[];

    if (favorites.includes(productId)) {
      updated = favorites.filter(id => id !== productId);
    } else {
      updated = [...favorites, productId];
    }

    setFavorites(updated);

    await FavoritesStorage.save(updated);
  }

  function isFavorite(productId: number) {
    return favorites.includes(productId);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
