import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductListScreen from '../productList/productListScreen';
import FavoritesScreen from '../../favourites/favourites';

import { Product } from '../../../models/product';
import { ProductService } from '../../../services/productService';

const Tab = createBottomTabNavigator();

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
      const result = await ProductService.getProducts();
      setProducts(result);
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
