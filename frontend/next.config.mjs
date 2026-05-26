/** @type {import('next').NextConfig} */
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337";
let backendPattern = {
  protocol: "http",
  hostname: "localhost",
  port: "1337",
  pathname: "/uploads/**",
};

try {
  const parsed = new URL(backendBaseUrl);
  backendPattern = {
    protocol: parsed.protocol.replace(":", ""),
    hostname: parsed.hostname,
    pathname: "/uploads/**",
  };
  if (parsed.port) {
    backendPattern.port = parsed.port;
  }
} catch (error) {
  // Fallback to default localhost pattern when env is invalid
}

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      backendPattern,
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
