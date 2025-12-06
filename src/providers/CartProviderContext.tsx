import { CartItem, Product } from '@/types';
import { randomUUID } from 'expo-crypto';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, delta: 1 | -1) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

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

  const cart = { items, addItem, updateQuantity }; // Aquí iría la lógica para manejar el carrito
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
