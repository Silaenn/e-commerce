"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "./Slider";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import TrustFeatures from "./TrustFeatures";
import SpecialPromo from "./SpecialPromo";
import Footer from "./Footer";
import { SearchContext } from "../_context/SearchContext";
import { motion } from "framer-motion";

export default function HomeContent({ sliderList, categoryList, productList }) {
  const router = useRouter();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  const jwt =
    typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;

  useEffect(() => {
    if (!user && !jwt) {
      router.push("/sign-in");
    }
  }, [user, jwt, router]);

  useEffect(() => {
    // Set up Midtrans script
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");

    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { search } = useContext(SearchContext);


  return (
     <div className="bg-background min-h-screen">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <TrustFeatures />
      <ProductList productList={productList.slice(0, 8)} search={search} />
      <SpecialPromo />
      <Footer />
    </div>
  );
}