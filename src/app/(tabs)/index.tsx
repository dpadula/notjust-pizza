import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { FlatList, StyleSheet, View } from 'react-native';

const product = products[0];

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10  }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
