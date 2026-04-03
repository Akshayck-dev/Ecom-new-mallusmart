import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  resetToDefault: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,

      addProduct: (product) => 
        set((state) => ({ 
          products: [product, ...state.products] 
        })),

      deleteProduct: (id) => 
        set((state) => ({ 
          products: state.products.filter((p) => p.id !== id) 
        })),

      updateProduct: (id, updatedProduct) => 
        set((state) => ({
          products: state.products.map((p) => 
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        })),

      resetToDefault: () => 
        set({ products: INITIAL_PRODUCTS }),
    }),
    {
      name: 'mallu-mart-products', // unique name
    }
  )
);
