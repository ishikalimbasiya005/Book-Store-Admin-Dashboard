import { create } from 'zustand';
import { MOCK_ORDERS } from '../Data/Orders';
import { validateOrdersData } from '../Utils/Validation';
import type { OrderState } from '../Types';

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  visibleColumns: [ 'id', 'customerName', 'bookItemsCount', 'amount', 'paymentStatus', 'orderDate', 'paymentMethod', 'trackingNumber', 'actions', ],
  selectedRowKeys: [],
  toggleColumn: (key, checked) => {
    set((state) => {
      if (checked) {
        return { visibleColumns: [...state.visibleColumns, key] };
      } else {
        if (state.visibleColumns.length > 1) {
          return { visibleColumns: state.visibleColumns.filter((k) => k !== key) };
        }
        return {};
      }
    });
  },
  setOrders: (orders) => set({ orders }),
  loadOrders: () => {
    const validated = validateOrdersData(MOCK_ORDERS);
    set({ orders: validated });
  },
  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
  deleteSelectedOrders: () => {
    set((state) => {
      const remainingOrders = state.orders.filter(
        (order) => !state.selectedRowKeys.includes(order.id)
      );
      return {
        orders: remainingOrders,
        selectedRowKeys: [], 
      };
    });
  },
}));
