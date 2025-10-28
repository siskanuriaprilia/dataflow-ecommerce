import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  List,
  Avatar,
  Button,
  Typography,
  message,
  Space,
} from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu"; // ✅ Sidebar terpisah

const { Content } = Layout;
const { Title, Text } = Typography;

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3001/customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      message.error("Gagal memuat data pelanggan");
    }
  };

  const handleBuyPackage = (customer) => {
    navigate(`/transactions?customerId=${customer.id}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 🔹 Sidebar */}
      <SidebarMenu defaultKey="customers" />

      {/* 🔹 Main Content */}
      <Layout>
        <Content style={{ padding: 24, background: "#f0f2f5" }}>
          <Card
            title="Daftar Pelanggan"
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
              dataSource={customers}
              renderItem={(customer) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{ borderRadius: 8, textAlign: "center" }}
                    actions={[
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleBuyPackage(customer)}
                      >
                        Beli Paket
                      </Button>,
                    ]}
                  >
                    <Avatar
                      size={64}
                      icon={<UserOutlined />}
                      style={{ marginBottom: 16 }}
                    />
                    <Text strong>{customer.name}</Text>
                    <br />
                    <Text type="secondary">Email: {customer.email}</Text>
                    <br />
                    <Text type="secondary">Phone: {customer.phone}</Text>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
