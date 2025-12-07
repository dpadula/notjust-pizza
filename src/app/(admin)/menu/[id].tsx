import { useCart } from '@/providers/CartProviderContext';
import { PizzaSize } from '@/types';
import products from '@assets/data/products';
import Button from '@components/Button';
import { defaultPizzaImage } from '@components/ProductListItem';
import Colors from '@constants/Colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('S');

  const addToCart = () => {
    console.log(`Added ${product?.name} of size ${selectedSize} to cart.`);
    if (!product) return;
    addItem(product, selectedSize);
    router.push('/cart');
  };

  const product = products.find((p) => p.id.toString() === id);
  if (!product) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.title}>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
              },
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? 'black' : 'gray',
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text='Add to Cart' onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
  },

  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.tint,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    borderWidth: 0.4,
    borderColor: 'gray',
    backgroundColor: 'gainsboro',
    width: 60,
    aspectRatio: 1,
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
