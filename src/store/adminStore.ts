import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAnalytics {
  revenue: number;
  customers: number;
  orders: number;
  revenueChange: string;
  customersChange: string;
  ordersChange: string;
}

interface AdminState {
  analytics: AdminAnalytics;
  resetAnalytics: () => void;
  updateRevenue: (amount: number) => void;
  incrementCustomers: () => void;
}

const INITIAL_ANALYTICS: AdminAnalytics = {
  revenue: 45231,
  customers: 2420,
  orders: 1240,
  revenueChange: '+12.5%',
  customersChange: '+14.6%',
  ordersChange: '+8.2%'
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      analytics: INITIAL_ANALYTICS,

      resetAnalytics: () => 
        set({ analytics: { ...INITIAL_ANALYTICS, revenue: 0, customers: 0, orders: 0, revenueChange: '0%', customersChange: '0%', ordersChange: '0%' } }),

      updateRevenue: (amount) => 
        set((state) => ({ 
          analytics: { ...state.analytics, revenue: state.analytics.revenue + amount } 
        })),

      incrementCustomers: () => 
        set((state) => ({ 
          analytics: { ...state.analytics, customers: state.analytics.customers + 1 } 
        })),
    }),
    {
      name: 'mallu-mart-admin-analytics',
    }
  )
);
