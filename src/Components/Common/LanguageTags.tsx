import React from 'react';
import { Tag } from 'antd';
import ISO6391 from 'iso-639-1';
import type { LanguageTagsProps } from '../../Types';

export const LanguageTags: React.FC<LanguageTagsProps> = ({ languages, isDark = false }) => {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="bdd-languages-section" style={{ marginTop: '20px', padding: '16px 0', borderTop: '1px solid rgba(128, 128, 128, 0.15)' }}>
      <h3 className="bdd-description-title" style={{ marginBottom: '10px' }}>Available Languages</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {languages.map((code) => {
          const langName = ISO6391.getName(code) || code.toUpperCase();
          const nativeName = ISO6391.getNativeName(code);
          const tooltipText = nativeName && nativeName !== langName ? `${langName} (${nativeName})` : langName;
          return (
            <Tag
              key={code}
              color={isDark ? 'geekblue' : 'blue'}
              style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '13px', margin: 0, border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', backgroundColor: isDark ? '#1a233a' : '#e6f7ff', color: isDark ? '#70a1ff' : '#1890ff', }}
              title={tooltipText} >
              {langName}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};
