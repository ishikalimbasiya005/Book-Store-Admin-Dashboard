import { Tag } from 'antd';
import { FiEye } from 'react-icons/fi';
import type { ColumnsType } from 'antd/es/table';
import type { MessageRecord } from '../../Types/Message';
import { CommonButton } from '../../Attributes';

export const getMessageColumns = (
  onView: (record: MessageRecord) => void
): ColumnsType<MessageRecord> => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => (
      <span className="font-semibold text-primary-text text-xs">#{text}</span>
    ),
  },
  {
    title: 'Customer',
    key: 'customer',
    render: (_: unknown, record: MessageRecord) => (
      <div className="msg-customer-cell">
        <div className="msg-avatar">
          {record.avatar ? (
            <img src={record.avatar} alt={record.name} className="msg-avatar__img" />
          ) : (
            <span className="msg-avatar__initials">
              {record.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </span>
          )}
        </div>
        <div className="msg-customer-info">
          <span className="msg-customer-name">{record.name}</span>
          <span className="msg-customer-email">{record.email}</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Subject',
    key: 'subject',
    render: (_: unknown, record: MessageRecord) => (
      <div className="msg-subject-cell">
        <span className="msg-subject-title">{record.subject}</span>
        <span className="msg-subject-preview">
          {record.message.length > 60 ? record.message.slice(0, 60) + '...' : record.message}
        </span>
      </div>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text: string) => {
      const d = new Date(text);
      return (
        <span className="text-placeholder text-xs">
          {d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: 'read' | 'unread') => (
      <Tag className={`badge-msg-status badge-msg-${status}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: unknown, record: MessageRecord) => (
      <CommonButton onClick={() => onView(record)} className="view-order-btn" title="View Message" icon={<FiEye size={16} />} />
    ),
  },
];
