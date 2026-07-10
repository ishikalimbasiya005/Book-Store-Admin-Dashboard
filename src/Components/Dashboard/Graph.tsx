import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useAppSelector } from '../../Store/Hooks';
import { motion } from 'framer-motion';
import { salesChartOptions, salesChartSeries } from '../../Data/dashboard';

const Graph: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const themeMode = useAppSelector((s) => s.layout.theme);

  const axisColor = themeMode === 'dark' ? '#ffffff' : '#000000';

  const dynamicOptions: ApexOptions = {
    ...salesChartOptions,
    theme: { mode: themeMode },
    tooltip: { theme: themeMode },
    grid: {
      ...salesChartOptions.grid,
      borderColor: axisColor,
      yaxis: { lines: { show: true, }, },
    },
    xaxis: {
      ...salesChartOptions.xaxis,
      axisBorder: { show: true, color: axisColor, },
      axisTicks: { show: true, },
      labels: { style: { colors: axisColor, }, },
    },
    yaxis: {
      ...salesChartOptions.yaxis,
      axisBorder: { show: true, color: axisColor, },
      axisTicks: { show: true, },
      labels: { style: { colors: axisColor, }, },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => { setMounted(true); }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="col-span-1 lg:col-span-6 bg-background border border-border-color rounded-[25px] text-primary-text p-4 md:p-5 flex flex-col h-[280px] md:h-[350px] min-w-0 overflow-hidden" >
      <div className="text-2xl font-bold mb-4 text-primary-text"> Sales </div>
      <div className="flex-grow w-full min-h-0 relative">
        <div className="absolute inset-0"> {mounted && <Chart options={dynamicOptions} series={salesChartSeries} type="area" height="100%" width="100%" />} </div>
      </div>
    </motion.div>
  );
};

export default Graph;