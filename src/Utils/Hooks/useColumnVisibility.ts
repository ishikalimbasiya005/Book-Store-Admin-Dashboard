import { useState, useEffect, useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { notifier } from '../../Attributes/Notification';

export const useColumnVisibility = <T,>(columns: ColumnsType<T>) => {
  const initialColumnKeys = useMemo(() => {
    if (!columns) return [];
    return columns
      .map((col) => col.key || ('dataIndex' in col ? col.dataIndex : undefined))
      .filter(Boolean)
      .map(String);
  }, [columns]);

  const tableId = useMemo(() => {
    return initialColumnKeys.join('-');
  }, [initialColumnKeys]);

  const localStorageKey = `common-table-cols-${tableId}`;

  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.log(err);
      }
    }
    return initialColumnKeys;
  });

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (!saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleColumns(initialColumnKeys);
    }
  }, [initialColumnKeys, localStorageKey]);

  const toggleColumn = (key: string, checked: boolean) => {
    let nextCols = [...visibleColumns];
    if (checked) {
      nextCols.push(key);
    } else {
      if (nextCols.length > 1) {
        nextCols = nextCols.filter((k) => k !== key);
      } else {
        notifier.warning('At least one column must remain visible.');
        return;
      }
    }
    setVisibleColumns(nextCols);
    localStorage.setItem(localStorageKey, JSON.stringify(nextCols));
  };

  const availableColumnsMeta = useMemo(() => {
    if (!columns) return [];
    return columns
      .map((col) => {
        const colKey = col.key || ('dataIndex' in col ? col.dataIndex : undefined);
        const colTitle = col.title || col.key || ('dataIndex' in col ? col.dataIndex : undefined);
        return {
          key: String(colKey || ''),
          label: String(colTitle || ''),
        };
      })
      .filter((col) => col.key && col.key !== 'actions');
  }, [columns]);

  return {
    visibleColumns,
    toggleColumn,
    availableColumnsMeta,
  };
};
