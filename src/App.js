import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CustomerPage from "./pages/CustomerPage";
import TransactionPage from "./pages/TransactionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

