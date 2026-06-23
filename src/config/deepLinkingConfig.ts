import { LinkingOptions } from '@react-navigation/native';

/**
 * Deep Linking Configuration
 * 
 * Supported Schemes:
 * - Native: ecommerceapp://
 * - Web: https://myshoplite.com / http://myshoplite.com
 * 
 * Examples:
 * - Product Detail: ecommerceapp://product/123
 * - Products: ecommerceapp://products
 * - Cart: ecommerceapp://cart
 * - Home: ecommerceapp://
 */

export const linking: LinkingOptions<any> = {
  // Define URI schemes that your app can handle
  prefixes: [
    'ecommerceapp://',
    'https://myshoplite.com',
    'http://myshoplite.com',
  ],

  // Define the mapping between routes and deep link URLs
  config: {
    screens: {
      // Route: screen name, value: path pattern
      Home: '',
      ProductTabs: 'products',
      ProductDetail: 'product/:id',
      Cart: 'cart',
    },
  },
};

/**
 * Deep Link Examples:
 * 
 * Android/iOS Native:
 * - ecommerceapp://              → Home
 * - ecommerceapp://products      → ProductTabs
 * - ecommerceapp://product/42    → ProductDetail with id=42
 * - ecommerceapp://cart          → Cart
 * 
 * Web URLs:
 * - https://myshoplite.com/              → Home
 * - https://myshoplite.com/products      → ProductTabs
 * - https://myshoplite.com/product/42    → ProductDetail with id=42
 * - https://myshoplite.com/cart          → Cart
 * 
 * Testing:
 * - iOS Simulator: xcrun simctl openurl booted "ecommerceapp://product/123"
 * - Android Emulator: adb shell am start -W -a android.intent.action.VIEW -d "ecommerceapp://product/123"
 */
