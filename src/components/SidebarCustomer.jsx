import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, HistoryOutlined, LogoutOutlined, ProfileOutlined } from "@ant-design/icons"; // Tambahkan ProfileOutlined
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

export default function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("dashboard-customers");

  useEffect(() => {
    // Sesuaikan selectedKey dengan path saat ini, termasuk path baru untuk profil
    if (location.pathname === "/dashboard-customers") {
      setSelectedKey("dashboard-customers");
    } else if (location.pathname === "/riwayat-transaksi") {
      setSelectedKey("riwayat-transaksi");
    } else if (location.pathname === "/profil") { // Tambahkan kondisi untuk profil
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
    { key: "dashboard-customers", icon: <UserOutlined />, label: "Dashboard" },
    { key: "riwayat-transaksi", icon: <HistoryOutlined />, label: "Riwayat Transaksi" },
    { key: "profil", icon: <ProfileOutlined />, label: "Profil" }, // Item menu baru untuk Profil
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
      }}
    >
      <div style={{ flex: 2, textAlign: 'left', color: 'white', fontWeight: 700, fontSize: 18 }}>
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

      {/* Style khusus untuk item aktif */}
      <style>
        {`
          .custom-top-menu .ant-menu-item-selected {
            background-color: rgba(255, 255, 255, 0.2) !important;
            color: white !important;
          }
          .custom-top-menu .ant-menu-item-selected:hover {
            background-color: rgba(255, 255, 255, 0.3) !important;
          }
        `}
      </style>
    </Header>
  );
}