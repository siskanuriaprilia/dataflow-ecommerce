import React, { useEffect, useState } from "react";
import { Layout, Card, Statistic, Row, Col, message, Typography } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  WifiOutlined,
  DollarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import SidebarMenu from "../components/SidebarMenu";

const { Content } = Layout;
const { Title, Text } = Typography;
const COLORS = ["#667eea", "#764ba2", "#ffc658", "#ff7f50", "#0088fe"];

export default function DashboardAdmin() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cRes, pRes, tRes] = await Promise.all([
        fetch("http://localhost:3001/customers"),
        fetch("http://localhost:3001/packages"),
        fetch("http://localhost:3001/transactions"),
      ]);
      setCustomers(await cRes.json());
      setPackages(await pRes.json());
      setTransactions(await tRes.json());
    } catch (error) {
      message.error("Gagal memuat data dashboard");
    }
  };

  const totalCustomers = customers.length;
  const totalPackages = packages.length;
  const totalTransactions = transactions.length;
  const totalIncome = transactions.reduce((sum, t) => sum + (t.price || 0), 0);

  // Statistik transaksi per paket
  const packageStats = packages.map((pkg) => {
    const count = transactions.filter((t) => t.packageId === pkg.id).length;
    return { name: pkg.name, transaksi: count };
  });

  // Statistik metode pembayaran
  const paymentStats = [
    { name: "E-Wallet", value: transactions.filter((t) => t.paymentMethod === "E-Wallet").length },
    { name: "Transfer Bank", value: transactions.filter((t) => t.paymentMethod === "Transfer Bank").length },
    { name: "Kartu Kredit", value: transactions.filter((t) => t.paymentMethod === "Kartu Kredit").length },
    { name: "Tunai", value: transactions.filter((t) => t.paymentMethod === "Tunai").length },
  ].filter((d) => d.value > 0);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarMenu defaultKey="dashboard" />

      <Layout>
              <Content style={{ padding: 24, background: "#f0f2f5" }}>
                {/* Header Section */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: 32,
                    borderRadius: 16,
                    marginBottom: 24,
                    color: "white",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 200,
                      height: 200,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -30,
                      left: -30,
                      width: 150,
                      height: 150,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "50%",
                    }}
                  />
      
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <Title level={2} style={{ color: "white", margin: 0, marginBottom: 8 }}>
                      📊  Dashboard Admin
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: 16 }}>
                       Selamat datang! Berikut ringkasan data Anda
                    </Text>
                  </div>
                </div>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: "14px", color: "#666" }}>Total Pelanggan</span>}
                  value={totalCustomers}
                  prefix={<UserOutlined style={{ color: "#667eea" }} />}
                  valueStyle={{ color: "#667eea", fontSize: "28px", fontWeight: "700" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: "14px", color: "#666" }}>Total Paket Data</span>}
                  value={totalPackages}
                  prefix={<WifiOutlined style={{ color: "#764ba2" }} />}
                  valueStyle={{ color: "#764ba2", fontSize: "28px", fontWeight: "700" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: "14px", color: "#666" }}>Total Transaksi</span>}
                  value={totalTransactions}
                  prefix={<ShoppingCartOutlined style={{ color: "#ffc658" }} />}
                  valueStyle={{ color: "#ffc658", fontSize: "28px", fontWeight: "700" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: "14px", color: "#666" }}>Total Pendapatan</span>}
                  value={totalIncome}
                  prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
                  formatter={(val) => `Rp ${val.toLocaleString("id-ID")}`}
                  valueStyle={{ color: "#52c41a", fontSize: "24px", fontWeight: "700" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            {/* BarChart transaksi per paket */}
            <Col xs={24} lg={14}>
              <Card
                title={<span style={{ fontSize: "18px", fontWeight: "600" }}>Transaksi per Paket</span>}
                bordered={false}
                style={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={packageStats} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      angle={-15}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Bar
                      dataKey="transaksi"
                      fill="url(#colorGradient)"
                      radius={[8, 8, 0, 0]}
                      barSize={40}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" stopOpacity={1} />
                        <stop offset="100%" stopColor="#764ba2" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* PieChart metode pembayaran */}
            <Col xs={24} lg={10}>
              <Card
                title={<span style={{ fontSize: "18px", fontWeight: "600" }}>Metode Pembayaran</span>}
                bordered={false}
                style={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentStats}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: "#999", strokeWidth: 1 }}
                    >
                      {paymentStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      <style>{`
        /* Responsive adjustments */
        @media (max-width: 991px) {
          .ant-layout-content {
            padding: 80px 16px 16px !important;
          }
        }

        @media (max-width: 576px) {
          .ant-statistic-title {
            font-size: 13px !important;
          }
          
          .ant-statistic-content-value {
            font-size: 24px !important;
          }

          .ant-card-head-title {
            font-size: 16px !important;
          }
        }

        /* Card hover effect */
        .ant-card-hoverable:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth transitions */
        .ant-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </Layout>
  );
}
