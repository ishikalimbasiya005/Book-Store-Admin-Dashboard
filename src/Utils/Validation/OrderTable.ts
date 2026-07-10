import type { OrderRecord } from '../../Types';

export const validateOrdersData = (data: unknown): OrderRecord[] => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  const validMethods = ['UPI', 'Cash', 'Debit Card', 'Credit Card'];
  const validStatuses = ['Paid', 'Pending', 'Failed', 'Refunded'];

  return data.filter((item: unknown): item is OrderRecord => {
    if (!item || typeof item !== 'object') return false;

    const record = item as Record<string, unknown>;
    const { id, customerName, bookItemsCount, amount, paymentStatus, orderDate, paymentMethod, trackingNumber } = record;

    // 1. Required fields & Empty values check
    if (typeof id !== 'string' || id.trim() === '') return false;
    if (typeof customerName !== 'string' || customerName.trim() === '') return false;
    if (typeof orderDate !== 'string' || orderDate.trim() === '') return false;

    // 2. Invalid amounts check (Must be positive and a valid number)
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return false;

    // 3. Items count check (Must be non-negative integer)
    if (typeof bookItemsCount !== 'number' || isNaN(bookItemsCount) || bookItemsCount < 0) return false;

    // 4. Invalid payment methods check
    if (typeof paymentMethod !== 'string' || !validMethods.includes(paymentMethod)) return false;

    // 5. Invalid payment statuses check
    if (typeof paymentStatus !== 'string' || !validStatuses.includes(paymentStatus)) return false;

    // 6. Invalid tracking numbers check (Alphanumeric tracking string or '-')
    if (typeof trackingNumber !== 'string' || trackingNumber.trim() === '') return false;
    const trackingRegex = /^[A-Za-z0-9\s-]+$/;
    if (!trackingRegex.test(trackingNumber)) return false;

    return true;
  });
};
