import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Product } from '../../../models/product';

interface Props {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductListCard = ({ product, onPress }: Props) => {
  const imageUri = product.image || 'https://picsum.photos/300/200';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={{ uri: imageUri }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <Text style={styles.rating}>⭐ {product.rating}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price}</Text>

          <Text style={styles.strikePrice}>${product.strikePrice}</Text>
        </View>

        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{product.tag}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductListCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    elevation: 2,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },

  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  description: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },

  rating: {
    marginTop: 6,
    fontSize: 13,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
  },

  strikePrice: {
    marginLeft: 8,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
  },

  tag: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 12,
  },
});
