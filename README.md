# 🧑‍🎓 Pengembang

Nama: Siska Nuri Aprilia
Program Studi: D4 Sistem Informasi Bisnis
Institusi: Politeknik Negeri Malang

---

# 🌐 Internet Package Dashboard

Aplikasi **dashboard web interaktif** berbasis **React.js** dan **Ant Design (AntD)** yang digunakan untuk mengelola data pelanggan, daftar paket internet, serta riwayat transaksi secara efisien dan modern.  
Sistem ini memiliki dua peran pengguna, yaitu **Customer** dan **Admin**, masing-masing dengan tampilan dan fitur yang berbeda.

---

## 🚀 Fitur Utama

### 🔑 Fitur Login
- Sistem login untuk membedakan antara **Admin** dan **Customer**.  
- Setiap pengguna harus masuk menggunakan akun yang valid.  
- Setelah login, pengguna diarahkan ke dashboard sesuai dengan perannya.

---

### 👥 Customer
Customer memiliki akses untuk melihat dan mengelola informasi pribadi serta riwayat transaksi.

**Menu yang tersedia:**
- 🏠 **Dashboard** – Melihat daftar semua paket internet yang tersedia.  
- 🧾 **Riwayat Transaksi** – Melihat detail pembelian paket sebelumnya.  
- 👤 **Profil** – Melihat dan mengubah informasi akun pribadi.  
- 🚪 **Logout** – Keluar dari sistem.

---

### 🧑‍💼 Admin
Admin memiliki akses penuh untuk mengelola data pelanggan, paket, dan transaksi.

**Menu yang tersedia:**
- 📊 **Dashboard** – Menampilkan statistik pelanggan, total paket, dan transaksi terbaru.  
- 👥 **Daftar Pelanggan** – Melihat dan mengelola data pelanggan.  
- 📦 **Daftar Paket** – Menambahkan, mengedit, atau menghapus data paket internet.  
- 🧾 **Riwayat Transaksi** – Melihat semua transaksi pelanggan.  
- 🚪 **Logout** – Keluar dari sistem.

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
|-----------|------------|
| Framework Frontend | React.js |
| Library UI | Ant Design (antd) |
| Ikon | @ant-design/icons |
| Grafik | Recharts |
| State Management | React Hooks (useState, useEffect) |
| Routing | React Router DOM |
| Penyimpanan Data | Local Storage / JSON Server (opsional) |

---

# Dokumentasi Fitur Aplikasi 

| Halaman | Screenshot | Deskripsi Fitur |
|---------|------------|----------------|
| **Login Page** | ![Login Page](public/screenshots/login.png) | Halaman Login Page ini berfungsi sebagai pintu masuk ke dashboard aplikasi untuk pengguna dengan berbagai peran, termasuk **admin** dan **customer**. Halaman ini menampilkan **formulir login interaktif** yang meminta username dan password, dilengkapi validasi input agar tidak kosong. Pengguna dapat masuk ke dashboard sesuai peran masing-masing: admin diarahkan ke dashboard utama, sedangkan customer diarahkan ke dashboard pelanggan. |
| **Dashboard Customer** | ![Dashboard Customer](public/screenshots/dashboardcustomers1.png)  <br> ![Dashboard Customer 2](public/screenshots/dashboardcustomers2.png) | Halaman Dashboard customer ini menampilkan berbagai informasi penting, seperti **total pembelian**, **level membership**, dan daftar **paket internet** yang tersedia. Selain itu, halaman ini dilengkapi dengan fitur interaktif berupa **modal pembelian paket**, di mana pengguna dapat memilih paket internet, mengonfirmasi pembelian, serta menentukan metode pembayaran yang diinginkan. |
| **Riwayat Transaksi Customer** | ![Riwayat Transaksi](public/screenshots/riwayattransaksicustomers.png) | Halaman Riwayat Transaksi Customer menampilkan semua informasi terkait transaksi pelanggan, termasuk **ID transaksi**, **paket yang dibeli**, **kuota**, **harga**, **tanggal**, **status transaksi**, dan **metode pembayaran**. Halaman ini juga menyediakan fitur interaktif untuk mencari transaksi, memfilter berdasarkan status dan metode pembayaran, serta menampilkan statistik seperti **total transaksi**, **transaksi berhasil**, **total pengeluaran**, dan **rata-rata pengeluaran**. |
| **Profil Customer** | ![Profil Customer](public/screenshots/profilcustomers1.png) <br> ![Profil Customer 2](public/screenshots/profilcustomers2.png) | Halaman Profil Customer menampilkan informasi pribadi pengguna, termasuk **nama lengkap**, **email**, dan **peran (role)** pengguna. Halaman ini dilengkapi dengan fitur **edit profil**, di mana pengguna dapat mengubah nama dan email melalui formulir interaktif, serta menyimpan atau membatalkan perubahan dengan mudah. Selain itu, halaman juga menampilkan statistik akun seperti **total transaksi**, **total pengeluaran**, dan **poin loyalitas**, serta aktivitas terbaru pengguna seperti **login**, **pembelian**, dan **pembaruan profil**. |

---
