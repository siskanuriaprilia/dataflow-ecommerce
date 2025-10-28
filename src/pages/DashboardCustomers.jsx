import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, Button, message, Modal, Select, Statistic, Tabs, Badge, Progress, Timeline, Avatar } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TagOutlined,
  RocketOutlined,
  TrophyOutlined,
  FireOutlined,
  StarOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  GiftOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WifiOutlined,
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
    setPaymentMethod("E-Wallet");
    setIsModalVisible(true);
  };

  // Konfirmasi pembelian
  const handleConfirmPurchase = async () => {
    if (!user || !selectedPackage) return;

    try {
      const transaction = {
        id: Date.now().toString(),
        customerId: user.id,
        customerName: user.name,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        quota: selectedPackage.quota,
        price: selectedPackage.price,
        transactionDate: new Date().toISOString(),
        status: "success",
        paymentMethod,
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
      fetchUserTransactions();
    } catch (error) {
      message.error("Terjadi kesalahan saat membeli paket");
      console.error(error);
    }
  };

  // Hitung statistik user
  const totalPurchases = userTransactions.length;
  const totalSpent = userTransactions.reduce((sum, t) => sum + (t.price || 0), 0);
  const totalQuota = userTransactions.reduce((sum, t) => {
    const quotaNum = parseInt(t.quota) || 0;
    return sum + quotaNum;
  }, 0);

  // Filter paket berdasarkan kategori
  const filteredPackages = selectedCategory === "All" ? packages : packages.filter(pkg => pkg.category === selectedCategory);

  // Paket diskon
  const discountedPackages = packages.filter(pkg => pkg.discount);

  // Kategori unik
  const categories = ["All", ...new Set(packages.map(pkg => pkg.category))];

  // Level user berdasarkan pembelian
  const getUserLevel = () => {
    if (totalPurchases >= 10) return { level: "Diamond", color: "#00d4ff", icon: <CrownOutlined /> };
    if (totalPurchases >= 5) return { level: "Gold", color: "#ffd700", icon: <TrophyOutlined /> };
    if (totalPurchases >= 3) return { level: "Silver", color: "#c0c0c0", icon: <StarOutlined /> };
    return { level: "Bronze", color: "#cd7f32", icon: <FireOutlined /> };
  };

  const userLevel = getUserLevel();

  // Progress ke level berikutnya
  const getProgressToNextLevel = () => {
    if (totalPurchases >= 10) return 100;
    if (totalPurchases >= 5) return ((totalPurchases - 5) / 5) * 100;
    if (totalPurchases >= 3) return ((totalPurchases - 3) / 2) * 100;
    return (totalPurchases / 3) * 100;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarCustomer defaultKey="dashboard-customers" />
      <Layout style={{ background: "#f0f2f5", minHeight: "100vh" }}>
        <Content style={{ padding: '24px', margin: 0 }}>
          {/* Animated Header with Gradient */}
          <div style={{ 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '32px',
            borderRadius: '20px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}>
              <RocketOutlined style={{ fontSize: '200px' }} />
            </div>
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar size={64} style={{ background: 'rgba(255,255,255,0.3)' }} icon={<UserOutlined />} />
              </Col>
              <Col flex="auto">
                <Title level={2} style={{ margin: 0, color: 'white' }}>
                   Selamat Datang{user ? `, ${user.name}` : ""}!
                </Title>
                <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.95)' }}>
                  Pilih paket terbaik untuk pengalaman internet yang luar biasa!
                </Text>
              </Col>
            </Row>
          </div>

          {/* User Level Card */}
          <Card 
            style={{ 
              marginBottom: 24,
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${userLevel.color}22 0%, ${userLevel.color}44 100%)`,
              border: `2px solid ${userLevel.color}`,
              boxShadow: `0 4px 20px ${userLevel.color}44`,
            }}
          >
            <Row align="middle" gutter={24}>
              <Col>
                <div style={{ 
                  fontSize: '48px', 
                  color: userLevel.color,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}>
                  {userLevel.icon}
                </div>
              </Col>
              <Col flex="auto">
                <Title level={4} style={{ margin: 0, color: userLevel.color }}>
                  {userLevel.level} Member
                </Title>
                <Text>Progress ke level berikutnya</Text>
                <Progress 
                  percent={Math.round(getProgressToNextLevel())} 
                  strokeColor={{
                    '0%': userLevel.color,
                    '100%': '#87d068',
                  }}
                  style={{ marginTop: 8 }}
                />
              </Col>
            </Row>
          </Card>

          {/* Colorful Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Total Pembelian</span>}
                  value={totalPurchases}
                  prefix={<ShoppingCartOutlined style={{ color: 'white' }} />}
                  valueStyle={{ color: 'white', fontSize: '32px', fontWeight: '700' }}
                
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  boxShadow: '0 4px 20px rgba(240, 147, 251, 0.3)',
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Total Pengeluaran</span>}
                  value={totalSpent}
                  prefix={<DollarOutlined style={{ color: 'white' }} />}
                  formatter={(val) => `${(val / 1000).toFixed(0)}K`}
                  valueStyle={{ color: 'white', fontSize: '32px', fontWeight: '700' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  boxShadow: '0 4px 20px rgba(79, 172, 254, 0.3)',
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Total Kuota (GB)</span>}
                  value={totalQuota}
                  prefix={<WifiOutlined style={{ color: 'white' }} />}
                  valueStyle={{ color: 'white', fontSize: '32px', fontWeight: '700' }}
                  suffix="GB"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  boxShadow: '0 4px 20px rgba(250, 112, 154, 0.3)',
                }}
              >
                <Statistic
                  title={<span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Paket Tersedia</span>}
                  value={packages.length}
                  prefix={<GiftOutlined style={{ color: 'white' }} />}
                  valueStyle={{ color: 'white', fontSize: '32px', fontWeight: '700' }}
                />
              </Card>
            </Col>
          </Row>

          

          {/* Recent Activity Timeline */}
          <Card 
            title={
              <span style={{ fontSize: '20px', fontWeight: '600', color: '#667eea' }}>
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                Aktivitas Terakhir
              </span>
            }
            style={{ 
              marginBottom: 32,
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            <Timeline mode="left">
              {userTransactions.slice(0, 5).map((trans, idx) => (
                <Timeline.Item 
                  key={trans.id}
                  color={idx === 0 ? "green" : "blue"}
                  dot={idx === 0 ? <CheckCircleOutlined style={{ fontSize: '16px' }} /> : null}
                >
                  <Text strong>{trans.packageName}</Text>
                  <br />
                  <Text type="secondary">
                    {new Date(trans.transactionDate).toLocaleDateString('id-ID')} - {trans.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>

          {/* Paket Diskon */}
          {discountedPackages.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <Title level={3} style={{ marginBottom: 16 }}>
                <span style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '700',
                }}>
                  <TagOutlined style={{ marginRight: 8, color: '#f5576c' }} />
                  🔥 Paket Diskon Spesial
                </span>
              </Title>
              <Row gutter={[24, 24]}>
                {discountedPackages.map((pkg) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={pkg.id}>
                    <Badge.Ribbon text={`🎁 ${pkg.discountPercentage || 0}% OFF`} color="#f5576c">
                      <Card
                        title={
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FireOutlined style={{ color: '#f5576c' }} />
                            <span style={{ fontSize: '18px', fontWeight: '600' }}>{pkg.name}</span>
                          </div>
                        }
                        bordered={false}
                        style={{ 
                          borderRadius: 16, 
                          boxShadow: "0 8px 24px rgba(245, 87, 108, 0.2)",
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: '2px solid #f5576c22',
                        }}
                        hoverable
                      >
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ marginBottom: 12 }}>
                            <Text delete style={{ color: '#999', fontSize: '14px' }}>
                              {pkg.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                            </Text>
                            <br/>
                            <Text strong style={{ color: '#f5576c', fontSize: '24px' }}>
                              {((pkg.price * (100 - (pkg.discountPercentage || 0))) / 100).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                            </Text>
                          </div>
                          <div style={{ 
                            padding: '12px', 
                            background: 'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
                            borderRadius: '8px',
                            marginBottom: 12,
                          }}>
                            <Text><strong>📦 Quota:</strong> {pkg.quota}</Text><br/>
                            <Text><strong>⏱️ Durasi:</strong> {pkg.duration}</Text><br/>
                            <Text><strong>⚡ Kecepatan:</strong> {pkg.speed}</Text>
                          </div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>{pkg.description}</Text>
                        </div>
                        <Button 
                          type="primary" 
                          size="large"
                          block
                          style={{ 
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            border: 'none',
                            fontWeight: '600',
                            height: '48px',
                            fontSize: '16px',
                          }}
                          onClick={() => handleBuyClick(pkg)}
                          icon={<ShoppingCartOutlined />}
                        >
                          Beli Sekarang
                        </Button>
                      </Card>
                    </Badge.Ribbon>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Kategori Paket */}
          <div style={{ marginBottom: 32 }}>
            <Title level={3} style={{ marginBottom: 16 }}>
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
              }}>
                📱 Semua Kategori Paket
              </span>
            </Title>
            <Tabs 
              activeKey={selectedCategory} 
              onChange={setSelectedCategory}
              type="card"
              style={{ marginBottom: 16 }}
              tabBarStyle={{
                background: 'white',
                borderRadius: '12px',
                padding: '8px',
              }}
            >
              {categories.map((cat) => (
                <TabPane 
                  tab={
                    <span style={{ fontWeight: '600', padding: '4px 8px' }}>
                      {cat === "All" && "🌟 "}
                      {cat}
                    </span>
                  } 
                  key={cat} 
                />
              ))}
            </Tabs>
            <Row gutter={[24, 24]}>
              {filteredPackages.map((pkg, idx) => {
                const colors = [
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                ];
                const cardColor = colors[idx % colors.length];
                
                return (
                  <Col xs={24} sm={12} md={8} lg={6} key={pkg.id}>
                    <Card
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <WifiOutlined />
                          <span style={{ fontSize: '18px', fontWeight: '600' }}>{pkg.name}</span>
                        </div>
                      }
                      bordered={false}
                      style={{ 
                        borderRadius: 16, 
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '2px solid transparent',
                        backgroundImage: `${cardColor}`,
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                      }}
                      hoverable
                      headStyle={{ 
                        background: 'white',
                        borderRadius: '14px 14px 0 0',
                      }}
                      bodyStyle={{ background: 'white' }}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <Text strong style={{ fontSize: '28px', background: cardColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          {pkg.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                        </Text>
                        <div style={{ 
                          padding: '12px', 
                          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                          borderRadius: '8px',
                          marginTop: 12,
                          marginBottom: 12,
                        }}>
                          <Text><strong>📦 Quota:</strong> {pkg.quota}</Text><br/>
                          <Text><strong>⏱️ Durasi:</strong> {pkg.duration}</Text><br/>
                          <Text><strong>⚡ Kecepatan:</strong> {pkg.speed}</Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{pkg.description}</Text>
                      </div>
                      <Button 
                        type="primary" 
                        size="large"
                        block
                        style={{ 
                          borderRadius: '12px',
                          background: cardColor,
                          border: 'none',
                          fontWeight: '600',
                          height: '48px',
                          fontSize: '16px',
                        }}
                        onClick={() => handleBuyClick(pkg)}
                        icon={<ShoppingCartOutlined />}
                      >
                        Beli Sekarang
                      </Button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* Modal Konfirmasi */}
          <Modal
            title={
              <span style={{ fontSize: '20px', fontWeight: '600' }}>
                <ShoppingCartOutlined style={{ marginRight: 8, color: '#667eea' }} />
                Konfirmasi Pembelian
              </span>
            }
            visible={isModalVisible}
            onOk={handleConfirmPurchase}
            onCancel={() => setIsModalVisible(false)}
            okText=" Beli Sekarang"
            cancelText=" Batal"
            okButtonProps={{ 
              style: { 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                height: '40px',
                fontWeight: '600',
              }
            }}
            cancelButtonProps={{
              style: {
                borderRadius: '8px',
                height: '40px',
              }
            }}
          >
            {selectedPackage && (
              <div>
                <Card 
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    marginBottom: 16,
                  }}
                >
                  <Text>📦 Paket: </Text>
                  <Text strong style={{ fontSize: '18px' }}>{selectedPackage.name}</Text>
                  <br />
                  <Text>💰 Harga: </Text>
                  <Text strong style={{ fontSize: '18px', color: '#52c41a' }}>
                    {selectedPackage.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                  </Text>
                </Card>

                <div style={{ marginTop: 16 }}>
                  <Text strong style={{ fontSize: '16px' }}>💳 Pilih Metode Pembayaran:</Text>
                  <Select 
                    value={paymentMethod} 
                    onChange={(value) => setPaymentMethod(value)} 
                    style={{ width: "100%", marginTop: 12 }}
                    size="large"
                  >
                    <Option value="E-Wallet">💸 E-Wallet</Option>
                    <Option value="Transfer Bank">🏦 Transfer Bank</Option>
                    <Option value="Kartu Kredit">💳 Kartu Kredit</Option>
                    <Option value="Tunai">💵 Tunai</Option>
                  </Select>
                </div>
              </div>
            )}
          </Modal>
        </Content>
      </Layout>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

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

        .ant-card-hoverable:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15) !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ant-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ant-tabs-tab {
          transition: all 0.3s ease;
        }

        .ant-tabs-tab:hover {
          transform: translateY(-2px);
        }

        .ant-tabs-tab-active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          color: white !important;
          border-radius: 8px !important;
        }

        .ant-tabs-tab-active span {
          color: white !important;
        }
      `}</style>
    </Layout>
  );
}