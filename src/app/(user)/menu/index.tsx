import { supabase } from '@/lib/supabase';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MenuScreen() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     // Simulate a fetch call
  //     console.log('Fetching products...');
  //     const { data, error } = await supabase.from('products').select('*');
  //     console.log('🚀 ~ fetchProducts ~ error:', error);
  //     console.log('🚀 ~ fetchProducts ~ data:', data);
  //   };

  //   fetchProducts();
  //   return () => {
  //     console.log('MenuScreen unmounted');
  //   };
  // }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Simulate a fetch call
      console.log('Fetching products...');
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.log('🚀 ~ fetchProducts ~ error:', error);
        throw error;
      }
      return data;
    },
  });

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
