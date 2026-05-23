"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const OrderConfirmation = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-3xl opacity-50 -z-10"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-green-100 rounded-full blur-3xl opacity-30 -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full flex flex-col items-center text-center space-y-8 p-12 md:p-20 rounded-[3rem] bg-white border border-green-50 shadow-2xl shadow-green-900/5 relative"
      >
        {/* Success Icon with Pulse Effect */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2 
            }}
            className="bg-primary/10 p-8 rounded-full"
          >
            <CheckCircle2 className="h-24 w-24 text-primary" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/20 rounded-full -z-10"
          />
        </div>
        
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-black text-4xl md:text-6xl text-gray-900 tracking-tighter leading-tight"
          >
            Order <span className="text-primary">Confirmed!</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 font-medium text-lg max-w-md mx-auto leading-relaxed"
          >
            Thank you for choosing us! Your organic goodies are being prepared and will be at your door soon.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 w-full pt-6"
        >
          <Link href="/my-order" className="flex-1">
            <Button className="w-full h-16 rounded-full font-black text-lg bg-primary hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 group">
              Track Order
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full h-16 rounded-full font-black text-lg border-green-100 text-gray-600 hover:bg-green-50 hover:text-primary transition-all gap-2">
              <ShoppingBag className="h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>

        {/* Order ID Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-6"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
            A confirmation email has been sent to your inbox
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
