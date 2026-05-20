import { Facebook, Instagram, Linkedin, Twitter, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-background mt-20 p-12 px-6 md:px-12 lg:px-24 rounded-t-[3rem]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Image src="/logo.png" width={150} height={100} alt="logo" />
          <p className="text-sm max-w-sm leading-relaxed opacity-70">
            Freshly curated groceries delivered with care. Inspired by quality, 
            driven by health. Experience the new standard of organic shopping.
          </p>
          <div className="flex gap-4">
            <Facebook className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Twitter className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Instagram className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Linkedin className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-6 uppercase tracking-widest text-accent">Navigation</h2>
          <ul className="space-y-4 text-sm opacity-70">
            <li className="hover:opacity-100 cursor-pointer transition-opacity">Categories</li>
            <li className="hover:opacity-100 cursor-pointer transition-opacity">About Us</li>
            <li className="hover:opacity-100 cursor-pointer transition-opacity">Contact</li>
            <li className="hover:opacity-100 cursor-pointer transition-opacity">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-6 uppercase tracking-widest text-accent">Newsletter</h2>
          <p className="text-sm mb-4 opacity-70">Subscribe to get latest updates and offers.</p>
          <div className="flex bg-white/10 rounded-full p-1 pl-4 items-center">
            <input 
              type="text" 
              placeholder="Email address" 
              className="bg-transparent outline-none text-sm w-full placeholder:text-white/40 text-white"
            />
            <button className="bg-accent text-primary-foreground p-3 rounded-full hover:scale-105 transition-transform">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-40">
        © 2026 E-Commerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
