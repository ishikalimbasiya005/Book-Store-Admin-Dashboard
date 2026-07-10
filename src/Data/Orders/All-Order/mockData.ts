import React from 'react';
import { BsClockHistory } from 'react-icons/bs';
import { FaTruckMoving } from 'react-icons/fa';
import { TfiShoppingCartFull } from 'react-icons/tfi';
import { MdPendingActions, MdOutlineTaskAlt, MdCancel } from 'react-icons/md';
import { TbTruckReturn } from 'react-icons/tb';
import { MdErrorOutline } from "react-icons/md";
import type { OrderStatus, PaymentMethodStat, OrderRecord, StatCardProps, OrderDetailsRecord } from "../../../Types";



// Order Cards ++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const statsData: StatCardProps[] = [
  {
    icon: React.createElement(BsClockHistory, { size: 24 }),
    title: 'Pending Approvals',
    value: '500',
    trendText: '+3.5% this week',
    trendType: 'up',
  },
  {
    icon: React.createElement(FaTruckMoving, { size: 24 }),
    title: 'Truck on Premises',
    value: '500',
    trendText: 'On schedule',
    trendType: 'neutral',
  },
  {
    icon: React.createElement(TfiShoppingCartFull, { size: 24 }),
    title: 'Total Orders',
    value: '1,429',
    trendText: '+12.3% vs last month',
    trendType: 'up',
  },
  {
    icon: React.createElement(MdPendingActions, { size: 24 }),
    title: 'Pending Payments',
    value: '12',
    trendText: 'Action required',
    trendType: 'down',
  },
  {
    icon: React.createElement(MdOutlineTaskAlt, { size: 24 }),
    title: 'Delivered Orders',
    value: '1,280',
    trendText: '98.2% success rate',
    trendType: 'up',
  },
  {
    icon: React.createElement(MdCancel, { size: 24 }),
    title: 'Cancelled Orders',
    value: '300',
    trendText: '-2.4% reduction',
    trendType: 'up',
  },
  {
    icon: React.createElement(TbTruckReturn, { size: 24 }),
    title: 'Returned Orders',
    value: '100',
    trendText: 'Under control',
    trendType: 'neutral',
  },
  {
    icon: React.createElement(MdErrorOutline, { size: 24 }),
    title: 'Failed Orders',
    value: '50',
    trendText: 'Requires attention',
    trendType: 'down',
  },
];


// Graphs +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const MOCK_ORDER_STATUS: OrderStatus[] = [
  { status: 'Delivered Orders', count: 1280, color: '#10b981' }, 
  { status: 'Pending Orders', count: 500, color: '#f59e0b' },  
  { status: 'Cancelled Orders', count: 300, color: '#ef4444' },  
  { status: 'Returned Orders', count: 200, color: '#f97316' },    
  { status: 'Failed Orders', count: 50, color: '#991b1b' },      
];

export const MOCK_PAYMENT_METHODS: PaymentMethodStat[] = [
  { method: 'UPI', amount: 550, color: '#6366f1' },         
  { method: 'Cash', amount: 300, color: '#f59e0b' },
  { method: 'Credit Card', amount: 450, color: '#c026d3' },  
  { method: 'Debit Card', amount: 200, color: '#22c55e' },
];

// Order table +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const availableColumns = [
  { key: 'id', label: 'ID' },
  { key: 'customerName', label: 'Customer' },
  { key: 'bookItemsCount', label: 'Items' },
  { key: 'amount', label: 'Amount' },
  { key: 'paymentStatus', label: 'Payment status' },
  { key: 'orderDate', label: 'Date' },
  { key: 'paymentMethod', label: 'Payment method' },
  { key: 'trackingNumber', label: 'Tracking Number' },
  { key: 'actions', label: 'Action' },
];

// Table Records ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const MOCK_ORDERS: OrderRecord[] = [
  {
    id: '4772827',
    customerName: 'John Smith',
    bookItemsCount: 1,
    amount: 120.75,
    paymentStatus: 'Paid',
    orderDate: '24 Jun 2024, 9:23 pm',
    paymentMethod: 'Debit Card',
    trackingNumber: '1Z999AA10123456784'
  },
  {
    id: '5839201',
    customerName: 'Emily Johnson',
    bookItemsCount: 1,
    amount: 250.00,
    paymentStatus: 'Paid',
    orderDate: '15 Mar 2023, 2:45 pm',
    paymentMethod: 'Credit Card',
    trackingNumber: '940011020083030504'
  },
  {
    id: '6273845',
    customerName: 'Michael Brown',
    bookItemsCount: 3,
    amount: 89.99,
    paymentStatus: 'Paid',
    orderDate: '10 Apr 2022, 11:30 am',
    paymentMethod: 'UPI',
    trackingNumber: '19274899999923587'
  },
  {
    id: '7382910',
    customerName: 'Jessica Davis',
    bookItemsCount: 1,
    amount: 1500.20,
    paymentStatus: 'Paid',
    orderDate: '28 Feb 2023, 6:15 pm',
    paymentMethod: 'Credit Card',
    trackingNumber: '940550969993700123'
  },
  {
    id: '8491763',
    customerName: 'Daniel Wilson',
    bookItemsCount: 1,
    amount: 45.50,
    paymentStatus: 'Refunded',
    orderDate: '19 May 2024, 7:55 am',
    paymentMethod: 'UPI',
    trackingNumber: '-'
  },
  {
    id: '9503842',
    customerName: 'Jenny Wilson',
    bookItemsCount: 6,
    amount: 72.72,
    paymentStatus: 'Paid',
    orderDate: '03 Jan 2024, 12:05 pm',
    paymentMethod: 'Credit Card',
    trackingNumber: '927489270003745987'
  },
  {
    id: '1627493',
    customerName: 'David Anderson',
    bookItemsCount: 1,
    amount: 299.99,
    paymentStatus: 'Paid',
    orderDate: '21 Jul 2023, 8:40 pm',
    paymentMethod: 'UPI',
    trackingNumber: '9400110895674321078'
  },
  {
    id: '2738915',
    customerName: 'Laura Taylor',
    bookItemsCount: 1,
    amount: 580.75,
    paymentStatus: 'Paid',
    orderDate: '16 Sep 2023, 3:25 pm',
    paymentMethod: 'Debit Card',
    trackingNumber: '1Z85761000395763211'
  },
  {
    id: '3847269',
    customerName: 'James Thomas',
    bookItemsCount: 2,
    amount: 1250.45,
    paymentStatus: 'Pending',
    orderDate: '04 Nov 2022, 9:50 am',
    paymentMethod: 'UPI',
    trackingNumber: '-'
  },
  {
    id: '4958327',
    customerName: 'Sophia Moore',
    bookItemsCount: 1,
    amount: 75.00,
    paymentStatus: 'Paid',
    orderDate: '30 Dec 2023, 4:35 pm',
    paymentMethod: 'UPI',
    trackingNumber: '9400111691234567854'
  },
  {
    id: '5061948',
    customerName: 'William Harris',
    bookItemsCount: 4,
    amount: 999.99,
    paymentStatus: 'Paid',
    orderDate: '05 Jun 2023, 7:10 pm',
    paymentMethod: 'Credit Card',
    trackingNumber: '1Z204E380338943508'
  },
  {
    id: '6172059',
    customerName: 'Olivia Martin',
    bookItemsCount: 2,
    amount: 145.20,
    paymentStatus: 'Paid',
    orderDate: '12 Feb 2024, 2:15 pm',
    paymentMethod: 'Debit Card',
    trackingNumber: '1Z999AA10123456799'
  },
  {
    id: '7283160',
    customerName: 'Liam Garcia',
    bookItemsCount: 1,
    amount: 95.00,
    paymentStatus: 'Pending',
    orderDate: '18 Aug 2024, 10:30 am',
    paymentMethod: 'Cash',
    trackingNumber: '-'
  }
]

// Export Pdf +++++++++++++++++++++++++++++++++++++++++++++++++++
export const columnDefs = [
  { key: 'id', header: 'Order ID', mapper: (o: OrderRecord) => `#${o.id}` },
  { key: 'customerName', header: 'Customer', mapper: (o: OrderRecord) => o.customerName },
  { key: 'bookItemsCount', header: 'Items', mapper: (o: OrderRecord) => `${o.bookItemsCount} ${o.bookItemsCount === 1 ? 'item' : 'items'}` },
  { key: 'amount', header: 'Amount', mapper: (o: OrderRecord) => `$${o.amount.toFixed(2)}`, align: 'right' as const },
  { key: 'paymentStatus', header: 'Payment Status', mapper: (o: OrderRecord) => o.paymentStatus.toUpperCase(), align: 'center' as const },
  { key: 'orderDate', header: 'Order Date', mapper: (o: OrderRecord) => o.orderDate },
  { key: 'paymentMethod', header: 'Payment Method', mapper: (o: OrderRecord) => o.paymentMethod, align: 'center' as const },
  { key: 'trackingNumber', header: 'Tracking Number', mapper: (o: OrderRecord) => o.trackingNumber },
];

// Details show 
export const mockOrderDetails: OrderDetailsRecord = {
  id: '9503842',
  customerName: 'Jenny Wilson',
  email: 'jackson.graham@example.com',
  phone: '(405) 555-0128',
  address: '3517 W. Gray St. Utica, Pennsylvania 57867',
  avatar: '/assets/Images/customer_avatar.png',
  orderDate: '03 Jan 2024, 12:05 pm',
  deliveryDate: '08 Jan 2024',
  paymentStatus: 'Paid',
  paymentMethod: 'Credit Card',
  items: [
    {
      id: 'book-1',
      title: 'Ramayan',
      author: 'Valmiki',
      category: 'Mythology',
      quantity: 2,
      price: 15.00,
      image: '/assets/Images/Ramayana.jpg',
      coverColor: 'bg-amber-600',
    },
    {
      id: 'book-2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'Fiction',
      quantity: 1,
      price: 11.99,
      image: '/assets/Images/Harper Lee.jpg',
      coverColor: 'bg-purple-600',
    },
    {
      id: 'book-3',
      title: '1984',
      author: 'George Orwell',
      category: 'Fiction',
      quantity: 3,
      price: 9.99,
      image: '/assets/Images/1984.jpg',
      coverColor: 'bg-rose-500',
    },
  ],
  summary: {
    subtotal: 71.96,
    shipping: 5.00,
    discount: 10.00,
    tax: 5.76,
    grandTotal: 72.72,
  },
  tracking: [
    {
      title: 'The packing has been started',
      subtitle: 'Confirmed by Gaston Lapierre',
      timestamp: 'March 23, 2026, 09:40 am',
      status: 'active'
    },
    {
      title: 'The packing has been started',
      subtitle: 'Confirmed by Gaston Lapierre',
      timestamp: 'March 23, 2026, 09:40 am',
      status: 'inactive'
    },
    {
      title: 'The packing has been started',
      subtitle: 'Confirmed by Gaston Lapierre',
      timestamp: 'March 23, 2026, 09:40 am',
      status: 'inactive'
    },
    {
      title: 'The packing has been started',
      subtitle: 'Confirmed by Gaston Lapierre',
      timestamp: 'March 23, 2026, 09:40 am',
      status: 'inactive'
    }
  ]
};