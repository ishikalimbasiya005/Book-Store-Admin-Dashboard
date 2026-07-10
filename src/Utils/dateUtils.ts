// Helper to convert Date to YYYY-MM-DD string
export const getLocalDateString = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to check if a date string is Today
export const isToday = (dateStr: string, referenceDate: Date = new Date()): boolean => {
  const todayStr = getLocalDateString(referenceDate);
  return dateStr === todayStr;
};

// Helper to check if a date string is Yesterday
export const isYesterday = (dateStr: string, referenceDate: Date = new Date()): boolean => {
  const yesterday = new Date(referenceDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterday);
  return dateStr === yesterdayStr;
};

// Helper to check if a date string is within the past 7 days (This Week)
export const isThisWeek = (dateStr: string, referenceDate: Date = new Date()): boolean => {
  const date = new Date(dateStr);
  const diffTime = Math.abs(referenceDate.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

// Helper to check if a date string is in the same month and year (This Month)
export const isThisMonth = (dateStr: string, referenceDate: Date = new Date()): boolean => {
  const date = new Date(dateStr);
  return date.getMonth() === referenceDate.getMonth() && date.getFullYear() === referenceDate.getFullYear();
};

// Helper to search a record for common date fields
export const findDateField = (record: any): string | null => {
  if (!record) return null;
  const keys = Object.keys(record);
  const commonKeys = ['timestamp', 'requestDate', 'orderDate', 'date', 'dateTime', 'createdAt'];
  for (const key of commonKeys) {
    if (keys.includes(key)) return key;
  }
  return keys.find((k) => k.toLowerCase().includes('date') || k.toLowerCase().includes('time')) || null;
};

export const checkDateFilter = (
  dateStr: string,
  filterType: string,
  referenceDate: Date = new Date('2026-06-15')
): boolean => {
  if (!dateStr || filterType === 'all') return true;
  const datePart = dateStr.split(' ')[0];

  switch (filterType) {
    case 'today':
      return isToday(datePart, referenceDate);
    case 'yesterday':
      return isYesterday(datePart, referenceDate);
    case 'week':
      return isThisWeek(datePart, referenceDate);
    case 'month':
      return isThisMonth(datePart, referenceDate);
    default:
      return true;
  }
};

