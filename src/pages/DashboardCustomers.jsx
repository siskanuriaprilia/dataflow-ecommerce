import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, Button, message, Modal, Select, Statistic, Tabs, Badge } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TagOutlined,
} from "@ant-design/icons";
import SidebarCustomer from "../components/SidebarCustomer";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

export default function WelcomePage() {
  const [packages, setPackages] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("E-Wallet");
  const [userTransactions, setUserTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Ambil data paket, user, dan transaksi dari localStorage dan API
  useEffect(() => {
    fetchPackages();
    fetchUserTransactions();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("http://localhost:3001/packages");
      setPackages(await res.json());
    } catch (error) {
      message.error("Gagal memuat data paket");
    }
  };

  const fetchUserTransactions = async () => {
    try {
      const res = await fetch("http://localhost:3001/transactions");
      const allTransactions = await res.json();
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const userTrans = allTransactions.filter(t => t.customerId === storedUser.id);
        setUserTransactions(userTrans);
      }
    } catch (error) {
      message.error("Gagal memuat data transaksi");
    }
  };

  // Saat klik beli paket
  const handleBuyClick = (pkg) => {
    setSelectedPackage(pkg);
    setPaymentMethod("E-Wallet"); // reset default payment
    setIsModalVisible(true);
  };

  // Konfirmasi pembelian
  const handleConfirmPurchase = async () => {
    if (!user || !selectedPackage) return;

    try {
      const transaction = {
        id: Date.now().toString(), // id unik
        customerId: user.id,
        customerName: user.name,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        quota: selectedPackage.quota,
        price: selectedPackage.price,
        transactionDate: new Date().toISOString(), // tanggal otomatis
        status: "success",
        paymentMethod, // dari select user
      };

      const res = await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      if (!res.ok) throw new Error("Gagal menyimpan transaksi");

      message.success(`Paket "${selectedPackage.name}" berhasil dibeli!`);
      setIsModalVisible(false);
      setSelectedPackage(null);
      // Refresh transaksi setelah pembelian
      fetchUserTransactions();
    } catch (error) {
      message.error("Terjadi kesalahan saat membeli paket");
      console.error(error);
    }
  };

  // Hitung statistik user
  const totalPurchases = userTransactions.length;
  const totalSpent = userTransactions.reduce((sum, t) => sum + (t.price || 0), 0);

  // Filter paket berdasarkan kategori
  const filteredPackages = selectedCategory === "All" ? packages : packages.filter(pkg => pkg.category === selectedCategory);

  // Paket diskon (asumsikan ada field discount: true atau discountPercentage)
  const discountedPackages = packages.filter(pkg => pkg.discount);

  // Kategori unik
  const categories = ["All", ...new Set(packages.map(pkg => pkg.category))];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarCustomer defaultKey="dashboard-customers" />
      <Layout style={{ background: "#f0f2f5", minHeight: "100vh" }}>
        <Content style={{ padding: '24px', margin: 0 }}>
          {/* Header */}
          <div style={{ 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
          }}>
            <Title level={2} style={{ margin: 0, color: 'white' }}>
              Selamat Datang{user ? `, ${user.name}` : ""}!
            </Title>
            <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)' }}>
              Pilih paket yang sesuai kebutuhan Anda dan kelola pembelian Anda.
            </Text>
          </div>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={8}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: '14px', color: '#666' }}>Total Pembelian</span>}
                  value={totalPurchases}
                  prefix={<ShoppingCartOutlined style={{ color: '#667eea' }} />}
                  valueStyle={{ color: '#667eea', fontSize: '28px', fontWeight: '700' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: '14px', color: '#666' }}>Total Pengeluaran</span>}
                  value={totalSpent}
                  prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                  formatter={(val) => `Rp ${val.toLocaleString("id-ID")}`}
                  valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: '700' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: '14px', color: '#666' }}>Paket Tersedia</span>}
                  value={packages.length}
                  prefix={<UserOutlined style={{ color: '#764ba2' }} />}
                  valueStyle={{ color: '#764ba2', fontSize: '28px', fontWeight: '700' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Paket Diskon */}
          {discountedPackages.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <Title level={3} style={{ marginBottom: 16, color: '#667eea' }}>
                <TagOutlined style={{ marginRight: 8 }} />
                Paket Diskon Spesial
              </Title>
              <Row gutter={[24, 24]}>
                {discountedPackages.map((pkg) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={pkg.id}>
                    <Badge.Ribbon text={`Diskon ${pkg.discountPercentage || 0}%`} color="red">
                      <Card
                        title={<span style={{ fontSize: '18px', fontWeight: '600' }}>{pkg.name}</span>}
                        bordered={false}
                        style={{ 
                          borderRadius: 12, 
                          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        hoverable
                        extra={
                          <div>
                            <Text delete style={{ color: '#999', fontSize: '12px' }}>
                              {pkg.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                            </Text><br/>
                            <Text strong style={{ color: '#52c41a' }}>
                              {((pkg.price * (100 - (pkg.discountPercentage || 0))) / 100).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                            </Text>
                          </div>
                        }
                      >
                        <div style={{ marginBottom: 16 }}>
                          <Text><strong>Quota:</strong> {pkg.quota}</Text><br/>
                          <Text><strong>Durasi:</strong> {pkg.duration}</Text><br/>
                          <Text><strong>Kecepatan:</strong> {pkg.speed}</Text><br/>
                          <Text type="secondary" style={{ marginTop: 8 }}>{pkg.description}</Text>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Button 
                            type="primary" 
                            size="large"
                            style={{ 
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              border: 'none',
                              fontWeight: '600',
                            }}
                            onClick={() => handleBuyClick(pkg)}
                          >
                            Beli Sekarang
                          </Button>
                        </div>
                      </Card>
                    </Badge.Ribbon>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Kategori Paket */}
          <div style={{ marginBottom: 32 }}>
            <Title level={3} style={{ marginBottom: 16, color: '#667eea' }}>
              Semua Kategori Paket
            </Title>
            <Tabs 
              activeKey={selectedCategory} 
              onChange={setSelectedCategory}
              type="card"
              style={{ marginBottom: 16 }}
            >
              {categories.map((cat) => (
                <TabPane tab={cat} key={cat} />
              ))}
            </Tabs>
            <Row gutter={[24, 24]}>
              {filteredPackages.map((pkg) => (
                <Col xs={24} sm={12} md={8} lg={6} key={pkg.id}>
                  <Card
                    title={<span style={{ fontSize: '18px', fontWeight: '600' }}>{pkg.name}</span>}
                    bordered={false}
                    style={{ 
                      borderRadius: 12, 
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    hoverable
                    extra={<Text strong style={{ color: '#52c41a' }}>{pkg.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</Text>}
                  >
                    <div style={{ marginBottom: 16 }}>
                      <Text><strong>Quota:</strong> {pkg.quota}</Text><br/>
                      <Text><strong>Durasi:</strong> {pkg.duration}</Text><br/>
                      <Text><strong>Kecepatan:</strong> {pkg.speed}</Text><br/>
                      <Text type="secondary" style={{ marginTop: 8 }}>{pkg.description}</Text>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Button 
                        type="primary" 
                        size="large"
                        style={{ 
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          fontWeight: '600',
                        }}
                        onClick={() => handleBuyClick(pkg)}
                      >
                        Beli Sekarang
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Modal Konfirmasi */}
          <Modal
            title="Konfirmasi Pembelian"
            visible={isModalVisible}
            onOk={handleConfirmPurchase}
            onCancel={() => setIsModalVisible(false)}
            okText="Beli"
            cancelText="Batal"
            okButtonProps={{ 
              style: { 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
              }
            }}
          >
            {selectedPackage && (
              <div>
                <Text>Apakah Anda yakin ingin membeli paket </Text>
                <Text strong>{selectedPackage.name}</Text>
                <Text> seharga </Text>
                <Text strong>{selectedPackage.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</Text>
                <Text>?</Text>

                {/* Pilih metode pembayaran */}
                <div style={{ marginTop: 16 }}>
                  <Text strong>Pilih Metode Pembayaran:</Text>
                  <Select 
                    value={paymentMethod} 
                    onChange={(value) => setPaymentMethod(value)} 
                    style={{ width: "100%", marginTop: 8 }}
                  >
                    <Option value="E-Wallet">E-Wallet</Option>
                    <Option value="Transfer Bank">Transfer Bank</Option>
                    <Option value="Kartu Kredit">Kartu Kredit</Option>
                    <Option value="Tunai">Tunai</Option>
                  </Select>
                </div>
              </div>
            )}
          </Modal>
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
