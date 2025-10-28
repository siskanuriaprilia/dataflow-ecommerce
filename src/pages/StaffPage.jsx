import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import SidebarMenu from "../components/SidebarMenu";

const { Content } = Layout;

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStaff();
  }, []);

  // 🔹 Ambil data staff dari /users dan filter role
  const fetchStaff = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      const staffData = data.filter((user) => user.role === "staff");
      setStaffList(staffData);
    } catch (error) {
      message.error("Gagal memuat data staff");
    }
  };

  // 🔹 Tambah staff baru ke /users dengan role "staff"
  const handleAddStaff = async (values) => {
    try {
      const newStaff = { ...values, role: "staff" };
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaff),
      });

      if (!response.ok) throw new Error("Gagal menambah staff");

      message.success("Staff berhasil ditambahkan!");
      form.resetFields();
      setIsModalVisible(false);
      fetchStaff();
    } catch (error) {
      message.error(error.message);
    }
  };

  // 🔹 Hapus staff
  const handleDeleteStaff = async (id) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      message.success("Staff berhasil dihapus");
      fetchStaff();
    } catch (error) {
      message.error("Gagal menghapus staff");
    }
  };

  // 🔹 Kolom tabel
  const columns = [
    {
      title: "Nama Staff",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "No. Telepon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Yakin ingin menghapus staff ini?"
          onConfirm={() => handleDeleteStaff(record.id)}
        >
          <Button danger icon={<DeleteOutlined />}>
            Hapus
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <SidebarMenu defaultKey="staff" />

      <Layout style={{ background: "#f0f2f5" }}>
        <Content style={{ margin: 24 }}>
          <Card
            title="Daftar Staff"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                Tambah Staff
              </Button>
            }
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: 8,
            }}
          >
            <Table
              dataSource={staffList}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>

          <Modal
            title="Tambah Staff Baru"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddStaff}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                label="Nama Staff"
                rules={[{ required: true, message: "Nama tidak boleh kosong" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nama Staff" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Email tidak boleh kosong" },
                  { type: "email", message: "Format email tidak valid" },
                ]}
              >
                <Input placeholder="Email Staff" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="No. Telepon"
                rules={[{ required: true, message: "Nomor telepon wajib diisi" }]}
              >
                <Input placeholder="Contoh: 081234567890" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Simpan
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
}
