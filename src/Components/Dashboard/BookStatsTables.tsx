import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { topSellingBooks, lowStockBooks } from '../../Data/books';
import { getTopSellingColumns, getLowStockColumns } from '../../Data/dashboard';
import { CommonTable } from '../../Components/Common';

const BookStatsTables = () => {
  const columnsTopSelling = getTopSellingColumns();
  const columnsLowStock = getLowStockColumns();

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }} className="flex flex-col gap-5 h-full">
      {/* Top Selling Books Table */}
      <div className="bg-background border border-border-color rounded-[25px] p-4 md:p-6 flex-1 flex flex-col min-h-0">
        <CommonTable 
          className="top-selling-table" 
          columns={columnsTopSelling} 
          data={topSellingBooks} 
          filters={true}
          searchable={false}
          pagination={false}
          titleText={
            <div className="flex items-center gap-2">
              <div className="stats-icon-up w-6 h-6 rounded-full flex items-center justify-center">
                <ArrowUpOutlined className="text-sm" />
              </div>
              <span className="text-base md:text-lg font-bold text-primary-text">Top Selling Books</span>
            </div>
          } />

        <div className="text-right mt-3 shrink-0">
          <span className="text-blue-800 cursor-pointer hover:underline text-sm font-medium">See more →</span>
        </div>
      </div>

      {/* Low Stock Books Table */}
      <div className="bg-background border border-border-color rounded-[25px] p-4 md:p-6 flex-1 flex flex-col min-h-0">
        <CommonTable 
          className="low-stock-table" 
          columns={columnsLowStock} 
          data={lowStockBooks} 
          filters={true}
          searchable={false}
          pagination={false}
          titleText={
            <div className="flex items-center gap-2">
              <div className="stats-icon-down w-6 h-6 rounded-full flex items-center justify-center">
                <ArrowDownOutlined className="text-sm" />
              </div>
              <span className="text-base md:text-lg font-bold text-primary-text">Low Stock</span>
            </div>
          } />

        <div className="text-right mt-3 shrink-0">
          <span className="text-blue-800 cursor-pointer hover:underline text-sm font-medium">See more →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookStatsTables;
