import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Table,
  Typography,
  message,
  Row,
  Col,
  Statistic,
  Input,
  Tag,
  Avatar,
  Button,
  Modal,
  Form,
  Select,
  Space,
  Popconfirm,
} from "antd";
import {
  TeamOutlined,
  SearchOutlined,
  UserAddOutlined,
  TrophyOutlined,
  RiseOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Warna avatar random
const AVATAR_COLORS = [
  "#667eea", "#f093fb", "#4facfe", "#764ba2", "#43e97b",
  "#fa709a", "#30cfd0", "#ffecd2", "#ff6b6b", "#4ecdc4"
];

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchText]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3001/customers");
      const data = await response.json();

      if (!data || data.length === 0) {
        setCustomers([]);
      } else {
        setCustomers(data);
      }
    } catch (error) {
      setCustomers([]);
      message.info("Menggunakan data demo");
    }
  };

  const filterCustomers = () => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.phone.includes(searchText)
    );
    setFilteredCustomers(filtered);
  };

  // Generate avatar dari nama
  const generateAvatar = (name) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const getRandomColor = () => {
    return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingCustomer) {
        const updatedCustomers = customers.map((c) =>
          c.id === editingCustomer.id
            ? { ...c, ...values, avatar: generateAvatar(values.name) }
            : c
        );
        setCustomers(updatedCustomers);
        message.success("Data pelanggan berhasil diperbarui!");
      } else {
        const newCustomer = {
          id: Date.now(),
          ...values,
          totalOrders: 0,
          totalSpent: 0,
          joinDate: new Date().toISOString().split("T")[0],
          avatar: generateAvatar(values.name),
          color: getRandomColor(),
        };
        setCustomers([...customers, newCustomer]);
        message.success("Pelanggan baru berhasil ditambahkan!");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleDelete = (id) => {
    const updatedCustomers = customers.filter((c) => c.id !== id);
    setCustomers(updatedCustomers);
    message.success("Pelanggan berhasil dihapus!");
  };

  const customerColumns = [
    {
      title: "Pelanggan",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 280,
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar
            style={{
              backgroundColor: record.color || "#667eea",
              fontSize: 14,
              fontWeight: "bold",
            }}
            size={45}
          >
            {record.avatar || generateAvatar(text)}
          </Avatar>
          <div>
            <Text strong style={{ display: "block", fontSize: 14 }}>
              {text}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <MailOutlined /> {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Telepon",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (text) => (
        <Text>
          <PhoneOutlined /> {text}
        </Text>
      ),
    },
    {
      title: "Aksi",
      key: "action",
      fixed: "right",
      width: 160,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              border: "1px solid #d9d9d9",
              color: "#000",
              background: "white",
              borderRadius: 6,
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Hapus pelanggan?"
            description="Apakah Anda yakin ingin menghapus pelanggan ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              style={{
                border: "1px solid #ff4d4f",
                color: "#ff4d4f",
                background: "white",
                borderRadius: 6,
              }}
            >
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarMenu defaultKey="customers" />

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
                      👩‍💼👨‍💼  Manajemen Pelanggan
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: 16 }}>
                      Kelola dan pantau data pelanggan Anda dengan mudah
                    </Text>
                  </div>
                </div>

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
                  title="Total Pelanggan"
                  value={customers.length}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: "#667eea", fontSize: 28 }}
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


          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TeamOutlined style={{ fontSize: 20 }} />
                <span>Daftar Pelanggan</span>
              </div>
            }
            extra={
              <Space>
                <Input
                  placeholder="Cari pelanggan..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 250, borderRadius: 8 }}
                  allowClear
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                   style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                }}
                >
                  Tambah Pelanggan
                </Button>
              </Space>
            }
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "none",
            }}
          >
            <Table
              columns={customerColumns}
              dataSource={filteredCustomers}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} pelanggan`,
              }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </Content>
      </Layout>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <UserAddOutlined style={{ color: "#667eea" }} />
            <span>{editingCustomer ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}</span>
          </div>
        }
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText={editingCustomer ? "Perbarui" : "Tambah"}
        cancelText="Batal"
        width={600}
        okButtonProps={{
        style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
          },
        }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            name="name"
            label="Nama Lengkap"
            rules={[
              { required: true, message: "Nama wajib diisi!" },
              { min: 3, message: "Nama minimal 3 karakter!" },
            ]}
          >
            <Input placeholder="Masukkan nama lengkap" prefix={<TeamOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email wajib diisi!" },
              { type: "email", message: "Format email tidak valid!" },
            ]}
          >
            <Input placeholder="contoh@email.com" prefix={<MailOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Nomor Telepon"
            rules={[
              { required: true, message: "Nomor telepon wajib diisi!" },
              { pattern: /^[0-9-+()]*$/, message: "Hanya angka dan simbol telepon!" },
            ]}
          >
            <Input placeholder="08xx-xxxx-xxxx" prefix={<PhoneOutlined />} size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
