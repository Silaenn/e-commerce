"use client";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { motion, AnimatePresence } from "framer-motion";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  return (
    <div>
      <div className="h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {cartItemList.map((cart, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center p-3 mb-4 bg-gray-50 rounded-2xl group"
              key={cart.id}
            >
              <div className="flex gap-4 items-center">
                <div className="relative h-20 w-20 bg-white rounded-xl flex items-center justify-center p-2 border border-gray-100">
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                    width={70}
                    height={70}
                    alt={cart.name}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 leading-tight">{cart.name}</h2>
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Qty: {cart.quantity}</h2>
                  <h2 className="text-lg font-extrabold text-primary mt-1">
                    Rp{cart.amount.toLocaleString("id-ID")}
                  </h2>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, color: "#ef4444" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDeleteItem(cart.id)}
                className="p-2 text-gray-400 transition-colors"
              >
                <Trash2Icon className="h-5 w-5" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {cartItemList.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-4"
          >
            <div className="bg-gray-50 p-6 rounded-full">
               <Image src="/logo.png" width={100} height={100} alt="empty" className="opacity-20 grayscale" />
            </div>
            <h2 className="font-bold text-gray-400">Your cart is empty</h2>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default CartItemList;
