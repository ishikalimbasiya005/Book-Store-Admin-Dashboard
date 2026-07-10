import React from 'react';
import { Empty } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import type { PaymentMethodStat, RecentPaymentsCardProps } from '../../../Types';

const RecentPaymentsCard: React.FC<RecentPaymentsCardProps> = ({ data }) => {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  if (!data || data.length === 0) {
    return (
      <div className="orders-analytics-card flex flex-col justify-center items-center h-[380px]">
        <div className="text-lg font-bold mb-4 text-primary-text align-self-start px-5 w-full">Recent Payments</div>
        <Empty description={<span className="text-placeholder">No payment data available</span>} />
      </div>
    );
  }

  // Calculate coordinates for labels inside slices
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.04) return null; 

    return (
      <text x={x} y={y} fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="text-[10px] md:text-[11px] font-bold pointer-events-none" > {`${(percent * 100).toFixed(1)}%`} </text>
    );
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="orders-analytics-card" >
      <div className="orders-analytics-card__header"> <span className="orders-analytics-card__title">Recent Payments</span> </div>

      <div className="orders-analytics-payments-container">
        {/* Doughnut Chart Container */}
        <div className="orders-analytics-chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as PaymentMethodStat;
                    const pct = totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0;
                    return (
                      <div className="orders-analytics-tooltip">
                        <p className="font-bold mb-1 text-primary-text">{item.method}</p>
                        <p className="text-xs text-placeholder"> Amount: <span className="font-semibold text-sky-500">${item.amount.toLocaleString()}</span> </p>
                        <p className="text-xs text-placeholder"> Percentage: <span className="font-semibold text-emerald-500">{pct.toFixed(1)}%</span> </p>
                      </div>
                    );
                  }
                  return null;
                }} />
                
              <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} innerRadius="58%" outerRadius="95%" paddingAngle={3} dataKey="amount" nameKey="method" animationBegin={100} animationDuration={800} >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} className="orders-analytics-pie-slice" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Absolute Center Label */}
          <div className="orders-analytics-center-label">
            <span className="orders-analytics-center-label__title">Total Payments</span>
            <span className="orders-analytics-center-label__value">${totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Legend list */}
        <div className="orders-analytics-legend">
          {data.map((item, index) => {
            const pct = totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0;
            return (
              <div key={index} className="orders-analytics-legend__item">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0 border border-black/10" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-[14px] text-primary-text">{item.method}</span>
                </div>
                <div className="font-semibold text-[14px] text-primary-text text-right">
                  <span>${item.amount.toLocaleString()}</span>
                  <span className="text-xs text-placeholder ml-1 font-medium">({pct.toFixed(1)}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentPaymentsCard;
