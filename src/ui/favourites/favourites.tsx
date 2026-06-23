import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Product } from '../../models/product';
import { useFavorites } from '../../hooks/useFavorites';
import ProductListCard from '../products/productList/productListCard';

interface FavoritesScreenProps {
  products: Product[];
  navigation: any;
}

export default function FavoritesScreen({
  products,
  navigation,
}: FavoritesScreenProps) {
  const { favorites } = useFavorites();

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.id),
  );

  const handlePress = (product: Product) => {
    navigation.navigate('ProductDetail', {
      product,
    });
  };

  return (
    <FlatList
      data={favoriteProducts}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <Text>No favorites yet</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ProductListCard product={item} onPress={() => handlePress(item)} />
      )}
    />
  );
}
