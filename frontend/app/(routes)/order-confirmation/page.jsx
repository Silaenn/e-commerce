"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const OrderConfirmation = () => {
  return (
    <div className="flex justify-center my-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="border shadow-md flex flex-col justify-center p-20 rounded-[2.5rem] items-center gap-3 px-32 bg-white"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
        >
          <CheckCircle2 className="h-32 w-32 text-primary" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-extrabold text-4xl text-primary tracking-tight"
        >
          Order Successful!
        </motion.h2>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 font-medium text-lg"
        >
          Thank you so much for your order.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href={"/my-order"}>
            <Button className="mt-8 h-14 px-10 rounded-full font-bold text-lg shadow-xl shadow-green-900/10">
              Track your order
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
