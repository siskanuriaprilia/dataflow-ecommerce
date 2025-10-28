import React, { useEffect, useState } from "react";
import { Layout, Table, message, Card, Typography, Row, Col, Tag, Statistic, Badge, Space, Button, DatePicker, Select, Input } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  WalletOutlined,
  BankOutlined,
  MobileOutlined,
  RocketOutlined
} from "@ant-design/icons";
import SidebarCustomer from "../components/SidebarCustomer";

const { Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function RiwayatTransaksiCustomers() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchText, statusFilter, paymentFilter]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch("http://localhost:3001/transactions");
      const data = await res.json();
      const userTransactions = data.filter(
        (t) => t.customerName === user.name
      );
      setTransactions(userTransactions);
      setFilteredTransactions(userTransactions);
    } catch (error) {
      message.error("Gagal memuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = [...transactions];

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        (t) =>
          t.packageName.toLowerCase().includes(searchText.toLowerCase()) ||
          t.id.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Filter by payment method
    if (paymentFilter !== "all") {
      filtered = filtered.filter((t) => t.paymentMethod === paymentFilter);
    }

    setFilteredTransactions(filtered);
  };

  // Calculate statistics
  const totalTransactions = transactions.length;
  const successTransactions = transactions.filter((t) => t.status === "success").length;
  const totalSpent = transactions.reduce((sum, t) => sum + (t.price || 0), 0);
  const averageSpent = totalTransactions > 0 ? totalSpent / totalTransactions : 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "pending":
        return <ClockCircleOutlined style={{ color: "#faad14" }} />;
      case "failed":
        return <CloseCircleOutlined style={{ color: "#f5222d" }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case "E-Wallet":
        return <WalletOutlined style={{ color: "#667eea" }} />;
      case "Transfer Bank":
        return <BankOutlined style={{ color: "#52c41a" }} />;
      case "Kartu Kredit":
        return <CreditCardOutlined style={{ color: "#f5576c" }} />;
      case "Tunai":
        return <DollarOutlined style={{ color: "#ffd700" }} />;
      default:
        return <MobileOutlined />;
    }
  };

  const columns = [
    {
      title: <span style={{ fontWeight: 600 }}>ID Transaksi</span>,
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Text strong style={{ color: "#667eea" }}>
          #{text.slice(0, 8)}...
        </Text>
      ),
      width: 130,
    },
    {
      title: <span style={{ fontWeight: 600 }}>Paket</span>,
      dataIndex: "packageName",
      key: "packageName",
      render: (text) => (
        <Space>
          <ShoppingCartOutlined style={{ color: "#764ba2" }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: <span style={{ fontWeight: 600 }}>Kuota</span>,
      dataIndex: "quota",
      key: "quota",
      render: (text) => (
        <Tag color="blue" style={{ borderRadius: 8, fontWeight: 600 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontWeight: 600 }}>Harga</span>,
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
          {price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
        </Text>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: <span style={{ fontWeight: 600 }}>Tanggal</span>,
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => (
        <Space direction="vertical" size={0}>
          <Text>
            <CalendarOutlined style={{ marginRight: 4, color: "#667eea" }} />
            {new Date(text).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(text).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Space>
      ),
      sorter: (a, b) => new Date(a.transactionDate) - new Date(b.transactionDate),
      defaultSortOrder: 'descend',
    },
    {
      title: <span style={{ fontWeight: 600 }}>Status</span>,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          icon={getStatusIcon(status)}  
          color={getStatusColor(status)}
          style={{
            borderRadius: 8,
            padding: "4px 12px",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Success", value: "success" },
        { text: "Pending", value: "pending" },
        { text: "Failed", value: "failed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: <span style={{ fontWeight: 600 }}>Metode Pembayaran</span>,
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <Space>
          {getPaymentIcon(method)}
          <Text>{method}</Text>
        </Space>
      ),
    },
  ];

  return (
  <Layout style={{ minHeight: "100vh" }}>
    <SidebarCustomer defaultKey="riwayat-transaksi" />
    <Layout style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <Content style={{ padding: "24px", margin: 0 }}>
        {/* Header dengan Gradient */}
        <div
          style={{
            position: "relative",
            marginBottom: "24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "32px",
            borderRadius: "20px",
            color: "white",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.1 }}>
            <ShoppingCartOutlined style={{ fontSize: "185px" }} />
          </div>

          {/* Konten Header */}
          <Title level={2} style={{ margin: 0, color: "white", position: "relative", zIndex: 1 }}>
            Riwayat Transaksi
          </Title>
          <Text style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", position: "relative", zIndex: 1 }}>
            Lihat semua riwayat pembelian dan transaksi Anda
          </Text>
        </div>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "16px",
                  border: "none",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                }}
              >
                <Statistic
                  title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>Total Transaksi</span>}
                  value={totalTransactions}
                  prefix={<ShoppingCartOutlined style={{ color: "white" }} />}
                  valueStyle={{ color: "white", fontSize: 32, fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "16px",
                  border: "none",
                  background: "linear-gradient(135deg, #8ded92ff 0%, #177d14ff 100%)",
                  boxShadow: "0 4px 20px rgba(67, 233, 123, 0.3)",
                }}
              >
                <Statistic
                  title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>Transaksi Berhasil</span>}
                  value={successTransactions}
                  prefix={<CheckCircleOutlined style={{ color: "white" }} />}
                  valueStyle={{ color: "white", fontSize: 32, fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "16px",
                  border: "none",
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  boxShadow: "0 4px 20px rgba(240, 147, 251, 0.3)",
                }}
              >
                <Statistic
                  title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>Total Pengeluaran</span>}
                  value={totalSpent}
                  prefix={<DollarOutlined style={{ color: "white" }} />}
                  formatter={(val) => `Rp ${(val / 1000).toFixed(0)}K`}
                  valueStyle={{ color: "white", fontSize: 28, fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: "16px",
                  border: "none",
                  background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  boxShadow: "0 4px 20px rgba(250, 112, 154, 0.3)",
                }}
              >
                <Statistic
                  title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>Rata-rata Transaksi</span>}
                  value={averageSpent}
                  prefix={<DollarOutlined style={{ color: "white" }} />}
                  formatter={(val) => `Rp ${(val / 1000).toFixed(0)}K`}
                  valueStyle={{ color: "white", fontSize: 28, fontWeight: 700 }}
                />
              </Card>
            </Col>
          </Row>

          {/* Filter Section */}
          <Card
            style={{
              marginBottom: 24,
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={8}>
                <Input
                  placeholder=" Cari paket atau ID transaksi..."
                  prefix={<SearchOutlined style={{ color: "#667eea" }} />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Col>
              <Col xs={24} sm={12} md={5}>
                <Select
                  value={paymentFilter}
                  onChange={setPaymentFilter}
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Filter Pembayaran"
                >
                  <Option value="all">💳 Semua Metode</Option>
                  <Option value="E-Wallet">💸 E-Wallet</Option>
                  <Option value="Transfer Bank">🏦 Transfer Bank</Option>
                  <Option value="Kartu Kredit">💳 Kartu Kredit</Option>
                  <Option value="Tunai">💵 Tunai</Option>
                </Select>
              </Col>
              <Col xs={24} md={6}>
                <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                 
                  
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Transaction Table */}
          <Card
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Table
              dataSource={filteredTransactions}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => (
                  <Text strong style={{ color: "#667eea" }}>
                    Total {total} transaksi
                  </Text>
                ),
                style: { padding: "16px 24px" },
              }}
              scroll={{ x: 1200 }}
              style={{
                borderRadius: 16,
              }}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
            />
          </Card>

          {/* Empty State */}
          {filteredTransactions.length === 0 && !loading && (
            <Card
              style={{
                marginTop: 24,
                borderRadius: "16px",
                textAlign: "center",
                padding: "48px 24px",
                background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
              }}
            >
              <ShoppingCartOutlined
                style={{ fontSize: 64, color: "#ff6b6b", marginBottom: 16 }}
              />
              <Title level={4} style={{ color: "#ff6b6b" }}>
                Belum Ada Transaksi
              </Title>
              <Text>Mulai belanja paket untuk melihat riwayat transaksi Anda!</Text>
            </Card>
          )}
        </Content>
      </Layout>

      <style>{`
        .table-row-light {
          background-color: #ffffff;
        }
        
        .table-row-dark {
          background-color: #fafafa;
        }

        .ant-table-thead > tr > th {
        background: #ffffffff !important;
        color: #333 !important; /* teks hitam/gelap */
        font-weight: 600 !important;
        border-bottom: 1px solid #bab4b4ff !important; /* garis tipis bawah */
      }

      .ant-table-tbody > tr:hover > td {
        background: rgba(0,0,0,0.03) !important;
      }


            /* Header */
        .ant-table-thead > tr > th {
          background: #ffffffff !important;
          color: #333 !important;
          font-weight: 600 !important;
          border-bottom: 1px solid #bab4b4ff !important; /* garis bawah header */
        }

        /* Body */
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #e0e0e0 !important; /* garis antar baris */
          border-right: 1px solid #e0e0e0 !important; /* garis antar kolom */
        }

        /* Hilangkan border kanan terakhir di setiap baris */
        .ant-table-tbody > tr > td:last-child {
          border-right: none !important;
        }

        /* Garis antar header kolom */
        .ant-table-thead > tr > th:not(:last-child) {
          border-right: 1px solid #e0e0e0 !important;
        }

        /* Hover tetap bagus */
        .ant-table-tbody > tr:hover > td {
          background: rgba(0,0,0,0.03) !important;
        }

      `}</style>
    </Layout>
  );
}