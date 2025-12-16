import { useInsertOrder } from '@/api/orders';
import { CartItem, Tables } from '@/types';
import { randomUUID } from 'expo-crypto';
import { useRouter } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useInsertOrderItems } from '../api/order_items';

type Product = Tables<'products'>;

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, delta: 1 | -1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const router = useRouter();

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    // If the item already exists in the cart with the same size, increase its quantity

    const newItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const updateQuantity = (itemId: string, delta: 1 | -1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId ? item : { ...item, quantity: item.quantity + delta }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const saveOrderItems = (order: Tables<'orders'>) => {
    // console.log('🚀 ~ checkout ~ data:', order);

    const item1 = items[0]; //Prueba para un solo item
    insertOrderItems({
      order_id: order.id,
      product_id: item1.product_id,
      size: item1.size,
      quantity: item1.quantity,
    });
    clearCart();
    router.push(`/(user)/orders/${order.id}`);
  };

  const checkout = () => {
    insertOrder(
      {
        total,
        user_id: '',
      },
      {
        onSuccess: (data) => {
          saveOrderItems(data);
        },
        onError: (error) => {
          console.error('Checkout failed:', error);
        },
      }
    );
  };

  const cart = { items, addItem, updateQuantity, total, checkout }; // Aquí iría la lógica para manejar el carrito
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
