import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { CartContext } from '../../../context/cartContext';
import { Product } from '../../../models/product';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FavoriteButton from '../../components/favouriteButton';
import { ProductService } from '../../../services/productService';

const { width } = Dimensions.get('window');

type ProductDetailScreenProps = NativeStackScreenProps<any, 'ProductDetail'>;

export default function ProductDetailScreen({
  route,
}: ProductDetailScreenProps) {
  const cartContext = useContext(CartContext);
  const [product, setProduct] = useState<Product | undefined>(
    route.params?.product,
  );
  const [loading, setLoading] = useState(false);

  // Handle deep link with product ID
  useEffect(() => {
    const fetchProductById = async () => {
      const productId = route.params?.id;
      if (productId && !product) {
        setLoading(true);
        try {
          const products = await ProductService.getProducts();
          const foundProduct = products.find(
            p => p.id === parseInt(productId, 10),
          );
          if (foundProduct) {
            setProduct(foundProduct);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductById();
  }, [route.params?.id, product]);

  if (!cartContext || !product) {
    return (
      <View style={styles.centerStateContainer}>
        <Text style={styles.infoText}>
          {loading ? 'Loading...' : 'Product details unavailable.'}
        </Text>
      </View>
    );
  }

  const { addToCart, increment, decrement, getQuantity } = cartContext;
  const quantity = getQuantity(product?.id || 0);
  const imageUri = product.image?.trim() || 'https://picsum.photos/300/200';

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* IMAGE CAROUSEL */}
        <View style={styles.carouselCard}>
          <Image source={{ uri: imageUri, cache: 'reload' }} style={styles.image} />
        </View>

        {/* PRODUCT INFO */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>

          <Text style={styles.rating}>⭐ {product.rating}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>

            <Text style={styles.strikePrice}>${product.strikePrice}</Text>
          </View>

          <Text style={styles.tag}>{product.tag}</Text>

          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.stock}>{product.stock} items left</Text>

          <FavoriteButton productId={product.id} />
          <View style={styles.actionContainer}>
            {quantity === 0 ? (
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => addToCart(product)}
              >
                <Text style={styles.buyButtonText}>Add To Cart</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.qtyButtonContainer}
                  onPress={() => decrement(product.id)}
                >
                  <Text style={styles.qtyButton}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButtonContainer}
                  onPress={() => increment(product.id)}
                >
                  <Text style={styles.qtyButton}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  screenContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  centerStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 15,
    color: '#6B7280',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

  carouselCard: {
    marginTop: 8,
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: width - 24,
    height: 280,
    resizeMode: 'cover',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
  },

  infoContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 8,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  name: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },

  rating: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 12,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000000',
  },

  strikePrice: {
    fontSize: 16,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },

  tag: {
    marginBottom: 12,
    color: '#34C759',
    fontWeight: '600',
  },

  description: {
    fontSize: 14,
    color: '#3A3A3C',
    lineHeight: 20,
    marginBottom: 10,
  },

  stock: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 14,
  },

  actionContainer: {
    marginTop: 16,
    paddingTop: 6,
  },

  buyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },

  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  qtyButtonContainer: {
    minWidth: 42,
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: '#5856D6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  quantity: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
});
// Helper to create keyed View elements (bypasses React TypeScript key prop limitation)
const KeyedView = (props: any) => <View {...props} />;
