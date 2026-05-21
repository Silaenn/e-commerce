"use client";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { motion, AnimatePresence } from "framer-motion";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  return (
    <div className="h-full min-h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col">
        <AnimatePresence initial={false} mode="popLayout">
          {cartItemList.map((cart) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="flex justify-between items-center p-4 mb-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] group hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300"
              key={cart.id}
            >
              <div className="flex gap-4 items-center">
                <div className="relative h-20 w-20 bg-white rounded-2xl flex items-center justify-center p-2 border border-green-50 shadow-sm">
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                    width={70}
                    height={70}
                    alt={cart.name}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="font-black text-gray-900 leading-tight text-sm uppercase tracking-tight">{cart.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">Qty: {cart.quantity}</span>
                  </div>
                  <h2 className="text-lg font-black text-primary">
                    Rp{cart.amount.toLocaleString("id-ID")}
                  </h2>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.2, backgroundColor: "#fee2e2", color: "#ef4444" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDeleteItem(cart.id)}
                className="p-3 text-gray-300 transition-all rounded-xl"
              >
                <Trash2Icon className="h-5 w-5" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {cartItemList.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="bg-green-50 p-10 rounded-full relative">
               <Image src="/logo.png" width={120} height={120} alt="empty" className="opacity-10 grayscale brightness-0" />
               <motion.div 
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="absolute inset-0 border-2 border-primary/10 rounded-full" 
               />
            </div>
            <div className="space-y-1">
              <h2 className="font-black text-2xl text-gray-900 tracking-tighter">Your cart is empty</h2>
              <p className="text-gray-400 font-medium text-sm px-10">Looks like you haven't added anything yet.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default CartItemList;
