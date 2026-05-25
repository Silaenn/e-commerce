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
import { resolveMediaUrl } from "../_utils/backend";

const ProductItem = ({ p }) => {
  return (
    <motion.div 
      whileHover={{ 
        y: -15,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(34,197,94,0.15)] hover:border-primary/30"
    >      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-[2rem] flex items-center justify-center p-8 overflow-hidden transition-all duration-700 group-hover:bg-white group-hover:shadow-[inset_0_0_40px_rgba(34,197,94,0.05)]">
        <motion.div
          whileHover={{ 
            scale: 1.15,
            rotate: [-2, 2, -1, 1, 0],
            y: -5
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full relative z-10"
        >
          <Image
            src={resolveMediaUrl(p?.images?.[0]?.url) || "/logo.png"}
            width={400}
            height={400}
            alt={p.name}
            className="object-contain w-full h-full drop-shadow-2xl"
          />
        </motion.div>

        {/* Dynamic Glow behind image */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] scale-0 group-hover:scale-100 transition-transform duration-1000" 
        />
        
        {/* Quick Add Overlay */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute inset-0 z-20 bg-primary/0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center group-hover:bg-primary/10 scale-95 group-hover:scale-100">
               <motion.div 
                 initial={{ y: 40, opacity: 0, scale: 0.8 }}
                 whileHover={{ 
                   scale: 1.1,
                   boxShadow: "0 20px 40px rgba(34,197,94,0.3)"
                 }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-white text-primary px-8 py-4 rounded-full shadow-2xl border border-green-100 font-black flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
               >
                 <ShoppingBasket className="h-6 w-6" />
                 <span className="text-sm uppercase tracking-widest">Quick View</span>
               </motion.div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl bg-white">
            <ProductItemDetail product={p} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Section */}
      <div className="mt-6 px-2 space-y-4">
        <h2 className="font-black text-gray-900 text-xl truncate group-hover:text-primary transition-all duration-300 tracking-tight leading-tight">
          {p.name}
        </h2>
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            {p.sellingPrice && (
              <span className="font-black text-2xl text-primary tracking-tighter leading-none group-hover:scale-110 origin-left transition-transform duration-300">
                Rp{p.sellingPrice.toLocaleString("id-ID")}
              </span>
            )}
            {p.price && p.price > p.sellingPrice && (
              <span className="text-gray-400 text-sm line-through decoration-primary/30 font-bold mt-1.5 opacity-60">
                Rp{p.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <motion.div 
            whileHover={{ 
              rotate: -15, 
              scale: 1.2,
              backgroundColor: "#22c55e",
              color: "#ffffff"
            }}
            whileTap={{ scale: 0.8 }}
            className="h-14 w-14 rounded-[1.5rem] bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-green-900/30 transition-all duration-500 cursor-pointer"
          >
            <ShoppingBasket className="h-7 w-7" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
