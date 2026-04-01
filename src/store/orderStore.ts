import { create } from 'zustand';
import { Product } from '../types';

type OrderType = 'single' | 'basket';

interface OrderStore {
  isOpen: boolean;
  orderType: OrderType;
  product: Product | null;
  initialQuantity: number;
  openOrderModal: (type: OrderType, product?: Product, quantity?: number) => void;
  closeOrderModal: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  isOpen: false,
  orderType: 'single',
  product: null,
  initialQuantity: 1,
  openOrderModal: (type, product = null, quantity = 1) => 
    set({ 
      isOpen: true, 
      orderType: type, 
      product, 
      initialQuantity: quantity 
    }),
  closeOrderModal: () => set({ isOpen: false, product: null }),
}));
