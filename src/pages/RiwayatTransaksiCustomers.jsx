import React, { useEffect, useState } from "react";
import { Layout, Table, message } from "antd";
import SidebarCustomer from "../components/SidebarCustomer";

const { Content } = Layout;

export default function RiwayatTransaksiCustomers() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // Ambil user yang login dari localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch("http://localhost:3001/transactions");
      const data = await res.json();

      // Filter transaksi sesuai user yang login
      const userTransactions = data.filter(
        (t) => t.customerName === user.name
      );

      setTransactions(userTransactions);
    } catch (error) {
      message.error("Gagal memuat transaksi");
    }
  };

  const columns = [
    { title: "ID Transaksi", dataIndex: "id", key: "id" },
    { title: "Paket", dataIndex: "packageName", key: "packageName" },
    { title: "Harga", dataIndex: "price", key: "price" },
    {
      title: "Tanggal",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) =>
        new Date(text).toLocaleString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Metode Pembayaran", dataIndex: "paymentMethod", key: "paymentMethod" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarCustomer defaultKey="riwayat-transaksi" />
      <Layout style={{ background: "#f0f2f5" }}>
        <Content style={{ margin: 24 }}>
          <Table dataSource={transactions} columns={columns} rowKey="id" />
        </Content>
      </Layout>
    </Layout>
  );
}
