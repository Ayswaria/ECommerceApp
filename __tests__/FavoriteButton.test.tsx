import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import FavoriteButton from '../src/ui/components/favouriteButton';
import { useFavorites } from '../src/hooks/useFavorites';

jest.mock('../src/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));

describe('FavoriteButton', () => {
  it('renders add label and toggles favorite on press', () => {
    const toggleFavorite = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      toggleFavorite,
      isFavorite: () => false,
    });

    render(<FavoriteButton productId={101} />);

    expect(screen.getByText('Add to Favourites')).toBeTruthy();

    fireEvent.press(screen.getByText('Add to Favourites'));
    expect(toggleFavorite).toHaveBeenCalledWith(101);
  });

  it('renders remove label when item is already favorite', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      toggleFavorite: jest.fn(),
      isFavorite: () => true,
    });

    render(<FavoriteButton productId={101} />);

    expect(screen.getByText('Remove from Favourites')).toBeTruthy();
  });
});
