import { FiEye, FiCheck, FiX } from 'react-icons/fi';
import type { ColumnsType } from 'antd/es/table';
import type { ReturnRecord, ReturnStatus } from '../../../Types';

export const getReturnTableColumns = (
  onViewDetails: (record: ReturnRecord) => void,
  onApprove: (record: ReturnRecord) => void,
  onReject: (record: ReturnRecord) => void
): ColumnsType<ReturnRecord> => [
  {
    title: 'Return ID',
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
    title: 'Book Title',
    dataIndex: 'bookTitle',
    key: 'bookTitle',
    render: (text: string) => <span className="text-primary-text">{text}</span>,
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason',
    render: (text: string) => <span className="text-placeholder text-xs">{text}</span>,
  },
  {
    title: 'Refund Amount',
    dataIndex: 'refundAmount',
    key: 'refundAmount',
    render: (val: number) => <span className="font-semibold text-accent">${val.toFixed(2)}</span>,
  },
  {
    title: 'Request Date',
    dataIndex: 'requestDate',
    key: 'requestDate',
    render: (text: string) => <span className="text-placeholder">{text}</span>,
  },
  {
    title: 'Refund Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: ReturnStatus) => {
      const badgeClass = `badge-status badge-${status.toLowerCase()}`;
      return <span className={badgeClass}>{status.toLowerCase()}</span>;
    },
  },
  {
    title: 'Action',
    key: 'actions',
    render: (_, record: ReturnRecord) => (
      <div className="action-buttons-container">
        <button
          onClick={() => onApprove(record)}
          className="action-approve-btn"
          title="Approve Return"
          disabled={record.status !== 'pending'}
        >
          <FiCheck size={16} />
        </button>
        <button
          onClick={() => onReject(record)}
          className="action-reject-btn"
          title="Reject Return"
          disabled={record.status !== 'pending'}
        >
          <FiX size={16} />
        </button>
        <button
          onClick={() => onViewDetails(record)}
          className="view-order-btn"
          title="View Details">
          <FiEye size={16} />
        </button>
      </div>
    ),
  },
];
