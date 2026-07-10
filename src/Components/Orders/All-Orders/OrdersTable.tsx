import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CommonTable } from '../../../Components/Common';
import { getOrderTableColumns } from '../../../Data/Orders/All-Order/columns';
import { useOrderStore } from '../../../Store/useOrderStore';
import type { OrderRecord } from '../../../Types';

const OrdersTable: React.FC = () => {
  const navigate = useNavigate();
  const { orders, loadOrders } = useOrderStore();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleViewOrder = (record: OrderRecord) => {
    console.log('Navigating to details for record:', record);
    navigate('/orders-all/9503842');
  };

  const columnsConfig = getOrderTableColumns();

  const handleBulkDelete = (keys: React.Key[]) => {
    const remainingOrders = orders.filter((o) => !keys.includes(o.id));
    useOrderStore.getState().setOrders(remainingOrders);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
      <CommonTable
        titleText="Orders List"
        data={orders}
        columns={columnsConfig}
        searchable={true}
        filters={true}
        pagination={true}
        exportable={true}
        selectable={true}
        columnSettings={true}
        onBulkDelete={handleBulkDelete}
        onView={handleViewOrder} />
    </motion.div>
  );
};

export default OrdersTable;