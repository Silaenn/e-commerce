"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "./_components/Header";
import { Toaster } from "sonner";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { SearchProvider } from "./_context/SearchContext";

export default function Providers({ children }) {
  const params = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  
  // Logic to show/hide header based on route
  const showHeader =
    params === "/sign-in" || params === "/create-account" ? false : true;

  return (
    <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
      <SearchProvider>
        {showHeader && <Header />}
        {children}
      </SearchProvider>
      <Toaster />
    </UpdateCartContext.Provider>
  );
}
