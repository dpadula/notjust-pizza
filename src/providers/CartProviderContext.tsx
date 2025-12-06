import { CartItem, Product } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem['size']) => {
    const newItem: CartItem = {
      id: product.id.toString(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };
  const cart = { items, addItem }; // Aquí iría la lógica para manejar el carrito
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
