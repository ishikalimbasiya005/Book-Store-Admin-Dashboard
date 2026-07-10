import { useState, useMemo } from 'react';

export const useTableSearch = <T,>(data: T[], visibleColumns: string[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchedData = useMemo(() => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      return visibleColumns.some((colKey) => {
        const val = item[colKey as keyof T];
        if (val === undefined || val === null) return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, visibleColumns]);

  return {
    searchQuery,
    setSearchQuery,
    searchedData,
  };
};
