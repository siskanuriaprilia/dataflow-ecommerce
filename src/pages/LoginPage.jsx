import React, { useState, useEffect } from 'react';
import { Layout, Card, Form, Input, Button, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, WifiOutlined, RightOutlined, ThunderboltOutlined, SafetyOutlined, RocketOutlined, CrownOutlined } from '@ant-design/icons';
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
        localStorage.setItem(
          "user",
          JSON.stringify({ id: "1", name: "Budi Santoso", role: user.role }) 
        );

        if (user.role === 'admin') {
          navigate('/dashboard');
        } else if (user.role === 'customer') {
          navigate('/dashboard-customers');
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

  const features = [
    { 
      icon: <ThunderboltOutlined style={{ fontSize: '28px' }} />, 
      title: 'Kecepatan Maksimal', 
      desc: 'Akses internet super cepat hingga 1 Gbps',
      color: '#FFD700',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    },
    { 
      icon: <SafetyOutlined style={{ fontSize: '28px' }} />, 
      title: 'Keamanan Terjamin', 
      desc: 'Proteksi berlapis untuk data Anda',
      color: '#00D9FF',
      gradient: 'linear-gradient(135deg, #00D9FF 0%, #0099CC 100%)'
    },
    { 
      icon: <RocketOutlined style={{ fontSize: '28px' }} />, 
      title: 'Support 24/7', 
      desc: 'Tim siap membantu kapan saja',
      color: '#FF6B9D',
      gradient: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)'
    },
    { 
      icon: <CrownOutlined style={{ fontSize: '28px' }} />, 
      title: 'Harga Terbaik', 
      desc: 'Paket hemat dengan performa premium',
      color: '#A8E063',
      gradient: 'linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)'
    }
  ];

  return (
    <Layout 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Enhanced Decorative Background */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40vw',
        height: '40vw',
        maxWidth: '500px',
        maxHeight: '500px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
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
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.5
      }} />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 10 + 3 + 'px',
            height: Math.random() * 10 + 3 + 'px',
            background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
            borderRadius: '50%',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `particle ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: Math.random() * 5 + 's',
            boxShadow: '0 0 10px rgba(255,255,255,0.5)'
          }}
        />
      ))}

      <Content 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '40px 20px',
          position: 'relative',
          zIndex: 1,
          gap: '80px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}
      >
        {/* Left Side - Enhanced Info Section */}
        <div style={{
          flex: 1,
          color: 'white',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          display: window.innerWidth < 992 ? 'none' : 'block'
        }}>
          {/* Logo Area */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
            animation: 'slideInLeft 0.8s ease-out'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
              <WifiOutlined style={{ fontSize: '32px', color: 'white' }} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '0.5px' }}>NetSpeed Pro</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Internet Service Provider</div>
            </div>
          </div>

          {/* Main Title */}
          <div style={{
            fontSize: '56px',
            fontWeight: '900',
            marginBottom: '24px',
            lineHeight: '1.1',
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'slideInLeft 0.8s ease-out 0.2s backwards'
          }}>
            Internet Tanpa<br />Batas Untuk Bisnis
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: '19px',
            lineHeight: '1.7',
            opacity: 0.95,
            marginBottom: '48px',
            maxWidth: '500px',
            animation: 'slideInLeft 0.8s ease-out 0.3s backwards'
          }}>
            Platform e-commerce terpadu untuk manajemen layanan internet provider. 
            Kelola paket, pelanggan, dan pembayaran dalam satu dashboard modern.
          </div>

          {/* Feature Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {features.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                padding: '24px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                opacity: mounted ? 1 : 0,
                animation: `slideInLeft 0.6s ease-out ${0.5 + i * 0.1}s backwards`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: item.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: 'white',
                  boxShadow: `0 8px 20px ${item.color}40`
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '40px',
            animation: 'slideInLeft 0.8s ease-out 0.9s backwards'
          }}>
            {[
              { number: '50K+', label: 'Pengguna Aktif' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Support' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '4px' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.85 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Enhanced Login Card */}
        <Card
          style={{
            width: '100%',
            maxWidth: '480px',
            minWidth: window.innerWidth < 992 ? 'auto' : '480px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(30px)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          bodyStyle={{ padding: '56px 48px' }}
        >
          {/* Card Gradient Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s linear infinite'
          }} />

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '96px',
              height: '96px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
              marginBottom: 28,
              animation: 'pulse 2.5s ease-in-out infinite',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                opacity: 0.3,
                filter: 'blur(12px)',
                animation: 'pulse 2.5s ease-in-out infinite'
              }} />
              <WifiOutlined style={{ fontSize: '44px', color: 'white', position: 'relative', zIndex: 1 }} />
            </div>
            <Title level={2} style={{ 
              marginBottom: 12, 
              fontSize: '32px', 
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Selamat Datang Kembali
            </Title>
            <Text style={{ 
              fontSize: '16px', 
              color: '#666',
              display: 'block'
            }}>
              Masukkan kredensial untuk mengakses dashboard
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
              style={{ marginBottom: 24 }}
            >
              <Input 
                prefix={
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #667eea15, #764ba215)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    marginLeft: '-12px'
                  }}>
                    <UserOutlined style={{ color: '#667eea', fontSize: '18px' }} />
                  </div>
                } 
                placeholder="Masukkan username" 
                size="large"
                style={{
                  borderRadius: '14px',
                  padding: '16px 20px',
                  fontSize: '16px',
                  border: '2px solid #f0f0f0',
                  transition: 'all 0.3s',
                  background: '#fafafa'
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password wajib diisi' }]}
              style={{ marginBottom: 32 }}
            >
              <Input.Password 
                prefix={
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #667eea15, #764ba215)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    marginLeft: '-12px'
                  }}>
                    <LockOutlined style={{ color: '#667eea', fontSize: '18px' }} />
                  </div>
                } 
                placeholder="Masukkan password" 
                size="large"
                style={{
                  borderRadius: '14px',
                  padding: '16px 20px',
                  fontSize: '16px',
                  border: '2px solid #f0f0f0',
                  transition: 'all 0.3s',
                  background: '#fafafa'
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
                  height: '58px',
                  borderRadius: '14px',
                  fontSize: '17px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 6px 24px rgba(102, 126, 234, 0.5)',
                  transition: 'all 0.3s',
                  letterSpacing: '0.5px'
                }}
              >
                {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
              </Button>
            </Form.Item>
          </Form>

          {/* Footer Text */}
          <div style={{
            textAlign: 'center',
            marginTop: 32,
            paddingTop: 24,
            borderTop: '1px solid #f0f0f0',
            color: '#999',
            fontSize: '14px'
          }}>
          </div>
        </Card>
      </Content>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(40px, -40px) scale(1.1) rotate(5deg);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9) rotate(-5deg);
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 16px 40px rgba(102, 126, 234, 0.7);
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

        @media (max-width: 992px) {
          .ant-card-body {
            padding: 40px 32px !important;
          }
        }

        @media (max-width: 576px) {
          .ant-card-body {
            padding: 32px 24px !important;
          }
          .ant-typography h2 {
            font-size: 26px !important;
          }
        }

        .ant-input:hover,
        .ant-input-password:hover,
        .ant-input-affix-wrapper:hover {
          border-color: #667eea !important;
          background: white !important;
        }

        .ant-input:focus,
        .ant-input-password:focus,
        .ant-input-affix-wrapper:focus,
        .ant-input-affix-wrapper-focused {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15) !important;
          transform: translateY(-2px);
          background: white !important;
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
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 28px rgba(102, 126, 234, 0.6) !important;
          background: linear-gradient(135deg, #7c8ef5 0%, #8757b0 100%) !important;
        }

        .ant-btn-primary:active {
          transform: translateY(-1px) !important;
        }

        .ant-form-item-explain-error {
          font-size: 13px;
          animation: slideInUp 0.3s ease-out;
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