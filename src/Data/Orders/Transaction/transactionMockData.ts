import type { TransactionRecord } from '../../../Types';

export const MOCK_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'TXN-87401',
    orderId: 'ORD-9503842',
    customerName: 'Jenny Wilson',
    amount: 15.00,
    paymentMethod: 'UPI',
    gatewayRef: '129487291847', // UTR/Ref
    status: 'success',
    timestamp: '2026-06-15 14:30:25'
  },
  {
    id: 'TXN-87402',
    orderId: 'ORD-9503843',
    customerName: 'Guy Hawkins',
    amount: 20.00,
    paymentMethod: 'Credit Card',
    gatewayRef: 'ch_3Myn2B2eZ',
    status: 'success',
    timestamp: '2026-06-15 12:15:02'
  },
  {
    id: 'TXN-87403',
    orderId: 'ORD-9503844',
    customerName: 'Albert Flores',
    amount: 12.50,
    paymentMethod: 'Debit Card',
    gatewayRef: 'ch_3Myn2B2eY',
    status: 'pending',
    timestamp: '2026-06-14 10:45:00'
  },
  {
    id: 'TXN-87404',
    orderId: 'ORD-9503845',
    customerName: 'Kristin Watson',
    amount: 18.00,
    paymentMethod: 'UPI',
    gatewayRef: '129487291899',
    status: 'success',
    timestamp: '2026-06-13 18:22:11'
  },
  {
    id: 'TXN-87405',
    orderId: 'ORD-9503846',
    customerName: 'Dianne Russell',
    amount: 9.99,
    paymentMethod: 'Cash',
    gatewayRef: 'CASH-9503846',
    status: 'success',
    timestamp: '2026-06-12 11:30:00'
  },
  {
    id: 'TXN-87406',
    orderId: 'ORD-9503847',
    customerName: 'Courtney Henry',
    amount: 25.50,
    paymentMethod: 'Credit Card',
    gatewayRef: 'ch_3Myn2B2eX',
    status: 'failed',
    timestamp: '2026-06-11 16:55:40'
  },
  {
    id: 'TXN-87407',
    orderId: 'ORD-9503848',
    customerName: 'Theresa Webb',
    amount: 32.00,
    paymentMethod: 'UPI',
    gatewayRef: '129487291901',
    status: 'refunded',
    timestamp: '2026-06-10 09:15:33'
  },
  {
    id: 'TXN-87408',
    orderId: 'ORD-9503849',
    customerName: 'Arlene McCoy',
    amount: 14.99,
    paymentMethod: 'Debit Card',
    gatewayRef: 'ch_3Myn2B2eW',
    status: 'success',
    timestamp: '2026-06-08 13:40:15'
  },
  {
    id: 'TXN-87409',
    orderId: 'ORD-9503850',
    customerName: 'Eleanor Pena',
    amount: 50.00,
    paymentMethod: 'UPI',
    gatewayRef: '129487291910',
    status: 'success',
    timestamp: '2026-06-05 10:20:00'
  },
  {
    id: 'TXN-87410',
    orderId: 'ORD-9503851',
    customerName: 'Bessie Cooper',
    amount: 21.50,
    paymentMethod: 'Credit Card',
    gatewayRef: 'ch_3Myn2B2eV',
    status: 'success',
    timestamp: '2026-05-28 17:05:44'
  },
  {
    id: 'TXN-87411',
    orderId: 'ORD-9503852',
    customerName: 'Floyd Miles',
    amount: 8.75,
    paymentMethod: 'Cash',
    gatewayRef: 'CASH-9503852',
    status: 'success',
    timestamp: '2026-05-20 14:10:00'
  },
  {
    id: 'TXN-87412',
    orderId: 'ORD-9503853',
    customerName: 'Ronald Richards',
    amount: 19.99,
    paymentMethod: 'UPI',
    gatewayRef: '129487291925',
    status: 'failed',
    timestamp: '2026-05-15 11:22:19'
  },
  {
    id: 'TXN-87413',
    orderId: 'ORD-9503854',
    customerName: 'Jane Cooper',
    amount: 35.00,
    paymentMethod: 'Credit Card',
    gatewayRef: 'ch_3Myn2B2eU',
    status: 'success',
    timestamp: '2026-05-10 16:30:00'
  },
  {
    id: 'TXN-87414',
    orderId: 'ORD-9503855',
    customerName: 'Leslie Alexander',
    amount: 17.50,
    paymentMethod: 'UPI',
    gatewayRef: '129487291936',
    status: 'success',
    timestamp: '2026-04-28 15:45:12'
  },
  {
    id: 'TXN-87415',
    orderId: 'ORD-9503856',
    customerName: 'Devon Lane',
    amount: 14.80,
    paymentMethod: 'Debit Card',
    gatewayRef: 'ch_3Myn2B2eT',
    status: 'success',
    timestamp: '2026-04-20 10:11:55'
  }
];

export const transactionsAvailableColumns = [
  { key: 'id', label: 'Transaction ID' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerName', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'paymentMethod', label: 'Payment Method' },
  { key: 'gatewayRef', label: 'Gateway Ref ID' },
  { key: 'status', label: 'Status' },
  { key: 'timestamp', label: 'Date & Time' },
  { key: 'actions', label: 'Actions' }
];

export const transactionColumnDefs = [
  { key: 'id', header: 'Transaction ID', mapper: (t: TransactionRecord) => `#${t.id}` },
  { key: 'orderId', header: 'Order ID', mapper: (t: TransactionRecord) => `#${t.orderId}` },
  { key: 'customerName', header: 'Customer', mapper: (t: TransactionRecord) => t.customerName },
  { key: 'amount', header: 'Amount', mapper: (t: TransactionRecord) => `$${t.amount.toFixed(2)}`, align: 'right' as const },
  { key: 'paymentMethod', header: 'Payment Method', mapper: (t: TransactionRecord) => t.paymentMethod },
  { key: 'gatewayRef', header: 'Gateway Ref ID', mapper: (t: TransactionRecord) => t.gatewayRef },
  { key: 'status', header: 'Status', mapper: (t: TransactionRecord) => t.status.toUpperCase() },
  { key: 'timestamp', header: 'Date & Time', mapper: (t: TransactionRecord) => t.timestamp },
];
