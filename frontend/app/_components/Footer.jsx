import {
  Facebook, Instagram, Linkedin, Twitter,
  ChevronRight, Mail, Phone, MapPin,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <footer className="bg-white text-gray-900 mt-20 sm:mt-32 border-t border-green-100/50 w-full relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-20 relative z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-16">
          {/* Brand Section */}
          <motion.div variants={columnVariants} className="space-y-5 sm:space-y-8">
            <Image
              src="/logo.png"
              width={150}
              height={90}
              alt="logo"
              className="w-28 sm:w-36 h-auto opacity-100"
            />
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              Elevating your daily grocery experience with curated, organic
              essentials delivered fresh to your door.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300 cursor-pointer"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={columnVariants}>
            <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-4 sm:mb-8">
              Explore
            </h2>
            <ul className="space-y-3 sm:space-y-4 text-sm text-gray-600 font-bold">
              {["Home", "All Products", "Categories", "Flash Sale"].map((link) => (
                <li
                  key={link}
                  className="group flex items-center gap-2 hover:text-primary cursor-pointer transition-all duration-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={columnVariants}>
            <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-4 sm:mb-8">
              Contact Us
            </h2>
            <ul className="space-y-4 sm:space-y-6 text-sm text-gray-600 font-bold">
              {[
                { Icon: MapPin, text: "Jakarta, Indonesia" },
                { Icon: Phone, text: "+62 812-3456-789" },
                { Icon: Mail, text: "support@grocery.com" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0"
                  >
                    <item.Icon className="h-5 w-5" />
                  </motion.div>
                  <span className="group-hover:text-primary transition-colors">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={columnVariants} className="space-y-4 sm:space-y-6">
            <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-4 sm:mb-8">
              Newsletter
            </h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Get the latest updates on new products and upcoming sales.
            </p>
            <div className="flex bg-gray-50 rounded-2xl p-2 pl-5 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all shadow-inner">
              <input
                type="text"
                placeholder="Your email"
                className="bg-transparent outline-none text-sm w-full font-bold placeholder:text-gray-400 placeholder:font-medium"
              />
              <button className="bg-primary text-white p-3 sm:p-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-900/10 active:scale-95 group/btn">
                <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={columnVariants}
          className="border-t border-gray-100 mt-10 sm:mt-20 pt-6 sm:pt-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6"
        >
          <p className="text-gray-400 text-xs font-medium">
            © 2026 Modern Grocery Marketplace. Designed with ❤️ for healthy life.
          </p>
          <div className="flex gap-4 sm:gap-6 md:gap-10 text-xs text-gray-400 font-bold">
            {["Privacy Policy", "Terms of Service", "Cookies Settings"].map((item) => (
              <span
                key={item}
                className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-primary/5 blur-[100px] rounded-full -mr-20 -mb-20 sm:-mr-32 sm:-mb-32" 
      />
    </footer>
  );
};

export default Footer;