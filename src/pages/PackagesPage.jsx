import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  List,
  Button,
  Typography,
  message,
  Tag,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
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
