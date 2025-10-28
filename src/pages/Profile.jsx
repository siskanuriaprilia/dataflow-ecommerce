import React, { useState, useEffect } from "react";
import { Layout, Card, Avatar, Descriptions, Button, Form, Input, message } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function Profil() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Ambil data pengguna dari localStorage (sesuaikan dengan struktur data Anda)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      form.setFieldsValue(storedUser); // Set nilai form awal
    }
  }, [form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (values) => {
    // Simpan perubahan ke localStorage (atau API jika ada backend)
    localStorage.setItem("user", JSON.stringify(values));
    setUser(values);
    setIsEditing(false);
    message.success("Profil berhasil diperbarui!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields(); // Reset form ke nilai awal
  };

  if (!user) {
    return <div>Loading...</div>; // Atau redirect ke login jika tidak ada user
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        <Card
          title="Profil Pengguna"
          style={{ maxWidth: 600, margin: "0 auto" }}
          extra={
            !isEditing && (
              <Button icon={<EditOutlined />} onClick={handleEdit}>
                Edit
              </Button>
            )
          }
        >
          {!isEditing ? (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Nama">
                <Avatar icon={<UserOutlined />} /> {user.name || "Tidak ada nama"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{user.email || "Tidak ada email"}</Descriptions.Item>
              <Descriptions.Item label="Role">{user.role || "Tidak ada role"}</Descriptions.Item>
              {/* Tambahkan field lain jika diperlukan, seperti alamat, telepon, dll. */}
            </Descriptions>
          ) : (
            <Form form={form} layout="vertical" onFinish={handleSave}>
              <Form.Item name="name" label="Nama" rules={[{ required: true, message: "Nama wajib diisi!" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Email tidak valid!" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="role" label="Role">
                <Input />
              </Form.Item>
              {/* Tambahkan field lain jika diperlukan */}
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                  Simpan
                </Button>
                <Button onClick={handleCancel}>Batal</Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Content>
    </Layout>
  );
}