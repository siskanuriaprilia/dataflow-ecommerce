import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined, HistoryOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function SidebarCustomer({ defaultKey = "dashboard" }) {
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    if (key === "logout") {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(`/${key}`);
    }
  };

  return (
    <Sider theme="dark" collapsible>
      <div style={{ color: "white", padding: 16, fontWeight: "bold", textAlign: "center" }}>
        <UserOutlined style={{ marginRight: 8 }} />
        Customer Panel
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[defaultKey]}
        onClick={({ key }) => handleMenuClick(key)}
        items={[
          { key: "dashboard-customers", icon: <UserOutlined />, label: "Dashboard" },
          { key: "riwayat-transaksi", icon: <HistoryOutlined />, label: "Riwayat Transaksi" },
          { key: "logout", icon: <LogoutOutlined />, label: "Keluar" },
        ]}
      />
    </Sider>
  );
}
