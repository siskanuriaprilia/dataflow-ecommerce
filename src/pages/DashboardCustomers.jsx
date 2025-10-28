import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, Button, message, Modal, Select } from "antd";
import SidebarCustomer from "../components/SidebarCustomer";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export default function WelcomePage() {
  const [packages, setPackages] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("E-Wallet");

  // Ambil data paket & user dari localStorage
  useEffect(() => {
    fetchPackages();
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
    } catch (error) {
      message.error("Terjadi kesalahan saat membeli paket");
      console.error(error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarCustomer defaultKey="dashboard-customers" />
      <Layout style={{ background: "#f0f2f5" }}>
        <Content style={{ margin: 24 }}>
          {/* Header */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <Title level={2}>Selamat Datang{user ? `, ${user.name}` : ""}!</Title>
            <Text style={{ fontSize: 16, color: "#555" }}>
              Pilih paket yang sesuai kebutuhan Anda.
            </Text>
          </div>

          {/* List Paket */}
          <Row gutter={[24, 24]}>
            {packages.map((pkg) => (
              <Col xs={24} sm={12} md={8} lg={6} key={pkg.id}>
                <Card
                  title={pkg.name}
                  bordered={false}
                  style={{ borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                  extra={<Text strong>{pkg.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</Text>}
                >
                  <Text>Quota: {pkg.quota}</Text><br/>
                  <Text>Durasi: {pkg.duration}</Text><br/>
                  <Text>Kecepatan: {pkg.speed}</Text><br/>
                  <Text type="secondary">{pkg.description}</Text>
                  <div style={{ marginTop: 16, textAlign: "center" }}>
                    <Button type="primary" onClick={() => handleBuyClick(pkg)}>Beli Sekarang</Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Modal Konfirmasi */}
          <Modal
            title="Konfirmasi Pembelian"
            visible={isModalVisible}
            onOk={handleConfirmPurchase}
            onCancel={() => setIsModalVisible(false)}
            okText="Beli"
            cancelText="Batal"
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
    </Layout>
  );
}
