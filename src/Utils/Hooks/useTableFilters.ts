import { useState, useMemo } from 'react';
import { findDateField, checkDateFilter } from '../dateUtils';

// Hook for Date Filtering
export const useTableFilters = <T,>(data: T[]) => {
  const [dateFilter, setDateFilter] = useState('all');

  const filteredData = useMemo(() => {
    if (dateFilter === 'all') return data;
    return data.filter((item) => {
      const dateField = findDateField(item);
      if (!dateField) return true;
      const dateVal = String(item[dateField as keyof T]);
      return checkDateFilter(dateVal, dateFilter, new Date());
    });
  }, [data, dateFilter]);

  return {
    dateFilter,
    setDateFilter,
    filteredData,
  };
};

// Hook for Table Page Size / Pagination
export const useTablePagination = (initialPageSize = 10) => {
  const [rowsPerPage, setRowsPerPage] = useState(initialPageSize);

  return {
    rowsPerPage,
    setRowsPerPage,
  };
};
