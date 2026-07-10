import { motion } from 'framer-motion';

const OrdersBanner = () => {
  return (
    <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="orders-banner" >
      {/* Decorative rotating background circle to match dashboard banner */}
      <div className="rotating-circle orders-banner__circle" />

      <div className="orders-banner__row">
        {/* Left Side: Image Column */}
        <div className="orders-banner__image-col">
          <img className="orders-banner__image" src="assets/Images/Order-banner.png" alt="Order Delivery Fleet" />
        </div>

        {/* Right Side: Content Column */}
        <div className="orders-banner__content-col">
          <h1 className="orders-banner__title">Track Order </h1>
          <p className="orders-banner__desc"> Track, manage, and monitor your customer orders in real-time. Keep an eye on cargo fleets, handle returns, process refunds, and view transaction summaries in one unified workspace. </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersBanner;
