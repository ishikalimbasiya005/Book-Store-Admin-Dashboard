import { create } from 'zustand';
import { MOCK_RETURNS } from '../Data/Orders/Retun/returnsMockData';
import type { ReturnState } from '../Types';

export const useReturnStore = create<ReturnState>((set) => ({
  returns: [],
  searchQuery: '',
  dateFilter: 'all',
  visibleColumns: ['id', 'orderId', 'customerName', 'bookTitle', 'reason', 'refundAmount', 'requestDate', 'status', 'actions'],
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
  setDateFilter: (dateFilter) => set({ dateFilter }),
  setReturns: (returns) => set({ returns }),
  
  loadReturns: () => {
    set({ returns: MOCK_RETURNS });
  },
  
  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
  
  deleteSelectedReturns: () => {
    set((state) => {
      const remainingReturns = state.returns.filter(
        (ret) => !state.selectedRowKeys.includes(ret.id)
      );
      return {
        returns: remainingReturns,
        selectedRowKeys: [], 
      };
    });
  },
  
  updateReturnStatus: (id, status) => {
    set((state) => ({
      returns: state.returns.map((ret) =>
        ret.id === id ? { ...ret, status } : ret
      ),
    }));
  },
}));
