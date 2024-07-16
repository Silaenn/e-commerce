import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ sliderList }) => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {sliderList.map((s, index) => (
            <CarouselItem key={index}>
              <div className="flex justify-center items-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${
                    s?.attributes?.image?.data?.[0]?.attributes?.url || ""
                  }`}
                  width={1000}
                  height={400}
                  alt="slider"
                  className="w-full sm:h-[300px] lg:h-[600px] md:h-[400px] object-cover rounded-2xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Slider;
