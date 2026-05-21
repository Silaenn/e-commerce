"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";
import { SearchProvider } from "./_context/SearchContext";

const pjs = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const params = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  const showHeader =
    params == "/sign-in" || params == "/create-account" ? false : true;
  return (
    <html lang="en">
      <body className={pjs.className}>
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          <SearchProvider>
            {showHeader && <Header />}
            {children}
          </SearchProvider>
          <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
