import ProductListItem from '@components/ProductListItem';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useProductList } from '../../../api/products';

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products: {error.message}</Text>;
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
