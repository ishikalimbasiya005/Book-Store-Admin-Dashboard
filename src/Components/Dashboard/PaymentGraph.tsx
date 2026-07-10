import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useAppSelector } from '../../Store/Hooks';
import { motion } from 'framer-motion';
import { paymentModesChartOptions, paymentModesChartSeries } from '../../Data/dashboard';

const PaymentGraph: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const themeMode = useAppSelector((s) => s.layout.theme);

  const dynamicOptions: ApexOptions = {
    ...paymentModesChartOptions,
    theme: { mode: themeMode },
  };

  useEffect(() => {
    const timer = setTimeout(() => { setMounted(true); }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="col-span-1 lg:col-span-4 bg-background border border-border-color rounded-[25px] text-primary-text p-4 md:p-5 flex flex-col h-[280px] md:h-[350px] min-w-0 overflow-hidden" >

      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <span className="text-lg font-bold">Payment modes</span>
        <Select defaultValue="Today" className="custom-theme-select" popupClassName="custom-theme-dropdown"
          options={[
            { value: 'Today', label: 'Today' },
            { value: 'This Week', label: 'This Week' },
          ]} />
      </div>

      {/* Chart — fills remaining space, no scrollbar */}
      <div className="flex-1 w-full min-h-0">
        {mounted && (
          <Chart options={dynamicOptions} series={paymentModesChartSeries} type="donut" height="100%" width="100%" />
        )}
      </div>
    </motion.div>
  );
};

export default PaymentGraph;