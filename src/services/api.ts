import type { Product } from '../types/product';

type ApiProduct = {
  id: number | string;
  title: string;
  description: string;
  price: number;
  cover: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

function inferCategory(title: string) {
  return title.toLowerCase().includes('brinquedo') ? 'Brinquedos' : 'Alimentacao';
}

function normalizeProduct(product: ApiProduct): Product {
  return {
    id: String(product.id),
    name: product.title,
    description: product.description,
    price: Number(product.price),
    image: product.cover,
    category: inferCategory(product.title),
    inStock: true,
  };
}

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar os produtos.');
  }

  const data = (await response.json()) as ApiProduct[];
  return data.map(normalizeProduct);
}
