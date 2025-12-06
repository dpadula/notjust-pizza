import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams(); // Get the product ID from the route params
  return (
    <View>
      <Stack.Screen options={{ title: `Product Detail - ${id}` }} />
      <Text>ProductDetailScreen {JSON.stringify(id)}</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
