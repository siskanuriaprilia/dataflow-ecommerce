import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";

// Admin Pages
import DashboardAdmin from "./pages/DashboardAdmin";
import CustomerPage from "./pages/CustomerPage";
import TransactionPage from "./pages/TransactionPage";
import PackagePage from "./pages/PackagesPage";

// Customer Pages
import DashboardCustomers from "./pages/DashboardCustomers";
import RiwayatTransaksiCustomers from "./pages/RiwayatTransaksiCustomers";
import Profil from "./pages/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN */}
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/packages" element={<PackagePage />} />

        {/* CUSTOMER */}
        <Route path="/" element={<DashboardCustomers />} />
        <Route path="/dashboard-customers" element={<DashboardCustomers />} />
        <Route path="/riwayat-transaksi" element={<RiwayatTransaksiCustomers />} />
         <Route path="/profil" element={<Profil />} /> {/* Route baru untuk Profil */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
