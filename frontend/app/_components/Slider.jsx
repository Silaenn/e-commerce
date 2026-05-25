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
    <div className="mt-8 sm:mt-10 px-5 sm:px-8 md:px-12 w-full min-h-[280px] sm:min-h-[350px] 2xl:min-h-[500px]">
      <div className="max-w-[1800px] mx-auto">
        {sliderList && sliderList.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-0">
              {sliderList.map((s, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="grid grid-cols-1 2xl:grid-cols-[minmax(420px,1fr)_2fr] bg-gradient-to-br from-green-50/50 to-white rounded-[2rem] sm:rounded-[2.5rem] border border-green-100/50 overflow-hidden min-h-[280px] sm:min-h-[350px] 2xl:min-h-[500px]">
                    {/* Left Content: Text */}
                    <div className="flex flex-col justify-center p-6 sm:p-10 md:p-20 space-y-4 sm:space-y-6 min-w-0">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-center gap-2"
                      >
                        <span className="h-0.5 w-8 bg-primary/60 shrink-0" />
                        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                          Limited Promotion
                        </span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-gray-900 leading-tight sm:leading-[0.9] tracking-tighter"
                      >
                        {s.name}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="text-gray-500 text-sm sm:text-lg md:text-xl font-medium leading-relaxed"
                      >
                        Premium quality groceries delivered fresh to your
                        doorstep every single day.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <Link href={s.link || "#"}>
                          <button className="bg-primary text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl shadow-green-900/10 hover:bg-green-700 transition-all active:scale-95">
                            <span className="flex items-center gap-2">
                              Shop Collection
                              <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </button>
                        </Link>
                      </motion.div>
                    </div>

                    {/* Right/Bottom Content: Image */}
                    <div className="relative bg-green-100/10 overflow-hidden min-h-[150px] sm:min-h-[250px] md:min-h-[350px] xl:min-h-[500px]">
                      <motion.div
                        initial={{ opacity: 0, scale: 1.2, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-10" />
            <CarouselNext className="hidden md:flex -right-10" />
          </Carousel>
        ) : (
          <div className="w-full bg-gray-50 animate-pulse rounded-[2rem] sm:rounded-[2.5rem] min-h-[280px] sm:min-h-[350px] 2xl:min-h-[500px] border border-green-100/50" />
        )}
      </div>
    </div>
  );
};

export default Slider;