import { create } from 'zustand';
import { MOCK_ORDER_STATUS, MOCK_PAYMENT_METHODS } from '../Data/Orders';
import { validateOrderStatusData, validatePaymentMethodData } from '../Utils/Validation';
import type { OrderAnalyticsState } from '../Types';

export const useOrderAnalyticsStore = create<OrderAnalyticsState>((set) => ({
  orderStatusData: [],
  paymentData: [],
  loading: true,
  error: null,
  fetchAnalytics: () => {
    set({ loading: true, error: null });

    // Simulate a minor API delay for clean entrance animations
    const timer = setTimeout(() => {
      try {
        const validatedOrderStatus = validateOrderStatusData(MOCK_ORDER_STATUS);
        const validatedPayments = validatePaymentMethodData(MOCK_PAYMENT_METHODS);

        set({
          orderStatusData: validatedOrderStatus,
          paymentData: validatedPayments,
          loading: false,
        });
      } catch (err) {
        set({
          error: 'Failed to load analytics data.',
          loading: false,
        });
      }
    }, 400);

    // Clean up timeout reference if called repeatedly (though unlikely)
    return () => clearTimeout(timer);
  },
}));
