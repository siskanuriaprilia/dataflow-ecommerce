import React, { useState, useEffect } from "react";
import {
  Layout, Table, Card, message, Modal, Button, Form, Select, Space, Tag, Typography, Popconfirm, Row, Col, Statistic,
} from "antd";
import {
  EditOutlined, DeleteOutlined, PlusOutlined, DollarOutlined,RiseOutlined
} from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactionForm] = Form.useForm();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [customersRes, packagesRes, transactionsRes] = await Promise.all([
        fetch("http://localhost:3001/customers"),
        fetch("http://localhost:3001/packages"),
        fetch("http://localhost:3001/transactions"),
      ]);
      setCustomers(await customersRes.json());
      setPackages(await packagesRes.json());
      setTransactions(await transactionsRes.json());
    } catch (error) {
      message.error("Gagal memuat data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingTransaction(null);
    transactionForm.resetFields();
    setModalVisible(true);
  };

  const openEditModal = (record) => {
    setEditingTransaction(record);
    transactionForm.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/transactions/${id}`, { method: "DELETE" });
      message.success("Transaksi berhasil dihapus");
      fetchData();
    } catch (error) {
      message.error("Gagal menghapus transaksi");
    }
  };

  const handleTransactionSubmit = async (values) => {
    setLoading(true);
    try {
      const customer = customers.find((c) => c.id === values.customerId);
      const pkg = packages.find((p) => p.id === values.packageId);
      const newTransaction = {
        customerId: values.customerId,
        customerName: customer.name,
        packageId: values.packageId,
        packageName: pkg.name,
        quota: pkg.quota,
        price: pkg.price,
        transactionDate: new Date().toISOString(),
        status: "success",
        paymentMethod: values.paymentMethod,
      };

      const url = editingTransaction
        ? `http://localhost:3001/transactions/${editingTransaction.id}`
        : "http://localhost:3001/transactions";
      const method = editingTransaction ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        message.success(editingTransaction ? "Transaksi diperbarui" : "Transaksi ditambahkan");
        fetchData();
        setModalVisible(false);
      } else {
        throw new Error("Gagal menyimpan transaksi");
      }
    } catch (error) {
      message.error("Gagal memproses transaksi");
    }
    setLoading(false);
  };

  // Hitung statistik
  const totalTransactions = transactions.length;
  const totalRevenue = transactions.reduce((sum, t) => sum + t.price, 0);

  const transactionColumns = [
    {
      title: "Tanggal",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) =>
        new Date(date).toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    { title: "Pelanggan", dataIndex: "customerName", key: "customerName" },
    { title: "Paket", dataIndex: "packageName", key: "packageName" },
    { title: "Kuota", dataIndex: "quota", key: "quota", render: (quota) => <Tag color="blue">{quota}</Tag> },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Text strong style={{ color: "#52c41a" }}>
          Rp {price.toLocaleString("id-ID")}
        </Text>
      ),
    },
    { title: "Pembayaran", dataIndex: "paymentMethod", key: "paymentMethod" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Yakin ingin menghapus transaksi ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button danger icon={<DeleteOutlined />}>
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarMenu defaultKey="transactions" />

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
                      💰 Daftar Transaksi
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: 16 }}>
                      Kelola dan pantau semua transaksi pelanggan
                    </Text>
                  </div>
                </div>

         {/* Statistics Cards - Mirip Dashboard */}
<Row gutter={16} style={{ marginBottom: "24px" }}>
  {/* Total Transaksi */}
  <Col xs={24} sm={12} md={8}>
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "left",
      }}
    >
      <Statistic
        title="Total Transaksi"
        value={totalTransactions}
        prefix={<DollarOutlined />}
        valueStyle={{ color: "#667eea" }}
      />
      <div style={{ marginTop: 8 }}>
        <RiseOutlined style={{ color: "#52c41a" }} />
        <Text type="secondary" style={{ marginLeft: 8 }}>
          +8% bulan ini
        </Text>
      </div>
    </Card>
  </Col>

      {/* Total Pendapatan */}
      <Col xs={24} sm={12} md={8}>
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "left",
          }}
        >
          <Statistic
            title="Total Pendapatan"
            value={totalRevenue}
            prefix="Rp"
            valueStyle={{ color: "#52c41a" }}
            formatter={(value) => value.toLocaleString("id-ID")}
          />
          <div style={{ marginTop: 8 }}>
            <RiseOutlined style={{ color: "#52c41a" }} />
            <Text type="secondary" style={{ marginLeft: 8 }}>
              +12% bulan ini
            </Text>
          </div>
        </Card>
      </Col>
    </Row>

          {/* Transaction Management */}
          <Card
            title="Manajemen Transaksi"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={openAddModal}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                }}
              >
                Tambah Transaksi
              </Button>
            }
            style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Table
              columns={transactionColumns}
              dataSource={transactions}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 8 }}
            />
          </Card>

          <Modal
            title={editingTransaction ? "Edit Transaksi" : "Tambah Transaksi"}
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            width={600}
          >
            <Form form={transactionForm} onFinish={handleTransactionSubmit} layout="vertical">
              <Form.Item name="customerId" label="Pelanggan" rules={[{ required: true }]}>
                <Select placeholder="Pilih pelanggan" showSearch optionFilterProp="children">
                  {customers.map((c) => (
                    <Option key={c.id} value={c.id}>
                      {c.name} - {c.phone}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="packageId" label="Paket" rules={[{ required: true }]}>
                <Select placeholder="Pilih paket">
                  {packages.map((p) => (
                    <Option key={p.id} value={p.id}>
                      {p.name} - {p.quota} ({p.duration}) - Rp {p.price.toLocaleString("id-ID")}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="paymentMethod" label="Metode Pembayaran" rules={[{ required: true }]}>
                <Select placeholder="Pilih metode pembayaran">
                  <Option value="E-Wallet">E-Wallet</Option>
                  <Option value="Transfer Bank">Transfer Bank</Option>
                  <Option value="Kartu Kredit">Kartu Kredit</Option>
                  <Option value="Tunai">Tunai</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Space style={{ justifyContent: "end", width: "100%" }}>
                  <Button onClick={() => setModalVisible(false)}>Batal</Button>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                    }}
                  >
                    Simpan
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}
