import { Product } from '@/types';
import Colors from '@constants/Colors';
import { Link, useSegments } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments(); //Para saber en que layout estamos (admin o user). Se ve que no hace falta en expo-router v6

  // console.log('Current segments:', segments);
  return (
    <Link href={`/${segments[0]}/menu/${product.id}` as any} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
    maxWidth: '50%',
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
