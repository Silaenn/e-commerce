"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const OrderConfirmation = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-5 sm:p-6 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-3xl opacity-50 -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-green-100 rounded-full blur-3xl opacity-30 -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 px-6 py-10 sm:px-12 sm:py-16 md:px-20 md:py-20 rounded-[2rem] sm:rounded-[3rem] bg-white border border-green-50 shadow-2xl shadow-green-900/5 relative"
      >
        {/* Success Icon */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="bg-primary/10 p-5 sm:p-8 rounded-full"
          >
            <CheckCircle2 className="h-16 w-16 sm:h-24 sm:w-24 text-primary" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/20 rounded-full -z-10"
          />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-black text-3xl sm:text-4xl md:text-6xl text-gray-900 tracking-tighter leading-tight"
          >
            Order <span className="text-primary">Confirmed!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 font-medium text-sm sm:text-lg max-w-md mx-auto leading-relaxed"
          >
            Thank you for choosing us! Your organic goodies are being prepared and
            will be at your door soon.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full pt-4 sm:pt-6"
        >
          <Link href="/my-order" className="flex-1">
            <Button className="w-full h-12 sm:h-16 rounded-full font-black text-base sm:text-lg bg-primary hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 group">
              Track Order
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-12 sm:h-16 rounded-full font-black text-base sm:text-lg border-green-100 text-gray-600 hover:bg-green-50 hover:text-primary transition-all gap-2"
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
