import type { SelectProps, TableProps, TablePaginationConfig } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  unstyled?: boolean;
}

export interface CommonRatingProps {
  value: number;
  name?: string;
  precision?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChange?: (event: React.SyntheticEvent, value: number | null) => void;
}

export interface LanguageTagsProps {
  languages?: string[];
  isDark?: boolean;
}

export interface CommonDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  isDark?: boolean;
  children: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  className?: string;
  showCloseButton?: boolean;
}

export interface CommonInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  touched?: boolean;
  wrapperClassName?: string;
  prefix?: React.ReactNode;
}

export interface LanguageFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface OptionType {
  value: string;
  label: string;
  englishName?: string;
  nativeName?: string;
  code?: string;
}

export interface CommonSelectProps<ValueType = unknown> extends Omit<SelectProps<ValueType, OptionType>, 'options'> {
  options: OptionType[];
  width?: string | number;
}

export interface CommonTableProps<T> extends Omit<TableProps<T>, 'columns' | 'pagination'> {
  // New Simple/Feature-Rich API
  data?: T[];
  columns?: ColumnsType<T>;
  searchable?: boolean;
  sortable?: boolean;
  pagination?: TablePaginationConfig | boolean;
  exportable?: boolean;
  columnSettings?: boolean;
  filters?: boolean;
  customFilters?: React.ReactNode;
  selectable?: boolean;
  onView?: (record: T) => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onBulkDelete?: (keys: React.Key[]) => void;
  titleText?: React.ReactNode | string;

  // Existing support (backward compatibility)
  dataSource?: T[];
  wrapperClassName?: string;
}

// Notification
export type SuccessPresetKey =
  | 'login'
  | 'register'
  | 'create'
  | 'update'
  | 'delete'
  | 'pdfExport'
  | 'upload'
  | 'passwordChange'
  | 'profileUpdate';

export type ErrorPresetKey =
  | 'login'
  | 'register'
  | 'save'
  | 'delete'
  | 'pdfExport'
  | 'generic'
  | 'network';

export type WarningPresetKey =
  | 'selectRecord'
  | 'unsavedChanges'
  | 'sessionExpiry';

export type InfoPresetKey =
  | 'logout'
  | 'exportStart'
  | 'loading';

export interface NotificationOptions {
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom';
  key?: string;
  onClick?: () => void;
  onClose?: () => void;
}

export interface TableColumnsProps<T> {
  columns: ColumnsType<T>;
  visibleColumns: string[];
  sortable: boolean;
  filteredData: T[];
  onView?: (record: T) => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
}

export interface DeleteConfirmOptions {
  title?: string;
  content?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}