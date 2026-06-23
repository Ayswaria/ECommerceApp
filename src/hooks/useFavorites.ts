import {
  useContext,
} from 'react';

import {
  FavoritesContext,
} from '../context/favouriteContext';

export const useFavorites =
  () =>
    useContext(
      FavoritesContext,
    );