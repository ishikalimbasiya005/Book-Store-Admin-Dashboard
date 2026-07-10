import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import OrderStatusCard from './OrderStatusGraph';
import RecentPaymentsCard from './RecentPaymentsCard';
import OrdersTable from './OrdersTable';
import { useOrderAnalyticsStore } from '../../../Store/useOrderAnalyticsStore';

const OrdersAnalytics: React.FC = () => {
  const { orderStatusData, paymentData, loading, error, fetchAnalytics } = useOrderAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const antIcon = <LoadingOutlined style={{ fontSize: 40, color: 'var(--Banner-bg)' }} spin />;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[380px] bg-background border border-border-color rounded-[25px] w-full">
        <Spin indicator={antIcon} tip={<span className="text-placeholder mt-2 block">Loading analytics...</span>} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[380px] bg-background border border-border-color rounded-[25px] w-full text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <OrderStatusCard data={orderStatusData} />
        <RecentPaymentsCard data={paymentData} />
      </div>
      <OrdersTable />
    </div>
  );
};

export default OrdersAnalytics;

