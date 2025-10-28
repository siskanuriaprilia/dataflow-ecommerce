import React, { useState, useEffect } from "react";
import { Layout, Card, Avatar, Button, Form, Input, message, Typography, Space, Divider } from "antd";
import { UserOutlined, EditOutlined, MailOutlined, SafetyOutlined, CheckOutlined, CloseOutlined, TrophyOutlined, CalendarOutlined, ShoppingOutlined, CreditCardOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarCustomer from "../components/SidebarCustomer";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Profil() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      form.setFieldsValue(storedUser);
    }
  }, [form]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = (values) => {
    localStorage.setItem("user", JSON.stringify(values));
    setUser(values);
    setIsEditing(false);
    message.success("Profil berhasil diperbarui!");
  };
  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <SidebarCustomer defaultKey="profil" />
      <Layout style={{ background: "#f5f5f5" }}>
        <Content style={{ padding: "32px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Header Card */}
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                marginBottom: 24,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.15)"
              }}
            >
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "#fff",
                    color: "#667eea",
                    border: "4px solid rgba(255,255,255,0.3)",
                    marginBottom: 16
                  }}
                />
                <Title level={3} style={{ color: "#fff", margin: "8px 0" }}>
                  {user.name || "Nama Pengguna"}
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>
                  {user.email || "email@example.com"}
                </Text>
              </div>
            </Card>

            {/* Main Content Flex Layout */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {/* Profile Details Card */}
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  flex: isEditing ? "1 1 100%" : "1 1 45%",
                  minWidth: 300
                }}
                title={
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={4} style={{ margin: 0 }}>Informasi Profil</Title>
                    {!isEditing && (
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={handleEdit}
                        style={{
                          borderRadius: 8,
                          background: "#667eea",
                          borderColor: "#667eea"
                        }}
                      >
                        Edit Data
                      </Button>
                    )}
                  </div>
                }
              >
                {!isEditing ? (
                  <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    {/* Nama */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                        <UserOutlined style={{ fontSize: 18, color: "#667eea", marginRight: 12 }} />
                        <Text strong style={{ color: "#8c8c8c", fontSize: 13 }}>NAMA LENGKAP</Text>
                      </div>
                      <Text style={{ fontSize: 16, marginLeft: 30, display: "block" }}>
                        {user.name || "Tidak ada nama"}
                      </Text>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    {/* Email */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                        <MailOutlined style={{ fontSize: 18, color: "#667eea", marginRight: 12 }} />
                        <Text strong style={{ color: "#8c8c8c", fontSize: 13 }}>EMAIL</Text>
                      </div>
                      <Text style={{ fontSize: 16, marginLeft: 30, display: "block" }}>
                        {user.email || "Tidak ada email"}
                      </Text>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    {/* Role */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                        <SafetyOutlined style={{ fontSize: 18, color: "#667eea", marginRight: 12 }} />
                        <Text strong style={{ color: "#8c8c8c", fontSize: 13 }}>ROLE</Text>
                      </div>
                      <Text style={{ fontSize: 16, marginLeft: 30, display: "block" }}>
                        <span style={{
                          background: "#f0f5ff",
                          color: "#667eea",
                          padding: "4px 12px",
                          borderRadius: 6,
                          fontWeight: 500
                        }}>
                          {user.role || "Customer"}
                        </span>
                      </Text>
                    </div>
                  </Space>
                ) : (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    style={{ marginTop: 16 }}
                  >
                    <Form.Item
                      name="name"
                      label={<Text strong>Nama Lengkap</Text>}
                      rules={[{ required: true, message: "Nama wajib diisi!" }]}
                    >
                      <Input
                        prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                        placeholder="Masukkan nama lengkap"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label={<Text strong>Email</Text>}
                      rules={[
                        { required: true, message: "Email wajib diisi!" },
                        { type: "email", message: "Email tidak valid!" }
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                        placeholder="Masukkan email"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="role"
                      label={<Text strong>Role</Text>}
                    >
                      <Input
                        prefix={<SafetyOutlined style={{ color: "#bfbfbf" }} />}
                        placeholder="Role pengguna"
                        size="large"
                        style={{ borderRadius: 8 }}
                        disabled
                      />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          style={{
                            borderRadius: 8,
                            background: "#52c41a",
                            borderColor: "#52c41a",
                            paddingLeft: 24,
                            paddingRight: 24
                          }}
                        >
                          Simpan Perubahan
                        </Button>
                        <Button
                          onClick={handleCancel}
                          size="large"
                          style={{
                            borderRadius: 8,
                            paddingLeft: 24,
                            paddingRight: 24
                          }}
                        >
                          Batal
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                )}
              </Card>

              {/* Statistics Cards - Only show when not editing */}
              {!isEditing && (
                <>
                  {/* Account Stats Card */}
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      flex: "1 1 25%",
                      minWidth: 250
                    }}
                    title={<Title level={4} style={{ margin: 0 }}>Statistik Akun</Title>}
                  >
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <div style={{
                        background: "#f0f5ff",
                        padding: 16,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ShoppingOutlined style={{ fontSize: 24, color: "#667eea", marginRight: 12 }} />
                          <div>
                            <Text style={{ display: "block", fontSize: 12, color: "#8c8c8c" }}>Total Transaksi</Text>
                            <Title level={3} style={{ margin: 0, color: "#667eea" }}>24</Title>
                          </div>
                        </div>
                      </div>

                      <div style={{
                        background: "#f6ffed",
                        padding: 16,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CreditCardOutlined style={{ fontSize: 24, color: "#52c41a", marginRight: 12 }} />
                          <div>
                            <Text style={{ display: "block", fontSize: 12, color: "#8c8c8c" }}>Total Pengeluaran</Text>
                            <Title level={3} style={{ margin: 0, color: "#52c41a" }}>Rp 2.450.000</Title>
                          </div>
                        </div>
                      </div>

                      <div style={{
                        background: "#fff7e6",
                        padding: 16,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <TrophyOutlined style={{ fontSize: 24, color: "#fa8c16", marginRight: 12 }} />
                          <div>
                            <Text style={{ display: "block", fontSize: 12, color: "#8c8c8c" }}>Poin Loyalitas</Text>
                            <Title level={3} style={{ margin: 0, color: "#fa8c16" }}>1,250</Title>
                          </div>
                        </div>
                      </div>
                    </Space>
                  </Card>

                  {/* Activity Card */}
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      flex: "1 1 100%",
                      minWidth: 300
                    }}
                    title={<Title level={4} style={{ margin: 0 }}>Aktivitas Terbaru</Title>}
                  >
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      {[
                        { date: "28 Okt 2025", action: "Login ke sistem", time: "14:30" },
                        { date: "27 Okt 2025", action: "Melakukan transaksi pembelian", time: "10:15" },
                        { date: "26 Okt 2025", action: "Update profil", time: "16:45" },
                        { date: "25 Okt 2025", action: "Login ke sistem", time: "09:20" }
                      ].map((activity, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            background: "#fafafa",
                            borderRadius: 8,
                            borderLeft: "3px solid #667eea"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <CalendarOutlined style={{ fontSize: 16, color: "#667eea", marginRight: 12 }} />
                            <div>
                              <Text strong style={{ display: "block" }}>{activity.action}</Text>
                              <Text style={{ fontSize: 12, color: "#8c8c8c" }}>{activity.date}</Text>
                            </div>
                          </div>
                          <Text style={{ color: "#8c8c8c" }}>{activity.time}</Text>
                        </div>
                      ))}
                    </Space>
                  </Card>
                </>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
