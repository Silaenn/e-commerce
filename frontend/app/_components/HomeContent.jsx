"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "./Slider";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import TrustFeatures from "./TrustFeatures";
import SpecialPromo from "./SpecialPromo";
import Image from "next/image";
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

  const { search } = useContext(SearchContext);

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Hero / Slider */}
      <Slider sliderList={sliderList} />
      
      {/* 2. Top Categories */}
      <CategoryList categoryList={categoryList} />
      
      {/* 3. Trust Features */}
      <TrustFeatures />
      
      {/* 4. Popular Products */}
      <ProductList productList={productList} search={search} />
      
      {/* 5. Special Promo Banner */}
      <SpecialPromo />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
