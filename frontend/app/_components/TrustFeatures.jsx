"use client";
import React from "react";
import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const TrustFeatures = () => {
  const features = [
    {
      icon: <Truck />,
      title: "Free Shipping",
      desc: "For all orders over Rp 200k"
    },
    {
      icon: <ShieldCheck />,
      title: "Secure Payment",
      desc: "100% secure payment methods"
    },
    {
      icon: <Headphones />,
      title: "24/7 Support",
      desc: "Get help anytime you need"
    },
    {
      icon: <RotateCcw />,
      title: "Easy Returns",
      desc: "30 days money back guarantee"
    }
  ];

  return (
    <div className="mt-28 px-6 md:px-12 lg:px-12 w-full">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}  
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.05,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-y border-green-100/50 bg-green-50/10 rounded-[2.5rem] place-items-center"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="flex items-center gap-6 group cursor-default"
          >
            {/* Icon box */}
            <div className="p-5 bg-white rounded-2xl shrink-0
              text-primary border border-green-100 shadow-sm
              group-hover:bg-primary group-hover:text-white
              group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-900/10
              transition-all duration-500 ease-out
              [&>svg]:h-7 [&>svg]:w-7 [&>svg]:transition-colors"
            >
              {feature.icon}
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight
                group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

export default TrustFeatures;
