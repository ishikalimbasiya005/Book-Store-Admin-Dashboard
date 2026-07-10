import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { motion } from 'framer-motion';
import { getReturnTableColumns } from '../../../Data/Orders/Retun/returnColumns';
import { useReturnStore } from '../../../Store/useReturnStore';
import { notifier } from '../../../Attributes/Notification';
import type { ReturnRecord } from '../../../Types';
import { CommonTable } from '../../Common';

const ReturnRefundTable: React.FC = () => {
  const { returns, loadReturns, updateReturnStatus } = useReturnStore();

  useEffect(() => {
    loadReturns();
  }, [loadReturns]);

  const handleViewReturn = (record: ReturnRecord) => {
    Modal.info({
      title: 'Return Request Details',
      content: (
        <div className="flex flex-col gap-2 mt-3 text-primary-text">
          <p><strong>Return ID:</strong> #{record.id}</p>
          <p><strong>Order ID:</strong> #{record.orderId}</p>
          <p><strong>Customer:</strong> {record.customerName}</p>
          <p><strong>Book Title:</strong> {record.bookTitle}</p>
          <p><strong>Reason:</strong> {record.reason}</p>
          <p><strong>Refund Amount:</strong> ${record.refundAmount.toFixed(2)}</p>
          <p><strong>Request Date:</strong> {record.requestDate}</p>
          <p><strong>Status:</strong> {record.status.toLowerCase()}</p>
        </div>
      ),
      okText: 'Close',
      className: 'returns-details-modal',
    });
  };

  const handleApproveReturn = (record: ReturnRecord) => {
    Modal.confirm({
      title: 'Approve Return Request',
      content: `Are you sure you want to approve the return request for order #${record.orderId}?`,
      okText: 'Yes, Approve',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk() {
        updateReturnStatus(record.id, 'approved');
        notifier.success(`Return request #${record.id} approved successfully.`);
      },
    });
  };

  const handleRejectReturn = (record: ReturnRecord) => {
    Modal.confirm({
      title: 'Reject Return Request',
      content: `Are you sure you want to reject the return request for order #${record.orderId}?`,
      okText: 'Yes, Reject',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        updateReturnStatus(record.id, 'rejected');
        notifier.success(`Return request #${record.id} rejected.`);
      },
    });
  };

  const columnsConfig = getReturnTableColumns(handleViewReturn, handleApproveReturn, handleRejectReturn);

  const handleBulkDelete = (keys: React.Key[]) => {
    const remaining = returns.filter((r) => !keys.includes(r.id));
    useReturnStore.setState({ returns: remaining, selectedRowKeys: [] });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <CommonTable
        titleText="Returns & Refunds"
        data={returns}
        columns={columnsConfig}
        searchable={true}
        filters={true}
        pagination={true}
        exportable={true}
        selectable={true}
        columnSettings={true}
        onBulkDelete={handleBulkDelete}
      />
    </motion.div>
  );
};

export default ReturnRefundTable;
