// Import yang diperlukan untuk Login
import { useState } from 'react';
import { Layout, Card, Form, Input, Button, message, Avatar, Typography } from 'antd';
import { UserOutlined, WifiOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

// State untuk Login
const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(false);
const [loginForm] = Form.useForm();

// Function Handle Login
const handleLogin = async (values) => {
  setLoading(true);
  try {
    // Fetch user dari JSON Server dengan query parameter
    const response = await fetch(
      `http://localhost:3001/users?username=${values.username}&password=${values.password}`
    );
    const users = await response.json();
    
    // Cek apakah user ditemukan
    if (users.length > 0) {
      setCurrentUser(users[0]); // Set user yang login
      message.success('Login berhasil!');
    } else {
      message.error('Username atau password salah');
    }
  } catch (error) {
    message.error('Login gagal. Periksa koneksi Anda.');
    console.error('Login error:', error);
  }
  setLoading(false);
};

// JSX Login Screen
if (!currentUser) {
  return (
    <Layout style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    }}>
      <Content style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Card style={{ 
          width: 400, 
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
          borderRadius: 12 
        }}>
          {/* Header Login */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar 
              size={64} 
              icon={<WifiOutlined />} 
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              }} 
            />
            <Title level={3} style={{ marginTop: 16, marginBottom: 8 }}>
              E-Commerce Paket Data
            </Title>
            <Text type="secondary">Masuk ke akun Anda</Text>
          </div>

          {/* Form Login */}
          <Form 
            form={loginForm} 
            onFinish={handleLogin} 
            layout="vertical"
          >
            {/* Input Username */}
            <Form.Item 
              name="username" 
              rules={[{ 
                required: true, 
                message: 'Username wajib diisi' 
              }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
                size="large" 
              />
            </Form.Item>

            {/* Input Password */}
            <Form.Item 
              name="password" 
              rules={[{ 
                required: true, 
                message: 'Password wajib diisi' 
              }]}
            >
              <Input.Password 
                placeholder="Password" 
                size="large" 
              />
            </Form.Item>

            {/* Button Submit */}
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large" 
                loading={loading}
              >
                Masuk
              </Button>
            </Form.Item>

            {/* Info Demo Credentials */}
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