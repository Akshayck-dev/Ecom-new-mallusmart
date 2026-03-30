import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface HistoryStore {
  viewedIds: string[];
  addViewed: (productId: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      viewedIds: [],
      addViewed: (productId) => {
        const current = get().viewedIds;
        // Move to front if already exists, otherwise add to front
        const updated = [productId, ...current.filter(id => id !== productId)].slice(0, 20);
        set({ viewedIds: updated });
      },
      clearHistory: () => set({ viewedIds: [] }),
    }),
    {
      name: 'history-storage',
    }
  )
);
