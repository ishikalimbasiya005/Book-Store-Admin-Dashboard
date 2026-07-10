import { Select } from 'antd';
import { MdKeyboardArrowDown } from 'react-icons/md';
import type { CommonSelectProps, OptionType } from '../../Types';

export function CommonSelect<ValueType = unknown>({ options, placeholder, value, onChange, className = '', status, mode, style, width, ...props }: CommonSelectProps<ValueType>) {
  return (
    <Select<ValueType, OptionType>
      showSearch
      allowClear
      mode={mode}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      status={status}
      style={{ width: width || '100%', ...style }}
      suffixIcon={<MdKeyboardArrowDown style={{ fontSize: 18, color: 'var(--primary-text)' }} />}
      options={options}
      filterOption={(input, option) => {
        if (!option) return false;
        const searchInput = input.toLowerCase();
        return (
          (option.label || '').toLowerCase().includes(searchInput) ||
          (option.englishName || '').includes(searchInput) ||
          (option.nativeName || '').includes(searchInput) ||
          (option.code || '').includes(searchInput)
        );
      }}
      {...props} />
  );
}
