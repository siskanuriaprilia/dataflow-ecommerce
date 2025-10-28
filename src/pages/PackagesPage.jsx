import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  List,
  Button,
  Typography,
  message,
  Tag,
  Row,
  Col,
  Statistic,
} from "antd";
import { ShoppingCartOutlined, WifiOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";

const { Content } = Layout;
const { Text, Title } = Typography;

export default function PackagePage() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:3001/packages");
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      message.error("Gagal memuat data paket");
    }
  };

  const handleBuyPackage = (pkg) => {
    navigate(`/transactions?packageId=${pkg.id}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SidebarMenu defaultKey="packages" />

      <Layout>
        <Content style={{ padding: 24, background: "#f0f2f5" }}>
          {/* Header Section - Mirip Dashboard */}
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              Paket Data
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Jelajahi dan pilih paket data terbaik untuk kebutuhan Anda
            </Text>
          </div>

          {/* Statistics Cards - Mirip Dashboard */}
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} md={8}>
              <Card
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                }}
              >
                <Statistic
                  title="Total Paket"
                  value={packages.length}
                  prefix={<WifiOutlined />}
                  valueStyle={{ color: '#667eea' }}
                />
              </Card>
            </Col>
            {/* Tambahkan statistik lain jika diperlukan, misalnya paket terlaris, dll. */}
          </Row>

          {/* Package List */}
          <Card
            title="Daftar Paket Data"
            style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
              dataSource={packages}
              renderItem={(pkg) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{ borderRadius: 8, textAlign: "center" }}
                    actions={[
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleBuyPackage(pkg)}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                        }}
                      >
                        Beli Paket
                      </Button>,
                    ]}
                  >
                    <Title level={5}>{pkg.name}</Title>
                    <Tag color="blue">{pkg.quota}</Tag>
                    <br />
                    <Text type="secondary">{pkg.duration}</Text>
                    <br />
                    <Text strong style={{ color: "#52c41a" }}>
                      Rp {pkg.price.toLocaleString("id-ID")}
                    </Text>
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
