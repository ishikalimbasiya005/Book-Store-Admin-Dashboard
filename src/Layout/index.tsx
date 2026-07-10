import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { CommonDrawer } from "../Components/Common";

import Sidebar from "./Sidebar";
import AppHeader from "./Header";

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100%" }}>
      {!isMobile && <Sidebar collapsed={collapsed} />}

      {isMobile && (
        <CommonDrawer placement="left" onClose={() => setDrawerOpen(false)} open={drawerOpen} width={260} className="responsive-sidebar-drawer" showCloseButton={false}> <Sidebar collapsed={false} onClose={() => setDrawerOpen(false)} /> </CommonDrawer>
      )}

      <Layout>
        <AppHeader collapsed={isMobile ? false : collapsed} setCollapsed={isMobile ? () => setDrawerOpen(true) : setCollapsed} isMobile={isMobile}/>

        <Content className="responsive-content" style={{ display: "flex", flexDirection: "column" }} >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;