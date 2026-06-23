import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ShopAllBanner = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.heroBanner}
      onPress={() => navigation.navigate('ProductTabs')}
    >
      <Text style={styles.heroTitle}>Shop All Products</Text>

      <Text style={styles.heroSubtitle}>
        Discover electronics, fashion, mobiles and more
      </Text>

      <Text style={styles.heroButton}>Browse Now →</Text>
    </TouchableOpacity>
  );
};

export default ShopAllBanner;

const styles = StyleSheet.create({
  heroBanner: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
  },

  heroSubtitle: {
    marginTop: 8,
    color: '#666',
  },

  heroButton: {
    marginTop: 16,
    fontWeight: '600',
  },
});
