/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    // Mengganti konfigurasi domains dengan remotePatterns
    remotePatterns: [
      {
        // Menentukan protokol (http atau https)
        protocol: "http", // sesuaikan dengan kebutuhan (http atau https)
        // Menentukan hostname atau domain
        hostname: "localhost",
        port: "1337",
        // Menentukan path pattern untuk gambar
        pathname: "/uploads/**", // ini akan mencakup semua path di bawah localhost
      },
    ],
  },
};

export default nextConfig;
