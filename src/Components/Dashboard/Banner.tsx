import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="dashboard-banner relative overflow-hidden border-border-color" >
          <div className="rotating-circle absolute top-0 right-[21%] z-0 w-[215.821px] h-[215.821px] rounded-full" style={{ background: 'var(--banner-circle-bg)' }} />
            <div className="row">
                <div className="banner-name">June 30,2026</div>
                <div className="dashboard-title">Welcome Back! <span className='text-4xl bold '>READORA</span></div>
                <div className="dashboard-content"> Book Management System Dashboard. </div>
            </div>
            <div className="row relative z-10">
                <img className="image-banner" src="/assets/Images/dashboard-banner.png" alt="DAshboard-Banner" />
            </div>
        </motion.div>
  )
}

export default Banner