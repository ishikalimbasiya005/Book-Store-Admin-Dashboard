import { WorldMap, type CountryContext, type ISOCode } from "react-svg-worldmap";
import { useAppSelector } from "../../Store/Hooks";
import { Select } from 'antd';
import { motion } from 'framer-motion';
import { countryData } from '../../Data/dashboard';
import type { CountryDataItem } from '../../Types';

const CountryStats = () => {
  const themeMode = useAppSelector((s) => s.layout.theme);
  const isDark = themeMode === 'dark';
  const mapData = countryData.map((item: CountryDataItem) => ({ country: item.code as ISOCode, value: item.users }));

  const styleFunction = <T extends string | number>(context: CountryContext<T>) => {
    const { countryValue } = context;
    if (countryValue === undefined) {
      return { fill: isDark ? '#e2e8f0' : '#475569', stroke: isDark ? '#4b5563' : '#cbd5e1', strokeWidth: 1, strokeOpacity: 0.5, };
    }
    return {
      fill: isDark ? '#8b5cf6' : '#6d28d9',
      stroke: isDark ? '#4b5563' : '#cbd5e1',
      strokeWidth: 1,
      strokeOpacity: 1,
      cursor: 'pointer',
    };
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="bg-background border border-border-color rounded-[25px] p-4 md:p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-primary-text text-lg md:text-xl font-bold">Country Stats</h2>
        <Select defaultValue="This Month" className="custom-theme-select" popupClassName="custom-theme-dropdown" style={{ width: 110 }}
          options={[
            { value: 'This Month', label: 'This Month' },
            { value: 'This Week', label: 'This Week' },
            { value: 'This Year', label: 'This Year' },
          ]}
        />
      </div>

      {/* Map — responsive */}
      <div className="flex items-center justify-center mb-4 md:mb-6 w-full overflow-hidden">
        <WorldMap color={isDark ? '#818cf8' : '#4f46e5'} backgroundColor="transparent" size="responsive" data={mapData} styleFunction={styleFunction} />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 text-primary-text text-xs md:text-sm font-medium pb-3 border-b border-gray-600">
        <div>Country</div>
        <div>Users</div>
        <div className="text-right">Bounce Rate</div>
      </div>

      {/* Table Rows */}
      {countryData.map((item: CountryDataItem, index: number) => (
        <motion.div key={index} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }} className="grid grid-cols-3 py-3 md:py-5 border-b border-gray-700 last:border-0">
          <div className="flex items-center gap-1 md:gap-3 text-primary-text min-w-0">
            <img src={item.flag} alt={item.country} className="w-6 h-4 object-cover rounded md:text-xl shrink-0"/>
            <span className="truncate text-xs md:text-sm">{item.country}</span>
          </div>
          <div className="text-primary-text opacity-90 text-xs md:text-sm">
            {item.users.toLocaleString()}
          </div>
          <div className="text-right text-primary-text opacity-90 text-xs md:text-sm">
            {item.bounceRate}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CountryStats;