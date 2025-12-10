import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { supabase } from '../../../lib/supabase';

export default function MenuScreen() {
  useEffect(() => {
    const fetchProducts = async () => {
      // Simulate a fetch call
      console.log('Fetching products...');
      const { data, error } = await supabase.from('products').select('*');
      console.log('🚀 ~ fetchProducts ~ error:', error);
      console.log('🚀 ~ fetchProducts ~ data:', data);
    };

    fetchProducts();
    return () => {
      console.log('MenuScreen unmounted');
    };
  }, []);

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
