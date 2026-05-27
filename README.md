# 🛒 E-Commerce App

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Strapi](https://img.shields.io/badge/Strapi-5-4945ff?style=flat-square&logo=strapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=0c4a6e)
![Status](https://img.shields.io/badge/Status-Active-22c55e?style=flat-square)

Aplikasi e-commerce full-stack dengan **frontend Next.js** dan **backend Strapi**. Mencakup katalog produk, pencarian, keranjang belanja, checkout dengan pembayaran Midtrans, dan riwayat pesanan.

<img width="1920" height="964" alt="grocery-storee-vercel-app-" src="https://github.com/user-attachments/assets/122916b3-4dff-4143-a079-09057ef31c39" />

---

## ✨ Features

- 📦 Katalog produk dengan filter & kategori
- 🔍 Pencarian produk
- 🛒 Keranjang belanja
- 💳 Checkout & integrasi Midtrans
- 📋 Riwayat & detail pesanan
- 🖼️ Upload media via Cloudinary
- 🛠️ Strapi Admin Panel
- 🎞️ Animasi UI dengan Framer Motion

---

## 🧰 Tech Stack

**Frontend**

- Next.js 14 + React 18
- Tailwind CSS
- Framer Motion
- Radix UI + Lucide
- Midtrans Snap

**Backend**

- Strapi 5
- Node.js
- SQLite / PostgreSQL (via Strapi)

---

## 📁 Project Structure

```
.
├── frontend/              # Next.js App Router
│   ├── app/               # Pages & layouts
│   ├── components/        # UI components
│   ├── lib/               # Utilities & API client
└── backend/               # Strapi CMS
    ├── src/api/           # Content types & controllers
    ├── config/            # Plugins & middleware
    └── .env.example
```

---

## ✅ Prerequisites

Pastikan sudah terinstall:

- Node.js ≥ 20
- npm ≥ 6
- Git
- Akun [Cloudinary](https://cloudinary.com)
- Akun [Midtrans](https://midtrans.com) atau [PayPal Developer](https://developer.paypal.com)

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/username/ecommerce-app.git
cd ecommerce-app
```

### 2. Setup Backend (Strapi)

```bash
cd backend
npm install
cp .env.example .env   # isi variabel di .env
npm run develop
```

Strapi akan berjalan di `http://localhost:1337` — buka untuk membuat admin account pertama kali.

> ⚠️ **Catatan:** Pastikan backend sudah berjalan sebelum menjalankan frontend, karena Next.js akan fetch data dari Strapi API saat startup.

### 3. Setup Frontend (Next.js)

```bash
cd ../frontend
npm install
cp .env.local.example .env.local   # isi variabel
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`.

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

Lihat `backend/.env.example` untuk daftar lengkap. Variabel utama:

| Key                   | Keterangan            |
| --------------------- | --------------------- |
| `HOST`                | Host server Strapi    |
| `PORT`                | Port server Strapi    |
| `APP_KEYS`            | Strapi app keys       |
| `API_TOKEN_SALT`      | Salt untuk API token  |
| `ADMIN_JWT_SECRET`    | Secret admin JWT      |
| `TRANSFER_TOKEN_SALT` | Salt transfer token   |
| `JWT_SECRET`          | Secret user JWT       |
| `ENCRYPTION_KEY`      | Key enkripsi Strapi   |

### Frontend — `frontend/.env.local`

| Key                            | Keterangan                                            |
| ------------------------------ | ----------------------------------------------------- |
| `NEXT_PUBLIC_BACKEND_BASE_URL` | URL backend Strapi (default: `http://localhost:1337`) |
| `NEXT_PUBLIC_CLIENT`           | Midtrans client key                                   |
| `SECRET`                       | Midtrans server key                                   |

---

## 📜 Scripts

**Frontend**

| Command         | Keterangan          |
| --------------- | ------------------- |
| `npm run dev`   | Development server  |
| `npm run build` | Production build    |
| `npm run start` | Jalankan production |
| `npm run lint`  | Linting             |

**Backend**

| Command           | Keterangan          |
| ----------------- | ------------------- |
| `npm run develop` | Development server  |
| `npm run build`   | Build admin panel   |
| `npm run start`   | Jalankan production |
| `npm run strapi`  | Strapi CLI          |

---
