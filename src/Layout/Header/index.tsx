import { Layout, Avatar, Space, Dropdown, Modal } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
const { Header } = Layout;
import type { HeaderProps } from "../../Types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../Store/Hooks';
import { toggleTheme } from '../../Store/Slice/LayoutSlice';
import { CiBellOn } from "react-icons/ci";
import { TiWeatherSunny } from "react-icons/ti";
import { RxMoon } from "react-icons/rx";
import { CommonButton } from "../../Attributes";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { useProfileStore } from "../../Store/useProfileStore";
import { useAuthStore } from "../../Store/useAuthStore";

const profileMenuItems = [
  { key: '1', label: 'My Profile' },
  { key: '3', label: 'Logout', danger: true },
];

const AppHeader = ({collapsed, setCollapsed, isMobile}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector((s) => s.layout.theme);
  const { profile } = useProfileStore();
  const logout = useAuthStore(state => state.logout);
  const isMoon = theme === 'dark';
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === '1' || key === '2') {
      navigate(ROUTES.PROFILE);
    } else if (key === '3') {
      Modal.confirm({
        title: 'Are you sure you want to logout?',
        icon: <ExclamationCircleOutlined />,
        content: 'You will be returned to the login screen.',
        okText: 'Yes, Logout',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
          logout();
          navigate(ROUTES.LOGIN);
        },
      });
    }
  };
  
  return (
    <Header style={{ padding: 0, position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="Header-section" style={{ display: 'flex', alignItems: 'center', width: '100%', paddingRight: '24px' }}>

        {/* Toggle button */}
        <CommonButton icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)} onClick={() => setCollapsed(!collapsed)} style={{ fontSize: 16, width: 64, height: 64 }} className="flex items-center justify-center text-primary-text border-none bg-transparent hover:bg-main-background transition-all duration-300 cursor-pointer" />

        {/* Header options */}
        <div className="header-option" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: 'auto' }}>
        
        <div className="theme-toggle cursor-pointer flex items-center justify-center relative w-[26px] h-[26px]" onClick={() => dispatch(toggleTheme())} >
           <span className={`icon absolute text-primary-text transition-all duration-500 ease-in-out ${ isMoon ? "opacity-100 rotate-0" : "opacity-0 -rotate-90" }`} > <RxMoon size={26} /> </span>
           <span className={`icon absolute text-primary-text transition-all duration-500 ease-in-out ${ isMoon ? "opacity-0 rotate-90" : "opacity-100 rotate-0" }`} > <TiWeatherSunny   size={26} /> </span>
        </div>

        <div className="bell">
          <span className="icon text-primary-text"><CiBellOn size={26}/></span>
        </div>

        <Dropdown menu={{ items: profileMenuItems, onClick: handleMenuClick }} trigger={['click']} placement="bottomRight">
          <div className="flex items-center cursor-pointer">
            <Space size={16} wrap className="text-primary-text ">
              <Avatar src={profile.avatar} alt={profile.name} />
            </Space>
            <DownOutlined className="text-[14px]" />
          </div>
        </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;