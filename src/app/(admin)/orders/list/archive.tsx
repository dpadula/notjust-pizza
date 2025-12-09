import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import { Stack } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

export default function ArchiveOrdersScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Archive' }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
