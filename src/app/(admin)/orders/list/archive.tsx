import { useAdminOrderstList } from '@/api/orders';
import OrderListItem from '@/components/OrderListItem';
import { Stack } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ArchiveOrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderstList({ archived: true });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products: {error.message}</Text>;
  }
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
