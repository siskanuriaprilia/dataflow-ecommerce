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
  Badge,
  Space,
  Divider,
} from "antd";
import {
  ShoppingCartOutlined,
  WifiOutlined,
  ThunderboltOutlined,
  FireOutlined,
  CrownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  RiseOutlined,
  TrophyOutlined,
  PlusOutlined, // 🆕 Tambahkan ikon Plus
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";

const { Content } = Layout;
const { Text, Title } = Typography;
const handleAddPackage = () => {
    form.resetFields();
    setIsModalVisible(true);
  };
const handleSavePackage = async () => {
    try {
      const values = await form.validateFields();

      const newPackage = {
        id: Date.now(),
        ...values,
        createdAt: new Date().toLocaleDateString(),
      };

      setPackages([...packages, newPackage]);
      message.success("Paket berhasil ditambahkan!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };
   const handleCancelAdd = () => {
    setIsModalVisible(false);
    form.resetFields();
  };


// Data dummy paket
const DUMMY_PACKAGES = [
  {
    id: 1,
    name: "Paket Starter",
    quota: "5 GB",
    duration: "7 Hari",
    price: 25000,
    speed: "10 Mbps",
    category: "basic",
    popular: false,
    features: ["Unlimited Apps", "24/7 Support", "Fair Usage Policy"],
  },
  {
    id: 2,
    name: "Paket Medium",
    quota: "12 GB",
    duration: "14 Hari",
    price: 50000,
    speed: "20 Mbps",
    category: "standard",
    popular: true,
    features: ["Unlimited Apps", "Priority Support", "No FUP", "Free Bonus 2GB"],
  },
  {
    id: 3,
    name: "Paket Pro",
    quota: "25 GB",
    duration: "30 Hari",
    price: 95000,
    speed: "30 Mbps",
    category: "premium",
    popular: false,
    features: ["Unlimited Apps", "VIP Support", "No FUP", "Free Bonus 5GB", "Gaming Priority"],
  },
  {
    id: 4,
    name: "Paket Ultimate",
    quota: "50 GB",
    duration: "30 Hari",
    price: 150000,
    speed: "50 Mbps",
    category: "ultimate",
    popular: false,
    features: ["Unlimited Apps", "VIP Support", "No FUP", "Free Bonus 10GB", "Gaming Priority", "Streaming HD"],
  },
  {
    id: 5,
    name: "Paket Mini",
    quota: "2 GB",
    duration: "3 Hari",
    price: 15000,
    speed: "10 Mbps",
    category: "basic",
    popular: false,
    features: ["Unlimited Apps", "24/7 Support"],
  },
  {
    id: 6,
    name: "Paket Super",
    quota: "35 GB",
    duration: "30 Hari",
    price: 120000,
    speed: "40 Mbps",
    category: "premium",
    popular: true,
    features: ["Unlimited Apps", "VIP Support", "No FUP", "Free Bonus 7GB", "Gaming Priority"],
  },
];

export default function PackagePage() {
  const [packages, setPackages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:3001/packages");
      const data = await response.json();
      if (!data || data.length === 0) {
        setPackages(DUMMY_PACKAGES);
      } else {
        setPackages(data);
      }
    } catch (error) {
      setPackages(DUMMY_PACKAGES);
      message.info("Menggunakan data demo");
    }
  };

  const handleBuyPackage = (pkg) => {
    message.success(`Paket ${pkg.name} dipilih! Mengarahkan ke halaman transaksi...`);
    navigate(`/transactions?packageId=${pkg.id}`);
  };

  // 🆕 Tambahkan handler untuk tambah paket
  const handleAddPackage = () => {
    message.info("Navigasi ke halaman tambah paket...");
    navigate("/add-package"); // ganti sesuai rute kamu
  };

  // Filter packages
  const filteredPackages =
    selectedCategory === "all" ? packages : packages.filter((pkg) => pkg.category === selectedCategory);

  // Statistik
  const totalPackages = packages.length;
  const popularPackages = packages.filter((p) => p.popular).length;
  const avgPrice = packages.reduce((sum, p) => sum + p.price, 0) / packages.length || 0;
  const premiumPackages = packages.filter((p) => p.category === "premium" || p.category === "ultimate").length;

  // Get category style
  const getCategoryStyle = (category) => {
    const styles = {
      basic: {
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#667eea",
        icon: <ThunderboltOutlined />,
        label: "Basic",
      },
      standard: {
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        color: "#f093fb",
        icon: <FireOutlined />,
        label: "Standard",
      },
      premium: {
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        color: "#4facfe",
        icon: <TrophyOutlined />,
        label: "Premium",
      },
      ultimate: {
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        color: "#faad14",
        icon: <CrownOutlined />,
        label: "Ultimate",
      },
    };
    return styles[category] || styles.basic;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarMenu defaultKey="packages" />

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
                📡 Paket Internet
              </Title>
              <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: 16 }}>
                Pilih paket terbaik yang sesuai dengan kebutuhan internet Anda
              </Text>
            </div>
          </div>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                  
                }}
              >
                <Statistic
                  title="Total Paket"
                  value={totalPackages}
                  prefix={<WifiOutlined style={{ color: "purple" }} />}
                  valueStyle={{ color: "purple", fontSize: 28 }}
                  suffix={<Text type="secondary">paket</Text>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Statistic
                  title="Paket Populer"
                  value={popularPackages}
                  prefix={<FireOutlined />}
                  valueStyle={{ color: "#ff4d4f", fontSize: 28 }}
                  suffix={<Text type="secondary">paket</Text>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Statistic
                  title="Rata-rata Harga"
                  value={avgPrice}
                  prefix="Rp"
                  precision={0}
                  valueStyle={{ color: "#52c41a", fontSize: 24 }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Statistic
                  title="Paket Premium"
                  value={premiumPackages}
                  prefix={<CrownOutlined />}
                  valueStyle={{ color: "#faad14", fontSize: 28 }}
                  suffix={<Text type="secondary">paket</Text>}
                />
              </Card>
            </Col>
          </Row>
          
           {/* 🆕 Tombol Tambah Paket */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddPackage}
              style={{
                borderRadius: 8,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: "none",
                fontWeight: "bold",
              }}
            >
              Tambah Paket
            </Button>
          </div>
          

          {/* Filter Categories */}
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "none",
              marginBottom: 24,
            }}
            bodyStyle={{ padding: 16 }}
          >
            <Space size="middle" wrap>
              <Button
                type={selectedCategory === "all" ? "primary" : "default"}
                onClick={() => setSelectedCategory("all")}
                style={{
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Semua Paket
              </Button>
              <Button
                type={selectedCategory === "basic" ? "primary" : "default"}
                icon={<ThunderboltOutlined />}
                onClick={() => setSelectedCategory("basic")}
                style={{
                  borderRadius: 8,
                  background: selectedCategory === "basic" ? "#667eea" : undefined,
                }}
              >
                Basic
              </Button>
              <Button
                type={selectedCategory === "standard" ? "primary" : "default"}
                icon={<FireOutlined />}
                onClick={() => setSelectedCategory("standard")}
                style={{
                  borderRadius: 8,
                  background: selectedCategory === "standard" ? "#f093fb" : undefined,
                }}
              >
                Standard
              </Button>
              <Button
                type={selectedCategory === "premium" ? "primary" : "default"}
                icon={<TrophyOutlined />}
                onClick={() => setSelectedCategory("premium")}
                style={{
                  borderRadius: 8,
                  background: selectedCategory === "premium" ? "#4facfe" : undefined,
                }}
              >
                Premium
              </Button>
              <Button
                type={selectedCategory === "ultimate" ? "primary" : "default"}
                icon={<CrownOutlined />}
                onClick={() => setSelectedCategory("ultimate")}
                style={{
                  borderRadius: 8,
                  background: selectedCategory === "ultimate" ? "#faad14" : undefined,
                }}
              >
                Ultimate
              </Button>
            </Space>
          </Card>

          {/* Package List */}
          <Row gutter={[16, 16]}>
            {filteredPackages.map((pkg) => {
              const categoryStyle = getCategoryStyle(pkg.category);
              
              return (
                <Col xs={24} sm={12} lg={8} xl={6} key={pkg.id}>
                  <Badge.Ribbon
                    text={pkg.popular ? "🔥 POPULER" : ""}
                    color={pkg.popular ? "#ff4d4f" : "transparent"}
                    style={{ display: pkg.popular ? "block" : "none" }}
                  >
                    <Card
                      hoverable
                      style={{
                        borderRadius: 16,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        border: "none",
                        height: "100%",
                        transition: "all 0.3s ease",
                      }}
                      bodyStyle={{ padding: 0 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                      }}
                    >
                      {/* Header with Gradient */}
                      <div
                        style={{
                          background: categoryStyle.gradient,
                          padding: "24px 20px",
                          borderRadius: "16px 16px 0 0",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: 32, marginBottom: 8 }}>
                          {categoryStyle.icon}
                        </div>
                        <Title
                          level={4}
                          style={{ color: "white", margin: 0, marginBottom: 4 }}
                        >
                          {pkg.name}
                        </Title>
                        <Tag
                          color="white"
                          style={{
                            color: categoryStyle.color,
                            fontWeight: "bold",
                            border: "none",
                          }}
                        >
                          {categoryStyle.label}
                        </Tag>
                      </div>

                      {/* Body */}
                      <div style={{ padding: 20 }}>
                        {/* Quota */}
                        <div style={{ textAlign: "center", marginBottom: 16 }}>
                          <Title level={2} style={{ margin: 0, color: categoryStyle.color }}>
                            {pkg.quota}
                          </Title>
                          <Text type="secondary">Kuota Internet</Text>
                        </div>

                        <Divider style={{ margin: "16px 0" }} />

                        {/* Details */}
                        <Space direction="vertical" size="small" style={{ width: "100%" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text type="secondary">
                              <ClockCircleOutlined /> Durasi
                            </Text>
                            <Text strong>{pkg.duration}</Text>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text type="secondary">
                              <WifiOutlined /> Kecepatan
                            </Text>
                            <Text strong>{pkg.speed || "Up to 30 Mbps"}</Text>
                          </div>
                        </Space>

                        {/* Features */}
                        {pkg.features && pkg.features.length > 0 && (
                          <>
                            <Divider style={{ margin: "16px 0" }} />
                            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                              {pkg.features.slice(0, 3).map((feature, index) => (
                                <Text key={index} style={{ fontSize: 12 }}>
                                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 6 }} />
                                  {feature}
                                </Text>
                              ))}
                            </Space>
                          </>
                        )}

                        <Divider style={{ margin: "16px 0" }} />

                        {/* Price */}
                        <div style={{ textAlign: "center", marginBottom: 16 }}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Mulai dari
                          </Text>
                          <div>
                            <Text
                              strong
                              style={{
                                fontSize: 28,
                                color: "#52c41a",
                                fontWeight: "bold",
                              }}
                            >
                              {formatCurrency(pkg.price)}
                            </Text>
                          </div>
                        </div>

                        {/* Button */}
                        <Button
                          type="primary"
                          size="large"
                          icon={<ShoppingCartOutlined />}
                          onClick={() => handleBuyPackage(pkg)}
                          block
                          style={{
                            background: categoryStyle.gradient,
                            border: "none",
                            borderRadius: 8,
                            height: 45,
                            fontWeight: "bold",
                          }}
                        >
                          Beli Sekarang
                        </Button>
                      </div>
                    </Card>
                  </Badge.Ribbon>
                </Col>
              );
            })}
          </Row>

          {/* Empty State */}
          {filteredPackages.length === 0 && (
            <Card
              style={{
                borderRadius: 12,
                textAlign: "center",
                padding: 40,
                marginTop: 24,
              }}
            >
              <WifiOutlined style={{ fontSize: 64, color: "#d9d9d9", marginBottom: 16 }} />
              <Title level={4} type="secondary">
                Tidak ada paket tersedia
              </Title>
              <Text type="secondary">Coba filter kategori lain</Text>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}