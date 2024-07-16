import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <div className="flex overflow-x-auto custom-scrollbar pb-4 mx-2 sm:mx-7 md:mx-20 gap-5 mt-2">
      {categoryList.map((c, index) => (
        <Link
          key={index}
          href={"/products-category/" + c.attributes.name}
          className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-600 w-[150px] min-w-[80px] sm:min-w-[100px]
            ${
              selectedCategory === c.attributes.name &&
              "bg-green-600 text-white"
            }
            `}
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
          <h2
            className={`text-green-800 group-hover:text-white
              ${selectedCategory === c.attributes.name && "text-white"}
            `}
          >
            {c.attributes.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
