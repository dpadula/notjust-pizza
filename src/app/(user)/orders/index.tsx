import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import { Stack } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

export default function OrdersScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Orders' }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
