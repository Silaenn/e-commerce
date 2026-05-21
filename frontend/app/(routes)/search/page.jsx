"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import ProductList from "@/app/_components/ProductList";
import { SearchContext } from "@/app/_context/SearchContext";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      GlobalApi.searchProducts(query).then((res) => {
        setProductList(res);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="bg-green-50/30 py-16 px-6 md:px-12 lg:px-12 w-full border-b border-green-100/50">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="h-0.5 w-8 bg-primary/60" />
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                Search Results
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900">
              "{query}"
            </h2>
          </motion.div>

          <Link href={"/"}>
            <motion.button 
              whileHover={{ x: -5 }}
              className="flex items-center gap-3 px-8 py-4 bg-white border border-green-100 rounded-full text-primary font-black shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center py-32">
             <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="pb-20">
            <ProductList productList={productList} />
            
            {productList.length === 0 && (
              <div className="py-24 flex flex-col items-center justify-center text-center space-y-6">
                <div className="bg-gray-50 p-12 rounded-[2.5rem]">
                  <Search className="h-20 w-20 text-gray-200" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tighter">No items found</h2>
                  <p className="text-gray-400 font-medium text-lg">We couldn't find anything matching your search. Try different keywords.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
