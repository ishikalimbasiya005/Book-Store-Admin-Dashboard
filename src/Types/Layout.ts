export interface SidebarProps {
  collapsed: boolean;
  onClose?: () => void;
}

export interface HeaderProps {
  collapsed: boolean;
  setCollapsed: ((c: boolean) => void) | React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
}
