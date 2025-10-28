import React, { useEffect, useState } from "react";
import { Layout, Card, Statistic, Row, Col, message } from "antd";
import SidebarCustomer from "../components/SidebarCustomer";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function DashboardCustomers() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:3001/transactions");
      setTransactions(await res.json());
    } catch (error) {
      message.error("Gagal memuat data transaksi");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarCustomer defaultKey="dashboard-customers" />
      <Layout style={{ background: "#f0f2f5" }}>
        <Content style={{ margin: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Total Transaksi"
                  value={transactions.length}
                  prefix={<ShoppingCartOutlined />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Total Paket Dibeli"
                  value={transactions.length} // Bisa disesuaikan
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
