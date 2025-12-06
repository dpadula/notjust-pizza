import { useCart } from '@/providers/CartProviderContext';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const Cart = () => {
  const { items } = useCart();
  return (
    <View>
      <Text>Cart items length: {items.length}</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>{item.id}</Text>
          <Text>{item.product.name}</Text>
          <Text>Size: {item.size}</Text>
          <Text>Quantity: {item.quantity}</Text>
        </View>
      ))}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
