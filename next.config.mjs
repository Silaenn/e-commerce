/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
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
  output: "export",
  assetPrefix: "/commerce",
};

export default nextConfig;
