import React from 'react';

export type ReturnStatus = 'pending' | 'approved' | 'received' | 'refunded' | 'rejected';

export interface ReturnRecord {
  id: string;
  orderId: string;
  customerName: string;
  bookTitle: string;
  reason: string;
  refundAmount: number;
  requestDate: string; 
  status: ReturnStatus;
}

export interface ReturnState {
  returns: ReturnRecord[];
  searchQuery: string;
  dateFilter: 'all' | 'today' | 'week' | 'month';
  visibleColumns: string[];
  selectedRowKeys: React.Key[];
  toggleColumn: (key: string, checked: boolean) => void;
  setSearchQuery: (query: string) => void;
  setDateFilter: (filter: 'all' | 'today' | 'week' | 'month') => void;
  setReturns: (returns: ReturnRecord[]) => void;
  loadReturns: () => void;
  setSelectedRowKeys: (keys: React.Key[]) => void;
  deleteSelectedReturns: () => void;
  updateReturnStatus: (id: string, status: ReturnStatus) => void;
}
