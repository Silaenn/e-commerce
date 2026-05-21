"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "./Slider";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import Image from "next/image";
import Footer from "./Footer";
import { SearchContext } from "../_context/SearchContext";
import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";
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

  const features = [
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Free Shipping",
      desc: "For all orders over Rp 200k"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Secure Payment",
      desc: "100% secure payment methods"
    },
    {
      icon: <Headphones className="h-6 w-6 text-primary" />,
      title: "24/7 Support",
      desc: "Get help anytime you need"
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-primary" />,
      title: "Easy Returns",
      desc: "30 days money back guarantee"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Hero / Slider */}
      <Slider sliderList={sliderList} />
      
      {/* 2. Top Categories */}
      <CategoryList categoryList={categoryList} />
      
      {/* 3. Trust Features (Standard E-commerce) */}
      <div className="mt-24 px-6 md:px-12 lg:px-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-gray-100"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1] // OutQuint for a smooth entry
                  } 
                }
              }}
              className="flex items-center gap-5 group"
            >
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-in-out">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
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
