import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { StyleSheet, View } from 'react-native';

const product = products[0];

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} />
    </View>
  );
}

const styles = StyleSheet.create({});
