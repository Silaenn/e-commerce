# Backend Local Config Cleanup (Cloudinary Removal)

**Date:** 2026-05-27  
**Status:** Draft  
**Owner:** Copilot CLI

## Context
Repo utama `e-commerce/` ditujukan untuk pengembangan lokal. Saat ini backend Strapi masih memuat dependency Cloudinary, sementara konfigurasi plugin upload tidak memakai Cloudinary. README juga masih menyebut Cloudinary.

## Goals
- Hapus konfigurasi/ketergantungan Cloudinary yang tidak dipakai di backend lokal.
- Perbarui `README.md` agar sesuai dengan penggunaan upload lokal Strapi.
- Menjaga perilaku lokal tetap sederhana dan tidak berubah untuk pengguna.

## Non-Goals
- Mengubah konfigurasi database (SQLite/Postgres).
- Menambah Docker atau deployment workflow.
- Mengubah frontend.

## Proposed Changes
1. **Backend dependencies**
   - Hapus `@strapi/provider-upload-cloudinary` dari `backend/package.json`.
   - Update `backend/package-lock.json` agar konsisten.

2. **Backend plugin config**
   - `backend/config/plugins.ts` tetap kosong agar Strapi memakai local upload provider.

3. **README**
   - Hapus penyebutan Cloudinary dari Features dan Prerequisites.
   - Tambahkan catatan bahwa upload media menggunakan local provider Strapi.

## Data Flow (Upload)
Upload media menggunakan provider lokal Strapi (default). File disimpan di `backend/public/uploads` tanpa integrasi layanan pihak ketiga.

## Error Handling / Runtime Impact
Tidak ada perubahan behavior runtime. Jika Cloudinary tidak dikonfigurasi, Strapi tetap berjalan dengan provider lokal bawaan.

## Verification
- Jalankan `npm install` di `backend/` untuk memperbarui lockfile setelah dependency dihapus.
- (Opsional) `npm run develop` memastikan Strapi berjalan normal.
