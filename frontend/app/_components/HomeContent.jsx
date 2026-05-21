"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "./Slider";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import TrustFeatures from "./TrustFeatures";
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
      <div className="mt-32 px-6 md:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-secondary/40 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 group border border-primary/5"
        >
          <div className="space-y-8 z-10 text-center md:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold tracking-[0.3em] uppercase shadow-lg shadow-green-900/10 inline-block"
            >
              Limited Promotion
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary max-w-lg leading-[0.9]"
            >
              Healthy Living <br/> Starts Here.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-xl max-w-sm font-medium leading-relaxed"
            >
              Get up to 30% off on your first organic basket purchase. Sustainable quality, delivered.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-green-900/10"
            >
              Claim Offer Now
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 h-auto"
          >
            <Image
              src="/banner.png"
              width={600}
              height={600}
              className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
              alt="banner"
            />
          </motion.div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-20 -mt-20" />
        </motion.div>
      </div>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
