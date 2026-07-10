import type { OrderStatus, PaymentMethodStat } from '../../Types';

export const validateOrderStatusData = (data: any[] | undefined | null): OrderStatus[] => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  return data
    .filter((item): item is OrderStatus => {
      return (
        item &&
        typeof item === 'object' &&
        typeof item.status === 'string' &&
        item.status.trim() !== '' &&
        typeof item.count === 'number' &&
        !isNaN(item.count) &&
        item.count >= 0 &&
        typeof item.color === 'string' &&
        item.color.trim() !== ''
      );
    });
};

export const validatePaymentMethodData = (data: any[] | undefined | null): PaymentMethodStat[] => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  return data
    .filter((item): item is PaymentMethodStat => {
      return (
        item &&
        typeof item === 'object' &&
        typeof item.method === 'string' &&
        item.method.trim() !== '' &&
        typeof item.amount === 'number' &&
        !isNaN(item.amount) &&
        item.amount >= 0 &&
        typeof item.color === 'string' &&
        item.color.trim() !== ''
      );
    });
};
