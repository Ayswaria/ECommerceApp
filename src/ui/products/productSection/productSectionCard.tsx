import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Product } from '../../../models/product';

interface Props {
  product: Product;
  onPress: (product: Product) => void;
}

export default function ProductSectionCard({ product, onPress }: Props) {
  const imageUri = product.image || 'https://picsum.photos/300/200';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>

          <Text style={styles.strikePrice}>
            ₹{product.strikePrice.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 170,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  imageContainer: {
    height: 180,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  content: {
    padding: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#212121',
    minHeight: 48,
  },

  priceContainer: {
    marginTop: 12,
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  strikePrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#757575',
    textDecorationLine: 'line-through',
  },
});
