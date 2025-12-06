import { useCart } from '@/providers/CartProviderContext';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import CartListItem from '../components/CartListItem';

const Cart = () => {
  const { items } = useCart();
  return (
    <View>
      <Text>Cart items length: {items.length}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
