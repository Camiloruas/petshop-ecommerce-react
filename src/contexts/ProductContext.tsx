import { createContext, useMemo, type ReactNode } from 'react';
import { productsMock } from '../services/api';
import type { Product } from '../types/product';

type ProductContextData = {
  products: Product[];
};

export const ProductContext = createContext<ProductContextData | null>(null);

type ProductProviderProps = {
  children: ReactNode;
};

export function ProductProvider({ children }: ProductProviderProps) {
  const value = useMemo(() => ({ products: productsMock }), []);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
