import { FiEye, FiRotateCcw, FiRefreshCw } from 'react-icons/fi';
import type { ColumnsType } from 'antd/es/table';
import type { TransactionRecord, TransactionStatus } from '../../../Types';

export const getTransactionTableColumns = (
  onViewDetails: (record: TransactionRecord) => void,
  onRefund: (record: TransactionRecord) => void,
  onRetry: (record: TransactionRecord) => void
): ColumnsType<TransactionRecord> => [
  {
    title: 'Transaction ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <span className="font-semibold text-primary-text">#{text}</span>,
  },
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    render: (text: string) => <span className="text-placeholder">#{text}</span>,
  },
  {
    title: 'Customer',
    dataIndex: 'customerName',
    key: 'customerName',
    render: (text: string) => <span className="text-primary-text font-medium">{text}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (val: number) => <span className="font-semibold text-accent">${val.toFixed(2)}</span>,
  },
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    render: (method: string) => <span className="payment-method-badge">{method}</span>,
  },
  {
    title: 'Gateway Ref ID',
    dataIndex: 'gatewayRef',
    key: 'gatewayRef',
    render: (text: string) => <span className="tracking-number-text">{text}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: TransactionStatus) => {
      const badgeClass = `badge-status badge-${status.toLowerCase()}`;
      return <span className={badgeClass}>{status.toLowerCase()}</span>;
    },
  },
  {
    title: 'Date & Time',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text: string) => <span className="text-placeholder">{text}</span>,
  },
  {
    title: 'Action',
    key: 'actions',
    render: (_, record: TransactionRecord) => (
      <div className="action-buttons-container">
        {/* Refund Button: only available for success transactions */}
        <button
          onClick={() => onRefund(record)}
          className="action-reject-btn"
          title="Refund Transaction"
          disabled={record.status !== 'success'}
        >
          <FiRotateCcw size={15} />
        </button>
        {/* Retry Button: only available for failed transactions */}
        <button
          onClick={() => onRetry(record)}
          className="action-approve-btn"
          title="Retry Transaction"
          disabled={record.status !== 'failed'}
        >
          <FiRefreshCw size={15} />
        </button>
        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(record)}
          className="view-order-btn"
          title="View Details"
        >
          <FiEye size={16} />
        </button>
      </div>
    ),
  },
];
