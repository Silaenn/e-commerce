"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Slider = ({ sliderList }) => {
  return (
    <div className="mt-10 px-6 md:px-16 lg:px-28">
      <Carousel className="w-full">
        <CarouselContent>
          {sliderList.map((s, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[500px]">
                {/* Left Content: Text */}
                <div className="flex flex-col justify-center p-12 md:p-20 space-y-6">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-primary font-bold tracking-widest text-sm uppercase"
                  >
                    Limited Offer
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
                  >
                    {s.name}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-lg md:text-xl font-medium max-w-sm"
                  >
                    Premium quality groceries delivered fresh to your doorstep every single day.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link href={s.link || "#"}>
                      <button className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-green-900/20 transition-all active:scale-95">
                        Shop Collection
                      </button>
                    </Link>
                  </motion.div>
                </div>

                {/* Right Content: Image (Completely Separate) */}
                <div className="relative bg-gray-100 overflow-hidden min-h-[300px] md:min-h-[500px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"  
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                        s?.image?.url || ""
                      }`}
                      fill
                      alt="slider product"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-10" />
        <CarouselNext className="hidden md:flex -right-10" />
      </Carousel>
    </div>
  );
};

export default Slider;
