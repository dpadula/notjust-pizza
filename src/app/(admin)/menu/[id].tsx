import { useCart } from '@/providers/CartProviderContext';
import { PizzaSize } from '@/types';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@components/ProductListItem';
import Colors from '@constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();

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
      <Stack.Screen
        options={{
          title: 'Create Product',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='pencil'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode='contain'
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
});
