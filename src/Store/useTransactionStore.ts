import { create } from 'zustand';
import { MOCK_TRANSACTIONS } from '../Data/Orders/Transaction/transactionMockData';
import type { TransactionState } from '../Types';

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  searchQuery: '',
  statusFilter: 'all',
  methodFilter: 'all',
  dateFilter: 'all',
  visibleColumns: ['id', 'orderId', 'customerName', 'amount', 'paymentMethod', 'gatewayRef', 'status', 'timestamp', 'actions'],
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

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setMethodFilter: (methodFilter) => set({ methodFilter }),
  setDateFilter: (dateFilter) => set({ dateFilter }),
  setTransactions: (transactions) => set({ transactions }),

  loadTransactions: () => {
    set({ transactions: MOCK_TRANSACTIONS });
  },

  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),

  deleteSelectedTransactions: () => {
    set((state) => {
      const remaining = state.transactions.filter(
        (txn) => !state.selectedRowKeys.includes(txn.id)
      );
      return {
        transactions: remaining,
        selectedRowKeys: [],
      };
    });
  },

  updateTransactionStatus: (id, status) => {
    set((state) => ({
      transactions: state.transactions.map((txn) =>
        txn.id === id ? { ...txn, status } : txn
      ),
    }));
  },
}));
