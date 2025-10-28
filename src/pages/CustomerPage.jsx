import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Table,
  Typography,
  message,
  Row,
  Col,
  Statistic,
  Input,
} from "antd";
import { TeamOutlined, SearchOutlined } from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu"; // ✅ Sidebar terpisah

const { Content } = Layout;
const { Title, Text } = Typography;

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchText]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3001/customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      message.error("Gagal memuat data pelanggan");
    }
  };

  const filterCustomers = () => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.phone.includes(searchText)
    );
    setFilteredCustomers(filtered);
  };

  // Kolom untuk tabel pelanggan
  const customerColumns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Telepon",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 🔹 Sidebar */}
      <SidebarMenu defaultKey="customers" />

      {/* 🔹 Main Content */}
      <Layout>
        <Content style={{ padding: 24, background: "#f0f2f5" }}>
          {/* Header Section - Mirip Dashboard */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: 24,
              borderRadius: 12,
              marginBottom: 24,
              color: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={2} style={{ color: "white", margin: 0 }}>
              Pelanggan
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.8)" }}>
              Kelola dan pantau data pelanggan Anda
            </Text>
          </div>

          {/* Statistics Cards - Mirip Dashboard */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={8}>
              <Card
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <Statistic
                  title="Total Pelanggan"
                  value={customers.length}
                  prefix={<TeamOutlined />}
                  suffix=" pelanggan"
                  valueStyle={{ color: "#667eea" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Customer Table */}
          <Card
            title="Daftar Pelanggan"
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {/* Search Global */}
            <Input
              placeholder="Cari pelanggan..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                marginBottom: 16,
                width: "100%",
                maxWidth: 300,
                borderRadius: 8,
              }}
              allowClear
            />

            <Table
              columns={customerColumns}
              dataSource={filteredCustomers}
              rowKey="id"
              pagination={{ pageSize: 8 }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
