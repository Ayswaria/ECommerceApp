import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { forwardRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../../models/product';
import ProductSectionCard from './productSectionCard';

type ProductSectionListProps = {
  title: string;
  tag: string;
  products: Product[];
  handleProductTap: (product: Product) => void;
  testID?: string;
};

const ProductSectionList = forwardRef<View, ProductSectionListProps>(
  ({ title, tag, products, handleProductTap, testID }, ref) => {
    const navigation = useNavigation<any>();

    return (
      <View style={styles.container} testID={testID}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>{title}</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductTabs', {
                tag,
              })
            }
          >
            <Text style={styles.exploreAll}>Explore &gt;</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductSectionCard product={item} onPress={handleProductTap} />
          )}
        />
      </View>
    );
  },
);

export default ProductSectionList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
  },

  exploreAll: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },

  card: {
    width: 180,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginLeft: 16,
    padding: 16,
    justifyContent: 'center',
    elevation: 2,
  },

  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
});
