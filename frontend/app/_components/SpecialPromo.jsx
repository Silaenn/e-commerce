"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SpecialPromo = () => {
  return (
    <div className="mt-20 sm:mt-32 px-5 sm:px-8 md:px-12 mb-12 sm:mb-20 w-full">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-green-50 via-white to-green-50/30 border border-green-100/50 shadow-2xl shadow-green-900/5 grid grid-cols-1 2xl:grid-cols-[minmax(420px,1fr)_2fr] min-h-[280px] sm:min-h-[350px] 2xl:min-h-[500px] group"
        >
          {/* Left/Top: Text */}
          <div className="flex flex-col justify-center p-6 sm:p-10 md:p-20 space-y-5 sm:space-y-8 z-10 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="h-0.5 w-8 bg-primary/60 shrink-0" />
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                Exclusive Offer
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 leading-tight sm:leading-[0.85]"
            >
              Healthy Living{" "}
              <span className="text-primary">Starts Here.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-sm sm:text-lg md:text-xl font-medium leading-relaxed italic"
            >
              Get up to <span className="text-primary font-bold">30% off</span>{" "}
              on your first organic basket purchase. Sustainable quality,
              delivered.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, backgroundColor: "#15803d" }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.6 }}
              className="bg-primary text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-2xl shadow-green-900/20 transition-all w-fit"
            >
              Claim Offer Now
            </motion.button>
          </div>

          {/* Right/Bottom: Image */}
          <div className="relative bg-green-100/10 overflow-hidden min-h-[150px] sm:min-h-[250px] md:min-h-[350px] 2xl:min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src="/banner.png"
                fill
                alt="banner"
                className="object-contain transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-96 sm:h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 sm:w-96 sm:h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default SpecialPromo;