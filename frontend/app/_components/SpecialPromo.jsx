"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SpecialPromo = () => {
  return (
    <div className="mt-32 px-6 md:px-12 lg:px-12 mb-20 w-full">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-green-50 via-white to-green-50/30 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 group border border-green-100/50 shadow-2xl shadow-green-900/5"
      >
        <div className="space-y-8 z-10 text-center md:text-left relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center md:justify-start gap-2"
          >
            <span className="h-0.5 w-8 bg-primary/60" />
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
              Exclusive Offer
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.85]"
          >
            Healthy Living <br/> 
            <span className="text-primary">Starts Here.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 text-xl max-w-sm font-medium leading-relaxed italic"
          >
            Get up to <span className="text-primary font-bold">30% off</span> on your first organic basket purchase. Sustainable quality, delivered.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: "#15803d" }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.6 }}
            className="bg-primary text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl shadow-green-900/20 transition-all"
          >
            Claim Offer Now
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="w-full md:w-1/2 h-auto relative"
        >
          <Image
            src="/banner.png"
            width={600}
            height={600}
            className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"
            alt="banner"
          />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
      </motion.div>
    </div>
    </div>
  );
};

export default SpecialPromo;
