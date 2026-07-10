import type { ColumnsType } from 'antd/es/table';
import type { OrderRecord, PaymentStatus, PaymentMethod } from '../../../Types';

export const getOrderTableColumns = (): ColumnsType<OrderRecord> => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <span className="font-semibold text-primary-text">#{text}</span>,
  },
  {
    title: 'Customer',
    dataIndex: 'customerName',
    key: 'customerName',
    render: (text: string) => <span className="text-primary-text font-medium">{text}</span>,
  },
  {
    title: 'Items',
    dataIndex: 'bookItemsCount',
    key: 'bookItemsCount',
    render: (val: number) => <span className="text-placeholder">{val} {val === 1 ? 'item' : 'items'}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (val: number) => <span className="font-semibold text-accent">${val.toFixed(2)}</span>,
  },
  {
    title: 'Payment status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    render: (status: PaymentStatus) => {
      const badgeClass = `badge-status badge-${status.toLowerCase()}`;
      return <span className={badgeClass}>{status.toLowerCase()}</span>;
    },
  },
  {
    title: 'Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
    render: (text: string) => <span className="text-placeholder">{text}</span>,
  },
  {
    title: 'Payment method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    render: (method: PaymentMethod) => <span className="payment-method-badge">{method}</span>,
  },
  {
    title: 'Tracking Number',
    dataIndex: 'trackingNumber',
    key: 'trackingNumber',
    render: (num: string) => {
      if (num === '-') {
        return <span className="text-placeholder">-</span>;
      }
      return <span className="tracking-number-text">{num}</span>;
    },
  },
];
