import React, { useEffect, useState } from 'react';
import { List, Card, message, Button, Avatar, Typography } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3001/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      message.error('Gagal memuat data pelanggan');
    }
  };

  const handleBuyPackage = (customer) => {
    // Navigasi ke transaksi dengan customer pre-selected (asumsi routing)
    window.location.href = `/transactions?customerId=${customer.id}`;
  };

  return (
    <Card title="Daftar Pelanggan" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8 }}>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
        dataSource={customers}
        renderItem={(customer) => (
          <List.Item>
            <Card
              hoverable
              style={{ borderRadius: 8, textAlign: 'center' }}
              actions={[
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleBuyPackage(customer)}
                >
                  Beli Paket
                </Button>
              ]}
            >
              <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: 16 }} />
              <Text strong>{customer.name}</Text><br />
              <Text type="secondary">Email: {customer.email}</Text><br />
              <Text type="secondary">Phone: {customer.phone}</Text>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
}