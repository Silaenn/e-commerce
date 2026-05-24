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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-background min-h-screen"
    >
      {/* 1. Hero / Slider */}
      <motion.div variants={sectionVariants}>
        <Slider sliderList={sliderList} />
      </motion.div>
      
      {/* 2. Top Categories */}
      <motion.div variants={sectionVariants}>
        <CategoryList categoryList={categoryList} />
      </motion.div>
      
      {/* 3. Trust Features */}
      <motion.div variants={sectionVariants}>
        <TrustFeatures />
      </motion.div>
      
      {/* 4. Popular Products */}
      <motion.div variants={sectionVariants}>
        <ProductList productList={productList.slice(0, 8)} search={search} />
      </motion.div>
      
      {/* 5. Special Promo Banner */}
      <motion.div variants={sectionVariants}>
        <SpecialPromo />
      </motion.div>

      {/* 6. Footer */}
      <motion.div variants={sectionVariants}>
        <Footer />
      </motion.div>
    </motion.div>
  );
}
