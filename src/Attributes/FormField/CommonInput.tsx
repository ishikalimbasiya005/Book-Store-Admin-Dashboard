import React from 'react';
import type { CommonInputProps } from '../../Types';

export const CommonInput: React.FC<CommonInputProps> = ({ label, error, touched, wrapperClassName = 'ebm-field', className = 'ebm-input', id, name, prefix, ...props }) => {
  return (
    <div className={wrapperClassName}>
      {label && <label className="ebm-label" htmlFor={id || name}>{label}</label>}
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {prefix}
          </div>
        )}
        <input 
          id={id || name} 
          name={name} 
          className={`${className} ${prefix ? 'pl-[40px]!' : ''} ${touched && error ? 'border-red-500' : ''}`} 
          {...props} 
        />
      </div>
      {touched && error && <div className="ebm-error">{error}</div>}
    </div>
  );
};
