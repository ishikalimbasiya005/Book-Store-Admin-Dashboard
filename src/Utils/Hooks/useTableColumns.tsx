import { useMemo } from 'react';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import { CommonButton } from '../../Attributes';
import type { TableColumnsProps } from '../../Types';
import { showDeleteConfirm } from '../../Components/Common/CommonMsg';

export const useTableColumns = <T,>({ columns, visibleColumns, sortable, filteredData, onView, onEdit, onDelete, }: TableColumnsProps<T>) => {
  return useMemo(() => {
    if (!columns) return [];

    let activeCols = columns.filter((col) => {
      const colKey = col.key || ('dataIndex' in col ? col.dataIndex : undefined);
      return colKey ? visibleColumns.includes(String(colKey)) : true;
    });

    if (sortable && filteredData.length > 0) {
      const firstRow = filteredData[0];
      activeCols = activeCols.map((col) => {
        const colKey = col.key || ('dataIndex' in col ? col.dataIndex : undefined);
        if (!colKey || col.sorter) return col;

        const sampleVal = firstRow[colKey as keyof T];
        let sorter: ((a: T, b: T) => number) | undefined = undefined;

        if (typeof sampleVal === 'number') {
          sorter = (a: T, b: T) => {
            const valA = Number(a[colKey as keyof T]) || 0;
            const valB = Number(b[colKey as keyof T]) || 0;
            return valA - valB;
          };
        } else if (typeof sampleVal === 'string') {
          const isDate = !isNaN(Date.parse(sampleVal)) && (sampleVal.includes('-') || sampleVal.includes('/'));
          if (isDate) {
            sorter = (a: T, b: T) => {
              const valA = new Date(String(a[colKey as keyof T])).getTime();
              const valB = new Date(String(b[colKey as keyof T])).getTime();
              return valA - valB;
            };
          } else {
            sorter = (a: T, b: T) => {
              const valA = String(a[colKey as keyof T] || '');
              const valB = String(b[colKey as keyof T] || '');
              return valA.localeCompare(valB);
            };
          }
        }
        return { ...col, sorter };
      });
    }

    if (onView || onEdit || onDelete) {
      activeCols.push({
        title: 'Action',
        key: 'actions',
        render: (_: unknown, record: T) => (
          <div className="action-buttons-container">
            {onView && (
              <CommonButton onClick={() => onView(record)} className="view-order-btn" title="View Details" icon={<FiEye size={16} />} />
            )}
            {onEdit && (
              <CommonButton onClick={() => onEdit(record)} className="action-approve-btn text-indigo-500 hover:text-indigo-600" title="Edit" icon={<FiEdit size={16} />} />
            )}
            {onDelete && (
              <CommonButton
                onClick={() => {
                  showDeleteConfirm({
                    title: 'Confirm Deletion',
                    content: 'Are you sure you want to delete this record?',
                    onConfirm: () => {
                      onDelete(record);
                    },
                  });
                }}
                className="action-reject-btn"
                title="Delete"
                icon={<FiTrash size={16} />}
              />
            )}
          </div>
        ),
      });
    }

    return activeCols;
  }, [columns, visibleColumns, sortable, filteredData, onView, onEdit, onDelete]);
};
