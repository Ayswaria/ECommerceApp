import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useFavorites } from '../../hooks/useFavorites';

interface Props {
  productId: number;
}

export default function FavoriteButton({ productId }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(productId);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        favorite ? styles.buttonActive : styles.buttonInactive,
      ]}
      onPress={() => toggleFavorite(productId)}
      activeOpacity={0.85}
    >
      <View style={styles.contentRow}>
        <Text style={styles.icon}>{favorite ? '❤️' : '🤍'}</Text>
        <Text
          style={[
            styles.label,
            favorite ? styles.labelActive : styles.labelInactive,
          ]}
        >
          {favorite ? 'Remove from Favourites' : 'Add to Favourites'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonActive: {
    backgroundColor: '#5856D6',
    borderColor: '#5856D6',
  },
  buttonInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#007AFF',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  labelActive: {
    color: '#FFFFFF',
  },
  labelInactive: {
    color: '#000000',
  },
});
