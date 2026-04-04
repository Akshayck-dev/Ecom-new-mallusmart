import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  message: string;
  setIsLoading: (loading: boolean, message?: string) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  message: 'Synchronizing...',
  setIsLoading: (loading, message = 'Synchronizing...') => set({ isLoading: loading, message }),
}));
