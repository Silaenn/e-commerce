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
    <div className="mt-8 px-6 md:px-12 lg:px-24">
      <Carousel className="w-full">
        <CarouselContent>
          {sliderList.map((s, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-[3rem] bg-secondary/30">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                    s?.image?.url || ""
                  }`}
                  width={1200}
                  height={800}
                  alt="slider"
                  className="absolute right-0 top-0 h-full w-[60%] object-cover object-center mix-blend-multiply opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-center p-12 md:p-24 space-y-6">
                  <h2 className="text-4xl md:text-7xl font-bold max-w-md leading-[1.1] tracking-tighter text-primary">
                    {s.name}
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-xs font-medium">
                    Curated selection for your daily nutrition.
                  </p>
                  <Link href={s.link || "#"}>
                    <button className="bg-primary text-background px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">
                      Explore Now
                    </button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-8 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="right-8 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>
    </div>
  );
};

export default Slider;
