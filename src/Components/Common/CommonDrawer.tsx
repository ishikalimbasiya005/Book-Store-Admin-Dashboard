import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { CommonButton } from '../../Attributes';
import type { CommonDrawerProps } from '../../Types';

export const CommonDrawer: React.FC<CommonDrawerProps> = ({
  open,
  onClose,
  title,
  isDark = false,
  placement = 'right',
  width,
  className = '',
  showCloseButton = true,
  children,
}) => {
  const [drawerWidth, setDrawerWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth < 576 ? window.innerWidth : 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const actualWidth = width !== undefined ? width : drawerWidth;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement={placement}
      width={actualWidth}
      closable={false}
      mask={true}
      maskClosable={true}
      destroyOnClose={false}
      className={`${isDark ? 'bdd-drawer-dark' : 'bdd-drawer-light'} ${className}`} >
      <div className={`bdd-container ${isDark ? 'bdd-container-dark' : 'bdd-container-light'}`}>
        
        {/* Close Button */}
        {showCloseButton && (
          <CommonButton
            onClick={onClose}
            className={`bdd-close-btn ${isDark ? 'bdd-close-btn-dark' : 'bdd-close-btn-light'}`}
            aria-label="Close"
            icon={<CloseOutlined className="bdd-close-icon" />} />
        )}

        {/* Scrollable content area */}
        <div className="bdd-content">
          {title && ( <div className="bdd-header"> <span className="bdd-header-title">{title}</span> </div> )}
          {children}
        </div>
      </div>
    </Drawer>
  );
};
