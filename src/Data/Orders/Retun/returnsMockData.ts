import type { ReturnRecord } from '../../../Types';

export const MOCK_RETURNS: ReturnRecord[] = [
  {
    id: 'RET-1001',
    orderId: 'ORD-9503842',
    customerName: 'Jenny Wilson',
    bookTitle: 'Ramayan',
    reason: 'Damaged book binding',
    refundAmount: 15.00,
    requestDate: '2026-06-15', 
    status: 'pending'
  },
  {
    id: 'RET-1002',
    orderId: 'ORD-9503843',
    customerName: 'Guy Hawkins',
    bookTitle: 'The Great Gatsby',
    reason: 'Wrong item delivered',
    refundAmount: 20.00,
    requestDate: '2026-06-15', 
    status: 'approved'
  },
  {
    id: 'RET-1003',
    orderId: 'ORD-9503844',
    customerName: 'Albert Flores',
    bookTitle: 'To Kill a Mockingbird',
    reason: 'Pages were missing',
    refundAmount: 12.50,
    requestDate: '2026-06-14', 
    status: 'received'
  },
  {
    id: 'RET-1004',
    orderId: 'ORD-9503845',
    customerName: 'Kristin Watson',
    bookTitle: '1984',
    reason: 'Spine damaged in transit',
    refundAmount: 18.00,
    requestDate: '2026-06-12', 
    status: 'refunded'
  },
  {
    id: 'RET-1005',
    orderId: 'ORD-9503846',
    customerName: 'Dianne Russell',
    bookTitle: 'Pride and Prejudice',
    reason: 'No longer wanted',
    refundAmount: 9.99,
    requestDate: '2026-06-10', 
    status: 'rejected'
  },
  {
    id: 'RET-1006',
    orderId: 'ORD-9503847',
    customerName: 'Courtney Henry',
    bookTitle: 'Moby Dick',
    reason: 'Duplicate purchase',
    refundAmount: 25.50,
    requestDate: '2026-06-08', 
    status: 'pending'
  },
  {
    id: 'RET-1007',
    orderId: 'ORD-9503848',
    customerName: 'Jane Cooper',
    bookTitle: 'War and Peace',
    reason: 'Product not as expected',
    refundAmount: 35.00,
    requestDate: '2026-06-05', 
    status: 'approved'
  },
  {
    id: 'RET-1008',
    orderId: 'ORD-9503849',
    customerName: 'Cody Fisher',
    bookTitle: 'The Catcher in the Rye',
    reason: 'Water damage during shipping',
    refundAmount: 14.20,
    requestDate: '2026-06-01', 
    status: 'received'
  },
  {
    id: 'RET-1009',
    orderId: 'ORD-9503850',
    customerName: 'Esther Howard',
    bookTitle: 'Ulysses',
    reason: 'Print quality issues',
    refundAmount: 22.00,
    requestDate: '2026-05-25', 
    status: 'refunded'
  },
  {
    id: 'RET-1010',
    orderId: 'ORD-9503851',
    customerName: 'Ronald Richards',
    bookTitle: 'The Odyssey',
    reason: 'Incorrect translation edition',
    refundAmount: 19.50,
    requestDate: '2026-05-20', 
    status: 'rejected'
  },
  {
    id: 'RET-1011',
    orderId: 'ORD-9503852',
    customerName: 'Kathryn Murphy',
    bookTitle: 'Brave New World',
    reason: 'Accidental order',
    refundAmount: 16.00,
    requestDate: '2026-05-15', 
    status: 'pending'
  },
  {
    id: 'RET-1012',
    orderId: 'ORD-9503853',
    customerName: 'Eleanor Pena',
    bookTitle: 'Crime and Punishment',
    reason: 'Cover torn',
    refundAmount: 13.80,
    requestDate: '2026-05-10', 
    status: 'refunded'
  },
  {
    id: 'RET-1013',
    orderId: 'ORD-9503854',
    customerName: 'Wade Warren',
    bookTitle: 'The Hobbit',
    reason: 'Damaged packaging and cover',
    refundAmount: 11.90,
    requestDate: '2026-05-05', 
    status: 'approved'
  },
  {
    id: 'RET-1014',
    orderId: 'ORD-9503855',
    customerName: 'Leslie Alexander',
    bookTitle: 'Frankenstein',
    reason: 'Wrong translation language',
    refundAmount: 17.50,
    requestDate: '2026-04-28', 
    status: 'received'
  },
  {
    id: 'RET-1015',
    orderId: 'ORD-9503856',
    customerName: 'Devon Lane',
    bookTitle: 'Dracula',
    reason: 'Print smudges on text pages',
    refundAmount: 14.80,
    requestDate: '2026-04-20', 
    status: 'refunded'
  }
];

export const returnsAvailableColumns = [
  { key: 'id', label: 'Return ID' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerName', label: 'Customer' },
  { key: 'bookTitle', label: 'Book Title' },
  { key: 'reason', label: 'Reason' },
  { key: 'refundAmount', label: 'Refund Amount' },
  { key: 'requestDate', label: 'Request Date' },
  { key: 'status', label: 'Refund Status' },
  { key: 'actions', label: 'Actions' }
];

export const returnColumnDefs = [
  { key: 'id', header: 'Return ID', mapper: (r: ReturnRecord) => `#${r.id}` },
  { key: 'orderId', header: 'Order ID', mapper: (r: ReturnRecord) => `#${r.orderId}` },
  { key: 'customerName', header: 'Customer', mapper: (r: ReturnRecord) => r.customerName },
  { key: 'bookTitle', header: 'Book Title', mapper: (r: ReturnRecord) => r.bookTitle },
  { key: 'reason', header: 'Reason', mapper: (r: ReturnRecord) => r.reason },
  { key: 'refundAmount', header: 'Refund Amount', mapper: (r: ReturnRecord) => `$${r.refundAmount.toFixed(2)}`, align: 'right' as const },
  { key: 'requestDate', header: 'Request Date', mapper: (r: ReturnRecord) => r.requestDate },
  { key: 'status', header: 'Refund Status', mapper: (r: ReturnRecord) => r.status.toLowerCase() },
];
