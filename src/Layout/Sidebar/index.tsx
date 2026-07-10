import { Menu, Layout } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../Constants";
import type { SidebarProps } from "../../Types";
import { MdOutlineSpaceDashboard, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineRead } from "react-icons/ai";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { BsListCheck, BsArrowReturnLeft, BsCreditCard2Back } from "react-icons/bs";
import { LuMessageSquareText } from "react-icons/lu";
import { CommonButton } from "../../Attributes";
import Lottie from "lottie-react";
import shopAnimation from "../../animation/Shop design 4K video animation.json";

const LottieComponent = (Lottie as { default?: typeof Lottie }).default || Lottie;

const { Sider } = Layout;

const Sidebar = ({ collapsed, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOrdersActive = location.pathname.startsWith("/orders-all") || ["/orders-returns", "/orders-transactions"].includes(location.pathname);
  const [ordersOpen, setOrdersOpen] = useState(() => isOrdersActive);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    if (!isOrdersActive) {
      setOrdersOpen(false);
    }
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "1") navigate(ROUTES.DASHBOARD);
    if (key === "2") navigate(ROUTES.BOOKS);
    if (key === "4") navigate(ROUTES.MESSAGES);
    if (onClose) onClose();
  };

  const getSelectedKeys = () => {
    if (isOrdersActive) return [];
    if (location.pathname === ROUTES.BOOKS) return ["2"];
    if (location.pathname === ROUTES.DASHBOARD) return ["1"];
    if (location.pathname === ROUTES.MESSAGES) return ["4"];
    return [];
  };

  const content = (
    <div className="flex flex-col h-full bg-background">
      {/* Logo */}
      <div className="logo-section shrink-0" style={{ padding: "12px 24px 6px" }}>
        <img src="/assets/Images/Book-Logo.png" alt="Logo" className="logo" />
        {(!collapsed || onClose) && <span className="logo-brand-name">Readora</span>}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <Menu style={{ display: "flex", flexDirection: "column", borderRight: 0 }} selectedKeys={getSelectedKeys()} onClick={handleMenuClick} items={[
            {
              key: "1",
              icon: <MdOutlineSpaceDashboard size={30} style={{ minWidth: 30, minHeight: 30, verticalAlign: "middle", marginTop: "-5px" }} />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <AiOutlineRead size={30} style={{ minWidth: 30, minHeight: 30, verticalAlign: "middle", marginTop: "-5px" }} />,
              label: "Books",
            },
          ]} />

        <div className="orders-wrapper">
          <CommonButton
            unstyled={true}
            className={`orders-trigger ${ordersOpen ? "orders-trigger--open" : ""} ${isOrdersActive ? "orders-trigger--active" : ""}`}
            onClick={() => setOrdersOpen((o) => !o)}
            aria-expanded={ordersOpen}>
            <span className="orders-trigger__left">
              <TfiShoppingCartFull className="orders-trigger__icon" />
              {(!collapsed || onClose) && <span className="orders-trigger__text">Orders</span>}
            </span>
            {(!collapsed || onClose) && ( <MdKeyboardArrowRight className={`orders-trigger__arrow ${ordersOpen ? "orders-trigger__arrow--open" : ""}`} />
            )}
          </CommonButton>

          {/* Animated submenu */}
          <div className={`orders-submenu ${ordersOpen ? "orders-submenu--open" : ""}`}>
            <div className="orders-submenu__inner">
              {/* Vertical line */}
              <div className="orders-submenu__line" />
              <div className="orders-submenu__items">
                {[
                  { key: "orders-all", icon: <BsListCheck size={15} />, label: "All Orders" },
                  { key: "orders-returns", icon: <BsArrowReturnLeft size={15} />, label: "Returns & Refunds" },
                  { key: "orders-transactions",icon: <BsCreditCard2Back size={15} />,label: "Transactions" },
                ].map((item) => (
                  <CommonButton
                    key={item.key}
                    unstyled={true}
                    className={`orders-sub-item ${location.pathname === `/${item.key}` || (item.key === 'orders-all' && location.pathname.startsWith('/orders-all')) ? "orders-sub-item--active" : ""}`}
                    onClick={() => { navigate(`/${item.key}`); if (onClose) onClose(); }} >
                    <span className="orders-sub-item__dot" />
                    <span className="orders-sub-item__icon">{item.icon}</span>
                    <span className="orders-sub-item__label">{item.label}</span>
                  </CommonButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Message Menu */}
        <Menu className="sidebar-menu-secondary" style={{ display: "flex", flexDirection: "column", borderRight: 0 }} selectedKeys={getSelectedKeys()} onClick={handleMenuClick}
          items={[
            {
              key: "4",
              icon: <LuMessageSquareText  size={30} style={{ minWidth: 30, minHeight: 30, verticalAlign: "middle", marginTop: "-5px" }} />,
              label: "Messages",
            },
          ]} />
      </div>

      {/* Upgrade Banner */}
      {!collapsed && !onClose && (
        <div className="shrink-0 p-4 mb-4 mx-4 bg-hover rounded-2xl flex flex-col items-center text-center shadow-lg border border-border-color">
          <LottieComponent animationData={shopAnimation} loop={true} style={{ width: '100%', maxWidth: '120px', height: 'auto', marginBottom: '0.75rem' }} />
          <h3 className="text-primary-text! font-bold text-lg mb-1">Upgrade Pro+</h3>
          <p className="text-primary-text text-xs mb-4">Try all features for your shop free 1 month</p>
          <CommonButton className="upgrade-btn text-white font-semibold text-sm px-6 py-2 rounded-full hover:opacity-90 transition-opacity w-full" text="Upgrade Pro+" />
        </div>
      )}
    </div>
  );

  if (onClose) {
    return ( <div style={{ height: "100vh", width: "100%", overflow: "hidden" }}> {content} </div> );
  }

  return ( <Sider trigger={null} collapsible collapsed={collapsed} style={{ overflow: "hidden", height: "100vh", position: "sticky", top: 0, left: 0 }}> {content} </Sider> );
};

export default Sidebar;