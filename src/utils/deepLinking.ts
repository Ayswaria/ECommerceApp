import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

/**
 * Hook to programmatically navigate using deep links or direct navigation
 */
export function useDeepLinking() {
  const navigation = useNavigation<any>();

  const navigateToProduct = (productId: number) => {
    // Direct navigation (preferred for in-app)
    navigation.navigate('ProductDetail', { id: productId.toString() });
  };

  const navigateToProducts = () => {
    navigation.navigate('ProductTabs');
  };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  /**
   * Open a deep link externally (can be from another app, SMS, etc.)
   */
  const openDeepLink = async (deepLink: string) => {
    try {
      const canOpen = await Linking.canOpenURL(deepLink);
      if (canOpen) {
        await Linking.openURL(deepLink);
      } else {
        console.error(`Cannot open deep link: ${deepLink}`);
      }
    } catch (error) {
      console.error('Error opening deep link:', error);
    }
  };

  return {
    navigateToProduct,
    navigateToProducts,
    navigateToCart,
    navigateToHome,
    openDeepLink,
  };
}

/**
 * Build a deep link URL
 */
export const buildDeepLink = {
  product: (id: number | string) => `ecommerceapp://product/${id}`,
  products: () => 'ecommerceapp://products',
  cart: () => 'ecommerceapp://cart',
  home: () => 'ecommerceapp://',

  // Web URLs
  webProduct: (id: number | string) => `https://myshoplite.com/product/${id}`,
  webProducts: () => 'https://myshoplite.com/products',
  webCart: () => 'https://myshoplite.com/cart',
  webHome: () => 'https://myshoplite.com/',
};

/**
 * Example usage in a component:
 *
 * import { useDeepLinking, buildDeepLink } from '../utils/deepLinking';
 *
 * export function ProductCard({ product }) {
 *   const { navigateToProduct } = useDeepLinking();
 *
 *   return (
 *     <TouchableOpacity onPress={() => navigateToProduct(product.id)}>
 *       <Text>{product.name}</Text>
 *     </TouchableOpacity>
 *   );
 * }
 *
 * // Share as deep link
 * const link = buildDeepLink.product(123);
 * // "ecommerceapp://product/123"
 */
