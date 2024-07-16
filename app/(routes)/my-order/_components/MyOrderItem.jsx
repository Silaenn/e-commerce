import { CircleCheckBig, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyOrderItem = ({ orderItem, orderStatus }) => {
  console.log("Order status:", orderStatus);
  return (
    <div className="w-full">
      <div className="grid grid-cols-6 mt-3 items-center gap-12">
        <div className="flex items-center gap-4 justify-start col-span-2 ">
          <Image
            src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
              orderItem.product.data.attributes.images.data[0].attributes.url
            }
            width={80}
            height={80}
            alt="image"
            className="bg-gray-100 p-5 rounded-md"
          />
          <div>
            <h2>{orderItem.product.data.attributes.name}</h2>
            <h2>Item Price: {orderItem.product.data.attributes.mrp}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-3 col-span-3 mr-16 ">
          <h2 className="text-center">
            Quantity: {""}
            {orderItem.quantity}
          </h2>
          <h2 className="text-center">
            Price: {""}Rp{orderItem.amount?.toLocaleString("id-ID")}
          </h2>
        </div>
        <div>
          {orderStatus === "Success" && (
            <CircleCheckBig className="text-green-500" />
          )}
          {orderStatus === "Pending" && <X className="text-red-500" />}
        </div>
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export default MyOrderItem;
