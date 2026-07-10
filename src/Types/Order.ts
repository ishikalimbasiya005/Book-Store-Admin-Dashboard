
// All Orders
export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trendText?: string;
  trendType?: 'up' | 'down' | 'neutral';
}

export interface OrderStatus {
  status: string;
  count: number;
  color: string;
}

export interface PaymentMethodStat {
  method: string;
  amount: number;
  percentage?: number;
  color: string;
}

export interface ChartProps<T> {
  data: T[];
  loading?: boolean;
  error?: string | null;
}

export interface OrderStatusCardProps {
  data: OrderStatus[];
}

export interface OrderAnalyticsState {
  orderStatusData: OrderStatus[];
  paymentData: PaymentMethodStat[];
  loading: boolean;
  error: string | null;
  fetchAnalytics: () => void;
}

export interface RecentPaymentsCardProps {
  data: PaymentMethodStat[];
}

// Table Order Types
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export type PaymentMethod = 'UPI' | 'Cash' | 'Debit Card' | 'Credit Card';

export interface OrderRecord {
  id: string;
  customerName: string;
  bookItemsCount: number;
  amount: number;
  paymentStatus: PaymentStatus;
  orderDate: string;
  paymentMethod: PaymentMethod;
  trackingNumber: string;
}

export interface OrderState {
  orders: OrderRecord[];
  visibleColumns: string[];
  selectedRowKeys: React.Key[];
  toggleColumn: (key: string, checked: boolean) => void;
  setOrders: (orders: OrderRecord[]) => void;
  loadOrders: () => void;
  setSelectedRowKeys: (keys: React.Key[]) => void;
  deleteSelectedOrders: () => void;
}

export interface PurchasedBookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  coverColor: string;
}

export interface TrackingStep {
  title: string;
  subtitle: string;
  timestamp: string;
  status: 'active' | 'inactive';
}

export interface OrderDetailsRecord {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  orderDate: string;
  deliveryDate: string;
  paymentStatus: string;
  paymentMethod: string;
  items: PurchasedBookItem[];
  summary: {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    grandTotal: number;
  };
  tracking?: TrackingStep[];
}