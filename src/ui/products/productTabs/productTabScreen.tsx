import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductListScreen from '../productList/productListScreen';
import FavoritesScreen from '../../favourites/favourites';

import { Product } from '../../../models/product';
import { ProductService } from '../../../services/productService';

const Tab = createBottomTabNavigator();
const USE_LOCAL_SAMPLE_DATA = true;

export default function ProductTabScreen({ route }: any) {
  const tag = route?.params?.tag;
  const productTabTitle = tag ? String(tag) : 'Products';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setError(null);

      if (USE_LOCAL_SAMPLE_DATA) {
        const localProducts = require('../../../../utils/mockJson/sample_data2_enhanced.json');

        const normalizedProducts: Product[] = (
          Array.isArray(localProducts) ? localProducts : []
        ).map((item: any, index: number) => ({
          id: Number(item?.id) || index + 1,
          name: String(item?.name ?? 'Unknown Product'),
          description: String(item?.description ?? ''),
          price: Number(item?.price ?? 0),
          strikePrice: Number(item?.strikePrice ?? item?.price ?? 0),
          category: String(item?.category ?? 'General'),
          image: String(item?.image ?? 'https://picsum.photos/300/200'),
          rating: Number(item?.rating ?? 0),
          stock: Number(item?.stock ?? 0),
          tag: String(item?.tag ?? 'Featured'),
        }));

        setProducts(normalizedProducts);
      } else {
        const result = await ProductService.getProducts();
        setProducts(result);
      }
    } catch (err) {
      console.log(err);
      setError('Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route: tabRoute }) => ({
        tabBarStyle: {
          backgroundColor: '#5856D6',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#D1D1D6',
        headerTitleStyle: {
          color: '#FFFFFF',
          fontWeight: '700',
        },
        headerStyle: {
          backgroundColor: '#5856D6',
        },
        headerTintColor: '#FFFFFF',
        tabBarIcon: ({ focused, color, size }) => {
          const iconName =
            tabRoute.name === 'Favorites'
              ? focused
                ? 'heart'
                : 'heart-outline'
              : focused
              ? 'pricetag'
              : 'pricetag-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={productTabTitle} initialParams={{ tag }}>
        {props => <ProductListScreen {...props} products={products} />}
      </Tab.Screen>

      <Tab.Screen name="Favorites">
        {props => <FavoritesScreen {...props} products={products} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
