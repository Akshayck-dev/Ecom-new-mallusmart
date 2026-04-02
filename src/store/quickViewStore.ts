import { create } from 'zustand';

interface QuickViewState {
  selectedProductId: string | null;
  isOpen: boolean;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  selectedProductId: null,
  isOpen: false,
  openQuickView: (productId) => set({ selectedProductId: productId, isOpen: true }),
  closeQuickView: () => set({ selectedProductId: null, isOpen: false }),
}));
