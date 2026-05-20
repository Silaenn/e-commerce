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
                  <span className="text-primary font-bold tracking-widest text-sm uppercase">Limited Offer</span>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    {s.name}
                  </h2>
                  <p className="text-gray-600 text-lg md:text-xl font-medium max-w-sm">
                    Premium quality groceries delivered fresh to your doorstep every single day.
                  </p>
                  <div>
                    <Link href={s.link || "#"}>
                      <button className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-green-900/20 transition-all active:scale-95">
                        Shop Collection
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right Content: Image (Completely Separate) */}
                <div className="relative bg-gray-100 flex items-center justify-center p-12">
                   <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                      s?.image?.url || ""
                    }`}
                    fill
                    alt="slider product"
                    className="object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
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
