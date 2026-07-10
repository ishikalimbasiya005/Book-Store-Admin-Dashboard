import React from 'react';
import { Empty } from 'antd';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import type { OrderStatusCardProps } from '../../../Types';

const OrderStatusGraph: React.FC<OrderStatusCardProps> = ({ data }) => {
  const totalOrders = data.reduce((sum, item) => sum + item.count, 0);

  if (!data || data.length === 0) {
    return (
      <div className="orders-analytics-card flex flex-col justify-center items-center h-[380px]">
        <div className="text-lg font-bold mb-4 text-primary-text align-self-start px-5 w-full">Order Status</div>
        <Empty description={<span className="text-placeholder">No order status data available</span>} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="orders-analytics-card"> <div className="orders-analytics-card__header"> <span className="orders-analytics-card__title">Order Status</span> </div>
      {/* Table Headers */}
      <div className="orders-analytics-table__header">
        <div className="orders-analytics-table__header-meta">
          <div className="orders-analytics-table__header-status">STATUS</div>
          <div className="orders-analytics-table__header-count">VOLUME</div>
        </div>
        <div className="orders-analytics-table__header-bar"></div>
      </div>

      {/* Rows */}
      <div className="orders-analytics-table__body">
        {data.map((item, index) => {
          const pct = totalOrders > 0 ? (item.count / totalOrders) * 100 : 0;
          const pctLabel = `${pct.toFixed(0)}%`;

          // Format status label for cleaner look
          const displayStatus = item.status.replace(' Orders', '');
          const singleBarData = [ { name: displayStatus, count: item.count, }, ];

          return (
            <div key={index} className="orders-analytics-table__row">
              {/* Status and count meta wrapper */}
              <div className="orders-analytics-table__row-meta">
                {/* Status Name */}
                <div className="orders-analytics-table__status" title={item.status}>
                  {displayStatus}
                </div>

                {/* Count & Percentage Pill */}
                <div className="orders-analytics-table__count">
                  <span className="orders-analytics-table__pill">
                    <span>{item.count.toLocaleString()}</span>
                    <span className="text-placeholder font-medium">({pctLabel})</span>
                  </span>
                </div>
              </div>

              {/* Recharts Progress Bar */}
              <div className="orders-analytics-table__bar">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={singleBarData} margin={{ top: 4, right: 0, left: 0, bottom: 4 }} >
                    <XAxis type="number" domain={[0, totalOrders || 100]} hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip cursor={false} content={({ active, payload }) => { if (active && payload && payload.length) {
                          return (
                            <div className="orders-analytics-tooltip">
                              <p className="font-bold mb-1 text-primary-text">{item.status}</p>
                              <p className="text-xs text-placeholder"> Volume: <span className="font-semibold text-sky-500">{item.count.toLocaleString()}</span> </p>
                              <p className="text-xs text-placeholder"> Ratio: <span className="font-semibold text-emerald-500">{pct.toFixed(1)}%</span> </p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                    <Bar dataKey="count" fill={item.color} radius={[6, 6, 6, 6]} barSize={8} background={{ fill: 'var(--border-color)', opacity: 0.15, radius: 6 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default OrderStatusGraph;
