import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-20 px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-2">
          <h2 className="text-primary font-bold text-3xl md:text-4xl tracking-tighter">Shop by Category</h2>
          <p className="text-muted-foreground font-medium">Explore our curated selection of fresh essentials.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categoryList.map((c, index) => (
          <Link
            key={c.id || index}
            href={"/products-category/" + c.name}
            className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-secondary/20 hover:bg-background border border-transparent hover:border-primary/10 ${
              index === 0 ? "md:col-span-2 md:row-span-2 py-16" : ""
            }`}
          >
            <div className="relative p-6 rounded-full bg-background group-hover:scale-110 transition-transform duration-500 shadow-sm">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                  c?.image?.url || ""
                }`}
                width={index === 0 ? 80 : 50}
                height={index === 0 ? 80 : 50}
                alt="icon"
                className="transition-all ease-in-out"
              />
            </div>
            <h2 className="text-primary text-center font-bold text-lg group-hover:tracking-wider transition-all">
              {c.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
