"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";
import { ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";

const ProductItem = ({ p }) => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] // Custom ease-out
      }
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(34,197,94,0.1)] hover:border-primary/20"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-[2rem] flex items-center justify-center p-8 overflow-hidden transition-all duration-500 group-hover:bg-white group-hover:shadow-inner">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full relative z-10"
        >
          <Image
            src={
              (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337") +
              p.images[0].url
            }
            width={400}
            height={400}
            alt={p.name}
            className="object-contain w-full h-full drop-shadow-md"
          />
        </motion.div>

        {/* Subtle Glow behind image */}
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-0 group-hover:scale-100 transition-transform duration-1000" />
        
        {/* Quick Add Overlay */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute inset-0 z-20 bg-primary/0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px] group-hover:bg-primary/5">
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-white text-primary px-6 py-3 rounded-full shadow-2xl border border-green-100 font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
               >
                 <ShoppingBasket className="h-5 w-5" />
                 <span className="text-sm">Quick View</span>
               </motion.div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl bg-white">
            <ProductItemDetail product={p} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Section */}
      <div className="mt-6 px-2 space-y-3">
        <h2 className="font-bold text-gray-900 text-xl truncate group-hover:text-primary transition-colors duration-300 tracking-tight">{p.name}</h2>
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            {p.sellingPrice && (
              <span className="font-extrabold text-2xl text-primary tracking-tighter leading-none">
                Rp{p.sellingPrice.toLocaleString("id-ID")}
              </span>
            )}
            {p.price && p.price > p.sellingPrice && (
              <span className="text-gray-400 text-sm line-through decoration-gray-300 font-medium mt-1">
                Rp{p.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-lg group-hover:shadow-green-900/20 transition-all duration-500 cursor-pointer"
          >
            <ShoppingBasket className="h-6 w-6" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
