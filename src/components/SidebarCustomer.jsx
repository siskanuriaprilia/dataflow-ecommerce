import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined, HistoryOutlined, LogoutOutlined, ProfileOutlined, ShoppingOutlined } from "@ant-design/icons"; // Tambahkan ShoppingOutlined untuk ikon title
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

export default function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("dashboard-customers");

  useEffect(() => {
    if (location.pathname === "/dashboard-customers") {
      setSelectedKey("dashboard-customers");
    } else if (location.pathname === "/riwayat-transaksi") {
      setSelectedKey("riwayat-transaksi");
    } else if (location.pathname === "/profil") { 
      setSelectedKey("profil");
    } else {
      setSelectedKey("");
    }
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(`/${key}`);
    }
  };

  const menuItems = [
    { key: "dashboard-customers", icon: <DashboardOutlined/>, label: "Dashboard" },
    { key: "riwayat-transaksi", icon: <HistoryOutlined />, label: "Riwayat Transaksi" },
    { key: "profil", icon: <UserOutlined />, label: "Profil" }, 
    { key: "logout", icon: <LogoutOutlined />, label: "Keluar" },
  ];

  return (
    <Header
      style={{
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        height: 64,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        transition: 'all 0.3s ease', // Tambahkan transisi untuk efek halus
      }}
    >
      {/* Tambahkan ikon ke title dan buat lebih menarik dengan hover effect */}
      <div 
        style={{ 
          flex: 2, 
          textAlign: 'left', 
          color: 'white', 
          fontWeight: 700, 
          fontSize: 18, 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer', // Tambahkan cursor pointer untuk interaktivitas
          transition: 'transform 0.2s ease', // Efek hover pada title
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Efek zoom saat hover
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onClick={() => navigate('/dashboard-customers')} // Klik title untuk kembali ke dashboard
      >
        <ShoppingOutlined style={{ marginRight: 8, fontSize: 20 }} /> {/* Ikon untuk title */}
        E-Commerce Dashboard
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectable={true}
        selectedKeys={[selectedKey]}
        style={{ background: 'transparent', color: 'white' }}
        items={menuItems}
        onClick={handleMenuClick}
        className="custom-top-menu"
      />
      
      {/* Style yang diperbarui untuk efek lebih menarik */}
      <style>
        {`
          .custom-top-menu .ant-menu-item {
            transition: all 0.3s ease; /* Transisi halus untuk semua item menu */
          }
          .custom-top-menu .ant-menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1) !important; /* Efek hover yang lebih halus */
            transform: translateY(-2px); /* Efek lift saat hover */
          }
          .custom-top-menu .ant-menu-item-selected {
            background-color: rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            border-bottom: 2px solid white; /* Tambahkan border bawah untuk highlight */
          }
          .custom-top-menu .ant-menu-item-selected:hover {
            background-color: rgba(255, 255, 255, 0.3) !important;
            transform: translateY(-2px); /* Efek lift yang konsisten */
          }
        `}
      </style>
    </Header>
  );
}