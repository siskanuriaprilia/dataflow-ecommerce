import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  WifiOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function SidebarMenu({ defaultKey = "dashboard" }) {
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    if (key === "logout") {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      navigate(`/${key}`);
    }
  };

  return (
    <>
      <Sider 
        theme="light" 
        collapsible
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Background Element */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-30%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }} />

        {/* Logo/Brand Section */}
        <div
          style={{
            color: "white",
            padding: '24px 20px',
            fontWeight: "700",
            fontSize: '18px',
            textAlign: "center",
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
            <WifiOutlined style={{ fontSize: '24px', color: 'white' }} />
          </div>
          <div style={{ fontSize: '16px', letterSpacing: '0.5px' }}>
            Admin Panel
          </div>
          <div style={{ 
            fontSize: '11px', 
            fontWeight: '400', 
            opacity: 0.8,
            marginTop: '4px'
          }}>
            E-Commerce Data
          </div>
        </div>

        {/* Menu Items */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultKey]}
          onClick={({ key }) => handleMenuClick(key)}
          style={{
            background: 'transparent',
            border: 'none',
            position: 'relative',
            zIndex: 1,
          }}
          items={[
            { 
              key: "dashboard", 
              icon: <DashboardOutlined style={{ fontSize: '18px' }} />, 
              label: <span style={{ fontSize: '15px', fontWeight: '500' }}>Dashboard</span>
            },
            { 
              key: "customers", 
              icon: <UserOutlined style={{ fontSize: '18px' }} />, 
              label: <span style={{ fontSize: '15px', fontWeight: '500' }}>Pelanggan</span>
            },
            { 
              key: "packages", 
              icon: <ShoppingCartOutlined style={{ fontSize: '18px' }} />, 
              label: <span style={{ fontSize: '15px', fontWeight: '500' }}>Paket Data</span>
            },
            { 
              key: "transactions", 
              icon: <WifiOutlined style={{ fontSize: '18px' }} />, 
              label: <span style={{ fontSize: '15px', fontWeight: '500' }}>Transaksi</span>
            },
            { 
              key: "logout", 
              icon: <LogoutOutlined style={{ fontSize: '18px' }} />, 
              label: <span style={{ fontSize: '15px', fontWeight: '500' }}>Keluar</span>,
              style: { marginTop: '24px' }
            },
          ]}
        />
      </Sider>

      {/* Custom Styles */}
      <style>{`
        /* Menu Item Styling */
        .ant-menu-dark .ant-menu-item {
          margin: 6px 12px;
          border-radius: 10px;
          padding: 12px 16px !important;
          height: auto;
          line-height: 1.5;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ant-menu-dark .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateX(4px);
        }

        .ant-menu-dark .ant-menu-item-selected {
          background: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-weight: 600;
        }

        .ant-menu-dark .ant-menu-item-selected::after {
          display: none;
        }

        /* Icon Styling */
        .ant-menu-dark .ant-menu-item .anticon {
          font-size: 18px;
          margin-right: 12px;
          transition: all 0.3s;
        }

        .ant-menu-dark .ant-menu-item:hover .anticon {
          transform: scale(1.1);
        }

        /* Sider Trigger Button (Collapse) */
        .ant-layout-sider-trigger {
          background: rgba(0, 0, 0, 0.2) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
        }

        .ant-layout-sider-trigger:hover {
          background: rgba(0, 0, 0, 0.3) !important;
        }

        /* Collapsed State */
        .ant-layout-sider-collapsed .ant-menu-item {
          padding: 12px calc(50% - 18px) !important;
          justify-content: center;
        }

        /* Scrollbar Styling */
        .ant-layout-sider::-webkit-scrollbar {
          width: 6px;
        }

        .ant-layout-sider::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .ant-layout-sider::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .ant-layout-sider::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .ant-layout-sider {
            position: fixed !important;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 999;
          }
        }
      `}</style>
    </>
  );
}