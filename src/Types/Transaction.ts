import React from 'react';
import type { PaymentMethod } from './Order';

export type TransactionStatus = 'success' | 'pending' | 'failed' | 'refunded';

export interface TransactionRecord {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  gatewayRef: string;
  status: TransactionStatus;
  timestamp: string;
}

export interface TransactionState {
  transactions: TransactionRecord[];
  searchQuery: string;
  statusFilter: 'all' | TransactionStatus;
  methodFilter: 'all' | PaymentMethod;
  dateFilter: 'all' | 'today' | 'week' | 'month';
  visibleColumns: string[];
  selectedRowKeys: React.Key[];
  toggleColumn: (key: string, checked: boolean) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: 'all' | TransactionStatus) => void;
  setMethodFilter: (filter: 'all' | PaymentMethod) => void;
  setDateFilter: (filter: 'all' | 'today' | 'week' | 'month') => void;
  setTransactions: (transactions: TransactionRecord[]) => void;
  loadTransactions: () => void;
  setSelectedRowKeys: (keys: React.Key[]) => void;
  deleteSelectedTransactions: () => void;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;
}
