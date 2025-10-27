import React, { useState, useEffect } from 'react';
import { Table, Card, message, Modal, Button, Form, Select, Space, Tag, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

const { Text } = Typography;
const { Option } = Select;

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionForm] = Form.useForm();
  const [searchParams] = useSearchParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [customersRes, packagesRes, transactionsRes] = await Promise.all([
        fetch('http://localhost:3001/customers'),
        fetch('http://localhost:3001/packages'),
        fetch('http://localhost:3001/transactions')
      ]);
      setCustomers(await customersRes.json());
      setPackages(await packagesRes.json());
      setTransactions(await transactionsRes.json());
    } catch (error) {
      message.error('Gagal memuat data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const customerId = searchParams.get('customerId');
    if (customerId) {
      setModalVisible(true);
      transactionForm.setFieldsValue({ customerId: parseInt(customerId) });
    }
  }, [searchParams]);

  const handleTransactionSubmit = async (values) => {
    setLoading(true);
    try {
      const customer = customers.find(c => c.id === values.customerId);
      const pkg = packages.find(p => p.id === values.packageId);

      const transaction = {
        customerId: values.customerId,
        customerName: customer.name,
        packageId: values.packageId,
        packageName: pkg.name,
        quota: pkg.quota,
        price: pkg.price,
        transactionDate: new Date().toISOString(),
        status: 'success',
        paymentMethod: values.paymentMethod
      };

      const response = await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });

      if (response.ok) {
        message.success('Transaksi berhasil!');
        fetchData();
        setModalVisible(false);
      } else {
        throw new Error('Transaksi gagal');
      }
    } catch (error) {
      message.error('Transaksi gagal. Silakan coba lagi.');
      console.error('Transaction error:', error);
    }
    setLoading(false);
  };

  const transactionColumns = [
    {
      title: 'Tanggal',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (date) =>
        new Date(date).toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
    },
    { title: 'Pelanggan', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Paket', dataIndex: 'packageName', key: 'packageName' },
    { title: 'Kuota', dataIndex: 'quota', key: 'quota', render: (quota) => <Tag color="blue">{quota}</Tag> },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <Text strong style={{ color: '#52c41a' }}>Rp {price.toLocaleString('id-ID')}</Text>
    },
    { title: 'Pembayaran', dataIndex: 'paymentMethod', key: 'paymentMethod' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color="success" icon={<CheckCircleOutlined />}>
          {status.toUpperCase()}
        </Tag>
      )
    }
  ];

  return (
    <>
      <Card title="Riwayat Transaksi" extra={<Button onClick={() => setModalVisible(true)}>Tambah Transaksi</Button>} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8 }}>
        <Table
          columns={transactionColumns}
          dataSource={transactions}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal title="Beli Paket Data" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={600}>
        <Form form={transactionForm} onFinish={handleTransactionSubmit} layout="vertical">
          <Form.Item name="customerId" label="Pelanggan" rules={[{ required: true }]}>
            <Select placeholder="Pilih pelanggan" showSearch optionFilterProp="children">
              {customers.map(c => (
                <Option key={c.id} value={c.id}>
                  {c.name} - {c.phone}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="packageId" label="Paket" rules={[{ required: true }]}>
            <Select placeholder="Pilih paket">
              {packages.map(p => (
                <Option key={p.id} value={p.id}>
                  {p.name} - {p.quota} ({p.duration}) - Rp {p.price.toLocaleString('id-ID')}
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
            <Space style={{ justifyContent: 'end', width: '100%' }}>
              <Button onClick={() => setModalVisible(false)}>Batal</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Proses Transaksi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}