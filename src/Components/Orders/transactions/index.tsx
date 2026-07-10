import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTransactionTableColumns } from '../../../Data/Orders/Transaction/transactionColumns';
import { useTransactionStore } from '../../../Store/useTransactionStore';
import { notifier } from '../../../Attributes/Notification';
import type { TransactionRecord } from '../../../Types';
import { FiAlertTriangle, FiClock, FiDollarSign, FiPercent } from 'react-icons/fi';
import { CommonTable } from '../../Common';
import { Modal, Select } from 'antd';

const TransactionsTable: React.FC = () => {
  const { transactions, statusFilter, methodFilter, setStatusFilter, setMethodFilter, loadTransactions, updateTransactionStatus, } = useTransactionStore();

  useEffect(() => { loadTransactions(); }, [loadTransactions]);

  const handleViewTransaction = (record: TransactionRecord) => {
    Modal.info({
      title: 'Transaction Details',
      content: (
        <div className="flex flex-col gap-2 mt-3 text-primary-text">
          <p><strong>Transaction ID:</strong> #{record.id}</p>
          <p><strong>Order ID:</strong> #{record.orderId}</p>
          <p><strong>Customer:</strong> {record.customerName}</p>
          <p><strong>Amount:</strong> ${record.amount.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> {record.paymentMethod}</p>
          <p><strong>Gateway Ref ID:</strong> {record.gatewayRef}</p>
          <p><strong>Status:</strong> {record.status.toLowerCase()}</p>
          <p><strong>Date & Time:</strong> {record.timestamp}</p>
        </div>
      ),
      okText: 'Close',
      className: 'returns-details-modal',
    });
  };

  const handleRefundTransaction = (record: TransactionRecord) => {
    Modal.confirm({
      title: 'Confirm Refund',
      content: `Are you sure you want to refund Transaction #${record.id} for $${record.amount.toFixed(2)}?`,
      okText: 'Yes, Refund',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        updateTransactionStatus(record.id, 'refunded');
        notifier.success(`Transaction #${record.id} refunded successfully.`);
      },
    });
  };

  const handleRetryTransaction = (record: TransactionRecord) => {
    Modal.confirm({
      title: 'Confirm Retry',
      content: `Are you sure you want to retry the failed Transaction #${record.id}?`,
      okText: 'Yes, Retry',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk() {
        updateTransactionStatus(record.id, 'success');
        notifier.success(`Transaction #${record.id} processed successfully.`);
      },
    });
  };


  const statusMethodFilteredTransactions = React.useMemo(() => {
    return transactions.filter(item => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (methodFilter !== 'all' && item.paymentMethod !== methodFilter) return false;
      return true;
    });
  }, [transactions, statusFilter, methodFilter]);

  const columnsConfig = getTransactionTableColumns(handleViewTransaction, handleRefundTransaction, handleRetryTransaction);

  const handleBulkDelete = (keys: React.Key[]) => {
    const remaining = transactions.filter((t) => !keys.includes(t.id));
    useTransactionStore.setState({ transactions: remaining, selectedRowKeys: [] });
  };

  // Calculate stats dynamically
  const successTxns = transactions.filter(t => t.status === 'success');
  const totalVolume = successTxns.reduce((sum, t) => sum + t.amount, 0);
  const successRate = transactions.length > 0 ? (successTxns.length / transactions.length) * 100 : 0;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const failedCount = transactions.filter(t => t.status === 'failed').length;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Dynamic Statistics Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="order-stats-grid" >
        <div className="order-stat-card">
          <div className="order-stat-card__icon-wrapper text-emerald-500"> <FiDollarSign size={20} /> </div>
          <div className="order-stat-card__content">
            <span className="order-stat-card__value">${totalVolume.toFixed(2)}</span>
            <span className="order-stat-card__title">Total Volume</span>
            <span className="order-stat-card__trend order-stat-card__trend--up">Success payments</span>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-card__icon-wrapper text-indigo-500"> <FiPercent size={20} /> </div>
          <div className="order-stat-card__content">
            <span className="order-stat-card__value">{successRate.toFixed(1)}%</span>
            <span className="order-stat-card__title">Success Rate</span>
            <span className="order-stat-card__trend order-stat-card__trend--neutral">All payments</span>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-card__icon-wrapper text-amber-500"> <FiClock size={20} /> </div>
          <div className="order-stat-card__content">
            <span className="order-stat-card__value">{pendingCount}</span>
            <span className="order-stat-card__title">Pending Count</span>
            <span className="order-stat-card__trend order-stat-card__trend--neutral">Awaiting clearance</span>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-card__icon-wrapper text-rose-500"> <FiAlertTriangle size={20} /> </div>
          <div className="order-stat-card__content">
            <span className="order-stat-card__value">{failedCount}</span>
            <span className="order-stat-card__title">Failed Count</span>
            <span className="order-stat-card__trend order-stat-card__trend--down">Requires attention</span>
          </div>
        </div>
      </motion.div>

      {/* Main Table Card (Automated) */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <CommonTable
          titleText="Transaction Logs"
          data={statusMethodFilteredTransactions}
          columns={columnsConfig}
          searchable={true}
          filters={true}
          pagination={true}
          exportable={true}
          selectable={true}
          columnSettings={true}
          onBulkDelete={handleBulkDelete}
          customFilters={
            <>
              {/* Status Selector */}
              <Select value={statusFilter} onChange={(val) => setStatusFilter(val as any)} className="custom-theme-select w-status-select" popupClassName="custom-theme-dropdown"
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'success', label: 'Success' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'refunded', label: 'Refunded' },
                ]} />

              {/* Payment Method Selector */}
              <Select value={methodFilter} onChange={(val) => setMethodFilter(val as any)} className="custom-theme-select w-method-select" popupClassName="custom-theme-dropdown"
                options={[
                  { value: 'all', label: 'All Methods' },
                  { value: 'UPI', label: 'UPI' },
                  { value: 'Credit Card', label: 'Credit Card' },
                  { value: 'Debit Card', label: 'Debit Card' },
                  { value: 'Cash', label: 'Cash' },
                ]} />
            </>
          }
        />
      </motion.div>
    </div>
  );
};

export default TransactionsTable;
