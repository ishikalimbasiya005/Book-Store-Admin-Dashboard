import { motion } from 'framer-motion';
import type { StatCardProps } from '../../../Types/Order';
import { statsData } from '../../../Data/Orders';

const StatCard = ({ icon, title, value, trendText, trendType }: StatCardProps) => {
  return (
    <div className="order-stat-card">
      <div className="order-stat-card__icon-wrapper"> {icon} </div>
      <div className="order-stat-card__content">
        <span className="order-stat-card__value">{value}</span>
        <span className="order-stat-card__title">{title}</span>
        {trendText && ( <span className={`order-stat-card__trend order-stat-card__trend--${trendType || 'neutral'}`}> {trendText} </span> )}
      </div>
    </div>
  );
};

const OrderStatsCards = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="order-stats-grid" >
      {statsData.map((stat, idx) => (
        <StatCard key={idx} icon={stat.icon} title={stat.title} value={stat.value} trendText={stat.trendText} trendType={stat.trendType} />
      ))}
    </motion.div>
  );
};

export default OrderStatsCards;
