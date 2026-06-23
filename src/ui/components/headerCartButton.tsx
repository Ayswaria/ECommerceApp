import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CartContext } from '../../context/cartContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HeaderCartButton() {
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { getCartCount } = cartContext;

  const cartCount = getCartCount();
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={{
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon name="cart-sharp" size={20} color="#FFFFFF" />

      {cartCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: '#FF3B30',
            borderRadius: 8,
            minWidth: 16,
            height: 16,
            paddingHorizontal: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 9,
              fontWeight: '700',
            }}
          >
            {cartCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
