import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

type CartContextData = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = 'petshop-ecommerce-cart';

export const CartContext = createContext<CartContextData | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);

    if (!storedItems) {
      return [];
    }

    try {
      return JSON.parse(storedItems) as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce(
    (accumulator, item) => accumulator + item.product.price * item.quantity,
    0
  );
  const shipping = items.length > 0 && subtotal < 299 ? 24.9 : 0;
  const total = subtotal + shipping;
  const itemCount = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const value = {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
