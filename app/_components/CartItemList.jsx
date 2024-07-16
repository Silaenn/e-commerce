import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  return (
    <div>
      <div className="h-[500px]">
        {cartItemList.map((cart, index) => (
          <div
            className="flex justify-between items-center p-2 mb-5 "
            key={index}
          >
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={70}
                height={70}
                alt={cart.name}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold ">{cart.name}</h2>
                <h2 className="">Quantity {cart.quantity}</h2>
                <h2 className="text-lg font-bold">
                  Rp{cart.amount.toLocaleString("id-ID")}
                </h2>
              </div>
            </div>
            <Trash2Icon
              className="cursor-pointer"
              onClick={() => onDeleteItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CartItemList;
