"use client";
import React from "react";
import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const TrustFeatures = () => {
  const features = [
    { icon: <Truck />, title: "Free Shipping", desc: "For all orders over Rp 200k" },
    { icon: <ShieldCheck />, title: "Secure Payment", desc: "100% secure payment methods" },
    { icon: <Headphones />, title: "24/7 Support", desc: "Get help anytime you need" },
    { icon: <RotateCcw />, title: "Easy Returns", desc: "30 days money back guarantee" },
  ];

  return (
    <div className="mt-16 sm:mt-28 px-5 sm:px-8 md:px-12 w-full">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.05 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10 sm:py-16 border-y border-green-100/50 bg-green-50/10 rounded-[2rem] sm:rounded-[2.5rem]"
        >
          {features.map((feature, index) => (
            <div key={index} className="flex justify-center w-full px-4 sm:px-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="flex items-center gap-4 sm:gap-6 group cursor-default w-full max-w-sm"
              >
                <div className="p-4 sm:p-5 bg-white rounded-2xl shrink-0 text-primary border border-green-100 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-900/10 transition-[background-color,color,box-shadow,transform] duration-500 ease-out will-change-transform [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-7 sm:[&>svg]:w-7">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustFeatures;