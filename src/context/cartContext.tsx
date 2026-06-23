import React, { createContext, useEffect, useMemo, useState } from 'react';

import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { CartStorage } from '../storage/cartStorage';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getQuantity: (productId: number) => number;
  getCartCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    (async () => {
      const savedItems = await CartStorage.load();
      setItems(savedItems ?? []);
    })();
  }, []);

  async function persist(next: CartItem[]) {
    setItems(next);
    await CartStorage.save(next);
  }

  function addToCart(product: Product) {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (exists) return prev;

      const updated = [...prev, { product, quantity: 1 }];
      CartStorage.save(updated);
      return updated;
    });
  }

  function increment(productId: number) {
    setItems(prev => {
      const updated = prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      CartStorage.save(updated);
      return updated;
    });
  }

  function decrement(productId: number) {
    setItems(prev => {
      const updated = prev
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0);

      CartStorage.save(updated);
      return updated;
    });
  }

  function removeFromCart(productId: number) {
    setItems(prev => {
      const updated = prev.filter(item => item.product.id !== productId);

      CartStorage.save(updated);
      return updated;
    });
  }

  function clearCart() {
    setItems([]);
    CartStorage.save([]);
  }

  function getQuantity(productId: number) {
    return items.find(i => i.product.id === productId)?.quantity ?? 0;
  }

  function getCartCount() {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  const value = useMemo(
    () => ({
      items,
      addToCart,
      increment,
      decrement,
      removeFromCart,
      clearCart,
      getQuantity,
      getCartCount,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
