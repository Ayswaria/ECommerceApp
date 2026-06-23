import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { groupProductsByTag } from '../../utils/ProductUtils';
import ProductSectionList from '../products/productSection/productSectionList';
import { Product } from '../../models/product';
import { ProductService } from '../../services/productService';
import ShopAllBanner from './shopAllBanner';

export default function HomeScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);

  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Product[]>
  >({});

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const products = await ProductService.getProducts();

      const grouped = groupProductsByTag(products);

      setGroupedProducts(grouped);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', {
      product,
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <ShopAllBanner />
      {Object.entries(groupedProducts).map(([tag, products]) => (
        <KeyedProductSectionList
          key={tag}
          testID={`section-${tag}`}
          title={tag}
          tag={tag}
          products={products}
          handleProductTap={handleProductPress}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  section: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },

  offerCard: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  offerText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

// Helper to bypass React TypeScript key prop limitation on components
const KeyedProductSectionList = (props: any) => (
  <ProductSectionList {...props} />
);
