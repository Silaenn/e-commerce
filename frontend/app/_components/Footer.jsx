import { Facebook, Instagram, Linkedin, Twitter, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-900 mt-20 border-t border-gray-100 w-full">
      <div className="mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Image src="/logo.png" width={140} height={80} alt="logo" className="opacity-90" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Elevating your daily grocery experience with curated, 
              organic essentials delivered fresh to your door.
            </p>
            <div className="flex gap-5">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-sm uppercase tracking-widest text-primary mb-6">Explore</h2>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="hover:text-primary cursor-pointer transition-colors">Home</li>
              <li className="hover:text-primary cursor-pointer transition-colors">All Products</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Categories</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Flash Sale</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-bold text-sm uppercase tracking-widest text-primary mb-6">Contact Us</h2>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 812-3456-789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@grocery.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-bold text-sm uppercase tracking-widest text-primary mb-6">Newsletter</h2>
            <p className="text-gray-500 text-sm mb-4">Get the latest updates on new products and upcoming sales.</p>
            <div className="flex bg-white rounded-full p-1 pl-4 border border-gray-200 focus-within:border-primary transition-all">
              <input 
                type="text" 
                placeholder="Your email" 
                className="bg-transparent outline-none text-sm w-full"
              />
              <button className="bg-primary text-white p-3 rounded-full hover:bg-green-700 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © 2026 Modern Grocery Marketplace. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-gray-400 font-medium">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Cookies Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
