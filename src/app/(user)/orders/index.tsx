import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import { FlatList, StyleSheet, View } from 'react-native';

export default function OrdersScreen() {
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
