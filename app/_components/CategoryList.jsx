import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-2">
        {categoryList.map((c, index) => (
          <Link
            key={c.id || index}
            href={"/products-category/" + c.attributes.name}
            className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-600"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${
                c?.attributes?.icon?.data?.[0]?.attributes?.url || ""
              }`}
              width={50}
              height={50}
              alt="icon"
              className="group-hover:scale-125 transition-all ease-in"
            />
            <h2 className="text-green-800 text-center text-sm group-hover:text-white">
              {c.attributes.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
