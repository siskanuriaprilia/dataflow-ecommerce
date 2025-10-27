import React, { useState } from 'react';
import { Layout, Card, Form, Input, Button, message, Avatar, Typography } from 'antd';
import { UserOutlined, WifiOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/users?username=${values.username}&password=${values.password}`
      );
      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];
        message.success(`Selamat datang, ${user.name}!`);
        localStorage.setItem('user', JSON.stringify(user));

        if (user.role === 'admin') {
          navigate('/transactions');
        } else if (user.role === 'staff') {
          navigate('/customers');
        }
      } else {
        message.error('Username atau password salah');
      }
    } catch (error) {
      message.error('Login gagal. Periksa koneksi Anda.');
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Card style={{ width: '100%', maxWidth: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', borderRadius: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar size={64} icon={<WifiOutlined />} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
            <Title level={3} style={{ marginTop: 16, marginBottom: 8 }}>E-Commerce Paket Data</Title>
            <Text type="secondary">Masuk ke akun Anda</Text>
          </div>

          <Form form={loginForm} onFinish={handleLogin} layout="vertical">
            <Form.Item name="username" rules={[{ required: true, message: 'Username wajib diisi' }]}>
              <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Password wajib diisi' }]}>
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                Masuk
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Demo: username: <Text strong>admin</Text>, password: <Text strong>admin123</Text>
              </Text>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}