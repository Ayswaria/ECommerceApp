import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
} from 'react-native';

import { Product } from '../../../models/product';
import ProductListCard from './productListCard';

interface ProductListScreenProps {
  products: Product[];
  route: any;
  navigation: any;
}

export default function ProductListScreen({
  route,
  navigation,
  products: allProducts,
}: ProductListScreenProps) {
  const [searchText, setSearchText] = useState('');

  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 768 ? 2 : 1;

  const tag = route.params?.tag;

  const products = tag
    ? allProducts.filter(p => p.tag.toLowerCase() === tag.toLowerCase())
    : allProducts;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handlePress = (product: Product) => {
    navigation.navigate('ProductDetail', {
      product,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={numColumns}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={
          filteredProducts.length === 0 ? styles.emptyContainer : undefined
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {searchText.length > 0
                ? `No products found for "${searchText}"`
                : 'No products found'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductListCard product={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  searchContainer: {
    padding: 16,
    backgroundColor: '#FFF',
  },

  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },

  errorText: {
    fontSize: 15,
    color: '#B91C1C',
    textAlign: 'center',
  },
});
