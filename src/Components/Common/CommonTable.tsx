import React, { useState, useMemo } from 'react';
import { Table, Popover, Checkbox, Select } from 'antd';
import { FiSearch, FiSettings, FiDownload, FiTrash2 } from 'react-icons/fi';
import type { CommonTableProps } from '../../Types';
import { notifier } from '../../Attributes/Notification';
import { exportToPDF } from '../../Utils/exportUtils';
import { useColumnVisibility } from '../../Utils/Hooks/useColumnVisibility';
import { useTableSearch } from '../../Utils/Hooks/useTableSearch';
import { useTableFilters, useTablePagination } from '../../Utils/Hooks/useTableFilters';
import { useTableColumns } from '../../Utils/Hooks/useTableColumns';
import { CommonButton, CommonInput } from '../../Attributes';
import { showDeleteConfirm, showActionSuccess } from './CommonMsg';

export function CommonTable<T extends object>({
  // New API props
  data, columns, searchable = false, sortable = false, pagination = false, exportable = false, columnSettings = false, filters = false, customFilters, selectable = false, onView, onEdit, onDelete, onBulkDelete, titleText,

  // Backward compatibility fallback props
  dataSource, size = 'small', rowKey = 'id', className = '', wrapperClassName = 'overflow-auto flex-1 custom-scrollbar', scroll, rowSelection, ...props 
  
}: CommonTableProps<T>) {
  const isNewApi = useMemo(() => {
    return ( data !== undefined || searchable || selectable || exportable || columnSettings || filters || customFilters !== undefined || onView !== undefined || onEdit !== undefined || onDelete !== undefined );
  }, [data, searchable, selectable, exportable, columnSettings, filters, customFilters, onView, onEdit, onDelete]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 1. Column Visibility Hook
  const { visibleColumns, toggleColumn, availableColumnsMeta } = useColumnVisibility<T>(columns || []);

  // 2. Date Filtering Hook
  const { dateFilter, setDateFilter, filteredData: dateFilteredData } = useTableFilters<T>(data || dataSource || []);

  // 3. Global Search Hook
  const { searchQuery, setSearchQuery, searchedData: filteredData } = useTableSearch<T>( dateFilteredData, visibleColumns );

  // 4. Pagination Hook
  const { rowsPerPage, setRowsPerPage } = useTablePagination(10);

  // 3. Columns Enhancements (Sorting, Visibility Filter, Row Actions)
  const enhancedColumns = useTableColumns<T>({ columns: columns || [], visibleColumns, sortable, filteredData, onView, onEdit, onDelete, });

  // Settings Popover Content
  const popoverContent = (
    <div className="columns-popover-content">
      <div className="columns-popover-grid">
        {availableColumnsMeta.map((col) => ( <Checkbox key={col.key} checked={visibleColumns.includes(col.key)} onChange={(e) => toggleColumn(col.key, e.target.checked)} className="columns-popover-checkbox" > {col.label} </Checkbox> ))}
      </div>
    </div>
  );

  // 4. Selection (Row Checkboxes & Bulk Delete Actions)
  const rowSelectionConfig = selectable ? { selectedRowKeys, onChange: (keys: React.Key[]) => { setSelectedRowKeys(keys); }, } : undefined;

  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) return;

    showDeleteConfirm({
      title: 'Confirm Bulk Deletion',
      content: `Are you sure you want to delete the ${selectedRowKeys.length} selected records? This action cannot be undone.`,
      onConfirm: () => {
        if (onBulkDelete) {
          onBulkDelete(selectedRowKeys);
        } else if (onDelete) {
          const itemsToDelete = (data || dataSource || []).filter((r) => {
            const itemKey = typeof rowKey === 'function'
              ? rowKey(r)
              : typeof rowKey === 'string'
                ? (r as Record<string, unknown>)[rowKey] as React.Key
                : ((r as Record<string, unknown>).id as React.Key || (r as Record<string, unknown>).key as React.Key);
            return selectedRowKeys.includes(itemKey);
          });
          itemsToDelete.forEach((item) => onDelete(item));
        }
        setSelectedRowKeys([]);
        showActionSuccess('Selected records', 'deleted');
      }
    });
  };

  // 5. Export Utilities 
  const handleExportPDF = () => {
    try {
      exportToPDF<T>(
        filteredData,
        columns || [],
        visibleColumns,
        typeof titleText === 'string' ? titleText : undefined
      );
      notifier.success('PDF exported successfully.');
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      notifier.warning(errMsg || 'Export failed.');
    }
  };

  // Return fallback table if not using the new simple feature-rich props API
  if (!isNewApi) {
    return (
      <div className={wrapperClassName}>
        <Table className={className} columns={columns} dataSource={dataSource} pagination={pagination === true ? undefined : pagination} size={size} rowKey={rowKey} rowSelection={rowSelection} scroll={scroll} {...props} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="orders-table-card">
        <div className="orders-analytics-card__header flex justify-between items-center w-full">
          <span className="orders-analytics-card__title">{titleText || 'Records'}</span>
          <div className="flex items-center gap-2">
            {exportable && (
              <CommonButton className="orders-export-btn" title="Export to PDF" text="Export" onClick={handleExportPDF} icon={<FiDownload size={18} />} />
            )}
            {selectable && (
              <CommonButton className="orders-delete-btn" title="Delete Selected" disabled={selectedRowKeys.length === 0} onClick={handleBulkDelete} icon={<FiTrash2 size={18} />} />
            )}
            {columnSettings && (
              <Popover content={popoverContent} title={<span className="font-bold text-xs uppercase text-placeholder">Columns displayed</span>} trigger="click" placement="bottomRight" overlayClassName="columns-popover" >
                <CommonButton className="orders-settings-btn" title="Toggle Columns" icon={<FiSettings size={18} />} />
              </Popover>
            )}
          </div>
        </div>

        {/* Filters Panel & Search input */}
        {(searchable || filters || customFilters) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 mb-4 shrink-0">
            {searchable && (
              <div className="relative w-full sm:max-w-[220px]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-placeholder z-10"> <FiSearch size={16} className="opacity-70" /> </span>
                <CommonInput type="text" placeholder="Search visible fields..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm text-primary-text placeholder-placeholder bg-background border border-border-color rounded-xl focus:outline-none focus:border-Banner-bg transition-colors" wrapperClassName="" />
              </div>
            )}

            {(filters || customFilters) && (
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto flex-nowrap pb-1 sm:pb-0">
                {filters && (
                  <Select value={dateFilter} onChange={(val) => setDateFilter(val)} className="custom-theme-select w-date-select" popupClassName="custom-theme-dropdown"
                    options={[
                      { value: 'all', label: 'All Time' },
                      { value: 'today', label: 'Today' },
                      { value: 'yesterday', label: 'Yesterday' },
                      { value: 'week', label: 'This Week' },
                      { value: 'month', label: 'This Month' },
                    ]} />
                )}
                {customFilters}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Table Grid */}
        <div className="orders-table-wrapper">
          <Table className={`orders-table ${className}`} columns={enhancedColumns} dataSource={filteredData} pagination={ pagination ? {
              pageSize: rowsPerPage,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50'],
              onShowSizeChange: (_, size) => setRowsPerPage(size),
              responsive: true,
              position: ['bottomRight'],
              showTotal: (total) => `Total ${total} records`,
            }: false
          }
            size={size}
            rowKey={rowKey}
            rowSelection={rowSelectionConfig}
            scroll={scroll || { x: 'max-content' }}
            {...props} />
        </div>
      </div>
    </div>
  );
}
