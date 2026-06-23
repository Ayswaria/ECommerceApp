import React, { useContext } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { CartContext, CartProvider } from '../src/context/cartContext';
import { CartStorage } from '../src/storage/cartStorage';
import { Product } from '../src/models/product';

jest.mock('../src/storage/cartStorage', () => ({
  CartStorage: {
    load: jest.fn(),
    save: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  name: 'Wireless Headphones',
  description: 'Noise cancelling',
  price: 129.99,
  strikePrice: 200,
  category: 'Electronics',
  image: 'img-1',
  rating: 4.5,
  stock: 10,
  tag: 'Sale',
};

function CartTestHarness() {
  const ctx = useContext(CartContext);

  if (!ctx) return null;

  return (
    <View>
      <Text testID="count">{ctx.getCartCount()}</Text>
      <Text testID="qty">{ctx.getQuantity(mockProduct.id)}</Text>

      <TouchableOpacity onPress={() => ctx.addToCart(mockProduct)}>
        <Text>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => ctx.increment(mockProduct.id)}>
        <Text>Increment</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => ctx.decrement(mockProduct.id)}>
        <Text>Decrement</Text>
      </TouchableOpacity>
    </View>
  );
}

describe('CartContext actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (CartStorage.load as jest.Mock).mockResolvedValue([]);
    (CartStorage.save as jest.Mock).mockResolvedValue(undefined);
  });

  it('adds, increments and decrements cart quantity correctly', async () => {
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('count').props.children).toBe(0);
      expect(screen.getByTestId('qty').props.children).toBe(0);
    });

    fireEvent.press(screen.getByText('Add'));
    await waitFor(() => {
      expect(screen.getByTestId('count').props.children).toBe(1);
      expect(screen.getByTestId('qty').props.children).toBe(1);
    });

    fireEvent.press(screen.getByText('Add'));
    await waitFor(() => {
      expect(screen.getByTestId('count').props.children).toBe(1);
      expect(screen.getByTestId('qty').props.children).toBe(1);
    });

    fireEvent.press(screen.getByText('Increment'));
    await waitFor(() => {
      expect(screen.getByTestId('count').props.children).toBe(2);
      expect(screen.getByTestId('qty').props.children).toBe(2);
    });

    fireEvent.press(screen.getByText('Decrement'));
    await waitFor(() => {
      expect(screen.getByTestId('count').props.children).toBe(1);
      expect(screen.getByTestId('qty').props.children).toBe(1);
    });

    fireEvent.press(screen.getByText('Decrement'));
    await waitFor(() => {
      expect(screen.getByTestId('count').props.children).toBe(0);
      expect(screen.getByTestId('qty').props.children).toBe(0);
    });

    expect(CartStorage.save).toHaveBeenCalled();
  });
});
