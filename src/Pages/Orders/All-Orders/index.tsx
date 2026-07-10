import OrdersBanner from '../../../Components/Orders/All-Orders/OrdersBanner';
import OrderStatsCards from '../../../Components/Orders/All-Orders/OrderStatsCards';
import OrdersAnalytics from '../../../Components/Orders/All-Orders/OrdersAnalytics';

const AllOrders = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <OrdersBanner />
      <OrderStatsCards />
      <OrdersAnalytics />
    </div>
  );
};

export default AllOrders;

