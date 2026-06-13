import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getProducts } from '../services/api';
import type { Product } from '../types/product';

type ProductContextData = {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
  reloadProducts: () => Promise<void>;
};

export const ProductContext = createContext<ProductContextData | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    setLoading(true);
    setError(null);

    try {
      const loadedProducts = await getProducts();
      setProducts(loadedProducts);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Ocorreu um erro ao carregar os produtos.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  const value = {
    products,
    featuredProducts: products.slice(0, 4),
    loading,
    error,
    getProductById: (id: string) => products.find((product) => product.id === id),
    reloadProducts: loadProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
