import React, { useState, useEffect } from 'react';
import { Layout, Card, Form, Input, Button, message, Avatar, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined, WifiOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginForm] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

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
          navigate('/dashboard');
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
    <Layout 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40vw',
        height: '40vw',
        maxWidth: '500px',
        maxHeight: '500px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        maxWidth: '600px',
        maxHeight: '600px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `particle ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: Math.random() * 5 + 's',
          }}
        />
      ))}

      <Content 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '20px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            borderRadius: '20px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          bodyStyle={{ padding: '48px 40px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              marginBottom: 24,
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <WifiOutlined style={{ fontSize: '36px', color: 'white' }} />
            </div>
            <Title level={2} style={{ marginBottom: 8, fontSize: '28px', fontWeight: '700' }}>
              Selamat Datang
            </Title>
            <Text type="secondary" style={{ fontSize: '15px' }}>
              Masuk untuk melanjutkan ke dashboard
            </Text>
          </div>

          <Form 
            form={loginForm} 
            onFinish={handleLogin} 
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Username wajib diisi' }]}
              style={{ marginBottom: 20 }}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#667eea', fontSize: '16px' }} />} 
                placeholder="Username" 
                size="large"
                style={{
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '2px solid #f0f0f0',
                  transition: 'all 0.3s'
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password wajib diisi' }]}
              style={{ marginBottom: 24 }}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#667eea', fontSize: '16px' }} />} 
                placeholder="Password" 
                size="large"
                style={{
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '2px solid #f0f0f0',
                  transition: 'all 0.3s'
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large" 
                loading={loading}
                icon={!loading && <RightOutlined />}
                iconPosition="end"
                style={{
                  height: '52px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s'
                }}
              >
                Masuk
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          }
          50% {
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.6);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 576px) {
          .ant-card-body {
            padding: 32px 24px !important;
          }
          .ant-typography h2 {
            font-size: 24px !important;
          }
        }

        .ant-input:focus,
        .ant-input-password:focus,
        .ant-input-affix-wrapper:focus,
        .ant-input-affix-wrapper-focused {
          border-color: #667eea !important;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1) !important;
          transform: translateY(-2px);
        }

        .ant-input,
        .ant-input-password,
        .ant-input-affix-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .ant-btn-primary {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .ant-btn-primary:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5) !important;
        }

        .ant-btn-primary:active {
          transform: translateY(0) !important;
        }

        .ant-form-item-explain-error {
          font-size: 13px;
          animation: slideInUp 0.3s ease-out;
        }

        .ant-card {
          animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ant-form-item {
          animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ant-form-item:nth-child(1) {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .ant-form-item:nth-child(2) {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .ant-form-item:nth-child(3) {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </Layout>
  );
}