import { CircleCheckBig, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyOrderItem = ({ orderItem, orderStatus }) => {
  return (
    <div className="w-full group/item">
      <div className="flex flex-col md:flex-row items-center gap-8 py-4">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative h-24 w-24 bg-white rounded-3xl flex items-center justify-center p-4 border border-green-50 shadow-sm group-hover/item:shadow-lg transition-all duration-500">
            <Image
              src={
                (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337") +
                (orderItem.image || "/logo.png")
              }
              width={80}
              height={80}
              alt="image"
              className="object-contain transition-transform duration-500 group-hover/item:scale-110"
            />
          </div>
          <div className="space-y-1">
            <h2 className="font-black text-gray-900 text-lg tracking-tight leading-tight uppercase">{orderItem.name}</h2>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Unit Price: <span className="text-primary ml-1">Rp{(orderItem.actualPrice || 0).toLocaleString("id-ID")}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-12 md:gap-24">
          <div className="text-center space-y-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quantity</p>
            <h2 className="text-xl font-black text-gray-900">
              {orderItem.quantity}
            </h2>
          </div>
          
          <div className="text-center space-y-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Price</p>
            <h2 className="text-xl font-black text-primary">
              Rp{orderItem.amount?.toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100">
            {orderStatus?.toLowerCase() === "paid" || orderStatus?.toLowerCase() === "success" ? (
              <CircleCheckBig className="text-green-500 h-6 w-6" />
            ) : (
              <X className={`${orderStatus?.toLowerCase() === 'cancelled' ? 'text-red-500' : 'text-amber-500'} h-6 w-6`} />
            )}
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent mt-4 opacity-50" />
    </div>
  );
};

export default MyOrderItem;
