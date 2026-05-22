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
    <div className="mt-10 px-6 md:px-12 lg:px-12 w-full">
      <div className="max-w-[1800px] mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="-ml-0">
            {sliderList.map((s, index) => (
              <CarouselItem key={index} className="pl-0">
                <div
                  className="
                    grid
                    grid-cols-1
                    2xl:grid-cols-[minmax(420px,1fr)_2fr]
                    bg-gradient-to-br from-green-50/50 to-white
                    rounded-[2.5rem] border border-green-100/50
                    overflow-hidden
                    min-h-[400px] 2xl:min-h-[500px]
                  "
                >
                  {/* Left Content: Text */}
                  <div className="flex flex-col justify-center p-12 md:p-20 space-y-6 min-w-0">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-0.5 w-8 bg-primary/60 shrink-0" />
                      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                        Limited Promotion
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl 2xl:text-6xl font-extrabold text-gray-900 leading-[0.9] tracking-tighter"
                    >
                      {s.name}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-500 text-lg md:text-xl font-medium max-w-sm leading-relaxed"
                    >
                      Premium quality groceries delivered fresh to your doorstep every single day.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link href={s.link || "#"}>
                        <button className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-green-900/10 hover:bg-green-700 transition-all active:scale-95">
                          Shop Collection
                        </button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Right/Bottom Content: Image */}
                  <div className="relative bg-green-100/10 overflow-hidden min-h-[150px] sm:min-h-[300px] xl:min-h-[500px]">
                    <motion.div
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`${
                          process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
                          "http://localhost:1337"
                        }${s?.image?.url || ""}`}
                        fill
                        alt="slider product"
                        className="object-cover transition-transform duration-1000"
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
    </div>
  );
};

export default Slider;