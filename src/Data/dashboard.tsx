import type { ColumnsType } from 'antd/es/table';
import type { ApexOptions } from 'apexcharts';
import type { CountryDataItem, BookType } from '../Types';

export const getTopSellingColumns = <
  T extends BookType & { rank: number } = BookType & { rank: number }
>(): ColumnsType<T> => [
  {
    title: 'Book Name',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: T) => (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-10 ${record.coverColor} rounded flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0`}>
          #{record.rank}
        </div>
        <span className="font-medium">{text}</span>
      </div>
    ),
  },
  { title: 'Author', dataIndex: 'author', key: 'author' },
  {
    title: 'Sales Count',
    dataIndex: 'sales',
    key: 'sales',
    align: 'right',
    render: (val: number) => `${val.toLocaleString()} Units`,
  },
];

export const getLowStockColumns = <
  T extends BookType = BookType
>(): ColumnsType<T> => [
  {
    title: 'Book Name',
    dataIndex: 'title',
    key: 'title',
    render: (text: string, record: T) => (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-10 ${record.coverColor} rounded flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0`}>
           <img src={record.image} alt={text} className="w-full h-full object-cover border rounded" />
        </div>
        <span className="font-medium">{text}</span>
      </div>
    ),
  },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  {
    title: 'Remaining Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'right',
    render: (val: number) => (
      <span className={val <= 5 ? 'text-red-500 font-bold' : 'text-orange-500 font-medium'}>
        {val} Units
      </span>
    ),
  },
];


export const countryData: CountryDataItem[] = [
  {
    country: "United States",
    users: 17003,
    bounceRate: "0.83%",
    flag: "/assets/Images/US-Flag.jpg",
    code: "us",
  },
  {
    country: "India",
    users: 19450,
    bounceRate: "0.45%",
    flag: "/assets/Images/India-Flag.png",
    code: "in",
  },
  {
    country: "Germany",
    users: 14285,
    bounceRate: "0.49%",
    flag: "/assets/Images/Germany-Flag.png",
    code: "de",
  },
  {
    country: "Australia",
    users: 9573,
    bounceRate: "0.18%",
    flag: "/assets/Images/Australia-Flag.png",
    code: "au",
  },
];


export const salesChartOptions: ApexOptions = {
  chart: {
    width: '100%',
    toolbar: { show: false },
    background: 'transparent',
    zoom: { enabled: false },
    selection: { enabled: false },
  },
  colors: ['#7C3AED'],
  stroke: { curve: 'smooth', width: 3, colors: ['#7C3AED'] },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  theme: { mode: 'dark' },
  grid: {
    padding: { top: 20, right: 40, left: 40, bottom: 0 },
    borderColor: '#000000',
    yaxis: { lines: { show: true } },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisBorder: { show: true, color: '#000000' },
    axisTicks: { show: true },
    labels: { style: { colors: '#000000' } },
  },
  yaxis: {
    axisBorder: { show: true, color: '#000000' },
    axisTicks: { show: true },
    labels: { style: { colors: '#000000' } },
  },
  tooltip: { theme: 'dark' },
};

export const salesChartSeries = [
  { name: 'Visits', data: [30, 40, 35, 60, 45, 70] },
];

export const paymentModesChartOptions: ApexOptions = {
  chart: {
    width: '100%',
    type: "donut",
    background: 'transparent',
    fontFamily: 'inherit',
  },
  colors: ['#6D28D9', '#65A30D', '#E5E7EB', '#D97706'],
  labels: ["UPI", "Cash", "Debit card", "Credit card"],
  theme: { mode: 'dark' },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.4,
      opacityFrom: 1,
      opacityTo: 1,
    },
  },
  plotOptions: {
    pie: {
      customScale: 0.95,
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
      expandOnClick: false,
      donut: {
        size: "65%",
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#ffffff',
            formatter: () => '100%',
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (_val, opts) {
      const value = opts?.w?.config?.series?.[opts?.seriesIndex] ?? 0;
      return `${value}%`;
    },
    dropShadow: { enabled: false }
  },
  stroke: { width: 2, colors: ['#1e293b'] },
  legend: {
    position: "left",
    horizontalAlign: "left",
    offsetY: 10,
    offsetX: 10,
    fontSize: '14px',
    itemMargin: { vertical: 3 },
    markers: { size: 10 }
  },
};

export const paymentModesChartSeries = [58, 29, 20, 15];
