import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const pjs = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Grocery Store | Toko Sembako & Sayur Organik",
  description: "Belanja kebutuhan dapur, sembako, dan sayuran organik segar kualitas premium dengan pengiriman cepat ke rumah Anda.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pjs.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
