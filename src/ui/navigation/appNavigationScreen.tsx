import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Linking,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Conditional import for Icon (mobile only)
let Icon: any = null;
if (Platform.OS !== 'web') {
  Icon = require('react-native-vector-icons/Ionicons').default;
}

import HomeScreen from '../home/homeScreen';
import ProductTabScreen from '../products/productTabs/productTabScreen';
import ProductDetailScreen from '../products/productDetails/productDetailsScreen';
import { CartProvider } from '../../context/cartContext';
import HeaderCartButton from '../components/headerCartButton';
import { FavoritesProvider } from '../../context/favouriteContext';
import CartScreen from '../cart/cartScreen';
import { linking } from '../../config/deepLinkingConfig';

const Stack = createNativeStackNavigator();

// Load font only on mobile
if (Icon) {
  Icon.loadFont();
}

export default function AppNavigationScreen() {
  useEffect(() => {
    // Handle deep link when app is already open
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Deep link received:', url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <FavoritesProvider>
      <CartProvider>
        <NavigationContainer
          linking={linking}
          fallback={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="large" color="#5856D6" />
            </View>
          }
        >
          <Stack.Navigator
            screenOptions={{
              headerBackTitle: '',
              headerBackButtonDisplayMode: 'minimal',
              headerStyle: {
                backgroundColor: '#5856D6',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                color: '#FFFFFF',
                fontWeight: '700',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'MyShopLite',
                headerLeft:
                  Platform.OS !== 'web'
                    ? () => (
                        <TouchableOpacity
                          onPress={() => console.log('Profile Pressed')}
                        >
                          <Icon
                            name="person-circle-outline"
                            size={32}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                      )
                    : undefined,
                headerRight: () => <HeaderCartButton></HeaderCartButton>,
              }}
            />
            <Stack.Screen
              name="ProductTabs"
              component={ProductTabScreen}
              options={{
                headerBackVisible: true,
                headerBackTitle: '',
                title: '',
                headerTitle: '',
                headerRight: () => <HeaderCartButton></HeaderCartButton>,
              }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{
                title: '',
                headerTitle: '',
                headerRight: () => <HeaderCartButton></HeaderCartButton>,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{
                title: 'My Cart',
                headerBackTitle: '',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </FavoritesProvider>
  );
}
