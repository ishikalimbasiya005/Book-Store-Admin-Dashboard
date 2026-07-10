import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiBox, FiTruck, FiCheck } from 'react-icons/fi';
import { CommonButton } from '../../../Attributes';
import { notifier } from '../../../Attributes/Notification';
import { mockOrderDetails } from '../../../Data';
import type { PurchasedBookItem } from '../../../Types';
import type { ColumnsType } from 'antd/es/table';
import { CommonTable } from '../../Common';


const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const mockOrder = {
    ...mockOrderDetails, id: orderId || mockOrderDetails.id
  };

  const handleCancelItem = (item: PurchasedBookItem) => {
    notifier.info(`Cancel requested for: ${item.title}`);
  };

  const columns: ColumnsType<PurchasedBookItem> = [
    {
      title: 'Product Name',
      key: 'productName',
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-12 rounded overflow-hidden flex items-center justify-center shrink-0 ${item.coverColor}`}>
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-xs font-bold">{item.title.charAt(0)}</span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-primary-text truncate text-sm">{item.title}</span>
            <span className="text-xs text-placeholder truncate">ID: #{item.id}</span>
          </div>
        </div>
      ),
    },
    { title: 'Category', dataIndex: 'category', key: 'category', render: (text: string) => <span className="text-primary-text text-sm">{text}</span>, },
    { title: 'Items', dataIndex: 'quantity', key: 'quantity', render: (val: number) => <span className="text-primary-text text-sm font-medium">{val}</span>, },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (val: number) => <span className="text-primary-text text-sm">${val.toFixed(2)}</span>, },
    { title: 'Total', key: 'total', render: (_, item) => ( <span className="text-primary-text text-sm font-semibold">${(item.quantity * item.price).toFixed(2)}</span> ), },
    { title: 'Action', key: 'action',
      render: (_, item) => (
        <CommonButton onClick={() => handleCancelItem(item)} className="order-details-cancel-btn text-rose-500 hover:text-rose-400 font-extrabold text-sm transition-colors cursor-pointer" text="Cancel" />
      ),
    },
  ];

  const totalItemsCount = mockOrder.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="order-details-container flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="order-details-header flex items-center gap-4">
        <CommonButton className="order-details-back-btn" onClick={() => navigate('/orders-all')} icon={<FiArrowLeft size={20} />} title="Back to Orders" />
        <h2 className="order-details-title">Order Details</h2>
      </div>

      {/* Order Info Banner Card */}
      <div className="order-info-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="order-info-id">Order ID: #{mockOrder.id}</h3>
          <span className="order-info-customer">Customer: {mockOrder.customerName}</span>
          <span className="order-info-date">Placed on: {mockOrder.orderDate}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge-status badge-${mockOrder.paymentStatus.toLowerCase()}`}> {mockOrder.paymentStatus.toLowerCase()} </span>
          <span className="payment-method-badge">{mockOrder.paymentMethod}</span>
        </div>
      </div>

      {/* Info Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-6">
        <div className="order-stat-card">
          <div className="order-stat-card__icon-wrapper"> <FiCalendar size={24} /> </div>
          <div className="order-stat-card__content">
            <span className="order-stat-card__value">{mockOrder.orderDate.split(',')[0]}</span>
            <span className="order-stat-card__title">Order Date</span>
          </div>
        </div>
        <div className="order-stat-card">
          <div className="order-stat-card__icon-wrapper"> <FiBox size={24} /> </div>
          <div className="order-stat-card__content">
            <span className="order-stat-card__value">{totalItemsCount} pcs</span>
            <span className="order-stat-card__title">Total Items</span>
          </div>
        </div>
        <div className="order-stat-card">
          <div className="order-stat-card__icon-wrapper"> <FiTruck size={24} /> </div>
          <div className="order-stat-card__content">
            <span className="order-stat-card__value">{mockOrder.deliveryDate}</span>
            <span className="order-stat-card__title">Delivery Date</span>
          </div>
        </div>
      </div>

      {/* Content Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Books Table */}
        <div className="lg:col-span-8 order-table-details-card">
          <div className="order-table-details-card__header mb-4">
            <h3 className="order-table-details-card__title">Purchased Books</h3>
          </div>
          <CommonTable className="order-details-table" columns={columns} dataSource={mockOrder.items} pagination={false} rowKey="id" scroll={{ x: 'max-content' }} />
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-4 order-summary-detail-card">
          <h3 className="order-summary-detail-card__title">Order Summary</h3>
          <div className="order-summary-detail-card__list">
            <div className="order-summary-detail-card__item">
              <span>Sub-Total</span>
              <span>${mockOrder.summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="order-summary-detail-card__item">
              <span>Shipping</span>
              <span>${mockOrder.summary.shipping.toFixed(2)}</span>
            </div>
            <div className="order-summary-detail-card__item">
              <span>Discount</span>
              <span>-${mockOrder.summary.discount.toFixed(2)}</span>
            </div>
            <div className="order-summary-detail-card__item">
              <span>Tax</span>
              <span>${mockOrder.summary.tax.toFixed(2)}</span>
            </div>
            <div className="order-summary-detail-card__divider" />
            <div className="order-summary-detail-card__item order-summary-detail-card__item--grand">
              <span>Total</span>
              <span>${mockOrder.summary.grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <span className="order-summary-detail-card__pay-btn">Pay with Credit Card</span>
        </div>
      </div>

      {/* Bottom: Customer Address Card */}
      <div className="order-customer-details-card">
        <h3 className="order-customer-details-card__title">Customer Information</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
          {mockOrder.avatar && ( <img src={mockOrder.avatar} alt={mockOrder.customerName} className="w-20 h-20 rounded-xl object-cover shrink-0 border border-border-color/20" /> )}
          <div className="flex flex-col gap-2 min-w-0">
            <h4 className="font-bold text-lg text-primary-text leading-tight">{mockOrder.customerName}</h4>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5 text-sm text-placeholder">
                <FiMail size={16} className="text-placeholder shrink-0" />
                <span>{mockOrder.email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-placeholder">
                <FiPhone size={16} className="text-placeholder shrink-0" />
                <span>{mockOrder.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-placeholder">
                <FiMapPin size={16} className="text-placeholder shrink-0" />
                <span>{mockOrder.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 2: Order Tracking Card */}
      {mockOrder.tracking && mockOrder.tracking.length > 0 && (
        <div className="order-tracking-card">
          <h3 className="order-tracking-card__title">Order Tracking</h3>
          <div className="flex flex-col">
            {mockOrder.tracking.map((step, idx) => {
              const isActive = step.status === 'active';
              const isLast = idx === mockOrder.tracking!.length - 1;
              return (
                <div key={idx} className="flex gap-4 relative pb-6 last:pb-0">
                  {/* Timeline connecting line */}
                  {!isLast && ( <div className={`tracking-line ${ isActive ? 'tracking-line--active' : 'tracking-line--inactive' }`} /> )}
                  {/* Timeline indicator node */}
                  <div className="relative z-10 flex items-center justify-center shrink-0 w-6 h-6">
                    {isActive ? ( <div className="tracking-dot--active"><FiCheck size={14} /></div> ) : ( <div className="tracking-dot--inactive" /> )}
                  </div>
                  {/* Timeline step content */}
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start w-full gap-2">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-semibold text-sm text-primary-text">{step.title}</span>
                      <span className="text-xs text-placeholder">{step.subtitle}</span>
                    </div>
                    <span className="text-xs text-placeholder shrink-0 whitespace-nowrap sm:text-right"> {step.timestamp} </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
