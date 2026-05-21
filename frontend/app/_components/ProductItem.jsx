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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative bg-white border border-gray-100 rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-primary/10"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-[1.5rem] flex items-center justify-center p-6 overflow-hidden transition-colors duration-500 group-hover:bg-white">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full"
        >
          <Image
            src={
              (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337") +
              p.images[0].url
            }
            width={400}
            height={400}
            alt={p.name}
            className="object-contain w-full h-full"
          />
        </motion.div>
        
        {/* Quick Add Overlay */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="bg-white text-primary p-4 rounded-full shadow-2xl border border-gray-100"
               >
                 <ShoppingBasket className="h-6 w-6" />
               </motion.div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
            <ProductItemDetail product={p} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Section */}
      <div className="mt-5 px-1 space-y-2">
        <h2 className="font-bold text-gray-900 text-lg truncate group-hover:text-primary transition-colors duration-300">{p.name}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {p.sellingPrice && (
              <span className="font-extrabold text-xl text-primary tracking-tight">
                Rp{p.sellingPrice.toLocaleString("id-ID")}
              </span>
            )}
            {p.price && p.price > p.sellingPrice && (
              <span className="text-gray-400 text-sm line-through decoration-gray-300">
                Rp{p.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <ShoppingBasket className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
