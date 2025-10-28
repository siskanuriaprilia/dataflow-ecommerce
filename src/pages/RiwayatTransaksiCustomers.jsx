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
      const res = await fetch("http://localhost:3001/transactions");
      setTransactions(await res.json());
    } catch (error) {
      message.error("Gagal memuat transaksi");
    }
  };

  const columns = [
    { title: "ID Transaksi", dataIndex: "id", key: "id" },
    { title: "Paket", dataIndex: "packageName", key: "packageName" },
    { title: "Harga", dataIndex: "price", key: "price" },
    { title: "Tanggal", dataIndex: "date", key: "date" },
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
