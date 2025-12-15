import { useCart } from '@/providers/CartProvider';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import CartListItem from '../components/CartListItem';

const Cart = () => {
  const { items, total, checkout } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, paddingTop: 10 }}
      />
      <Text style={{ marginTop: 10, fontSize: 14, fontWeight: '400' }}>
        Total: ${total}
      </Text>
      <Button text='Checkout' onPress={checkout} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
