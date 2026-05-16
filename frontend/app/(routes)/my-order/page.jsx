"use client";
import useAuth from "@/app/_context/useAuth";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_components/MyOrderItem";
import { CircleX, DoorClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MyOrder = () => {
  const { jwt, user } = useAuth();
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (jwt === null) {
      // jwt masih null, tunggu sampai jwt di-set oleh useAuth
      console.log("Waiting for JWT to be set...");
      return;
    }
    if (!jwt) {
      console.log("JWT is empty, redirecting...");
      router.replace("/");
    }

    getMyOrder();
  }, [jwt, router]);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    setOrderList(orderList_);
    console.log(orderList_);
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        My Order
      </h2>
      <div className="py-8 mx-7 lg:mx-56 md:mx-36">
        <div className="flex items-center justify-around mb-4">
          <h2 className="text-3xl font-bold text-primary">Order History</h2>
          <Link href={"/"}>
            <Button
              variant="outline"
              className="flex items-center gap-1 border border-gray-300 rounded-lg p-5 "
            >
              <CircleX width={27} />
              <p className="text-sm">Kembali</p>
            </Button>
          </Link>
        </div>
        <div className="w-full justify-center flex flex-col items-center gap-4">
          {orderList.map((order, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex justify-evenly gap-28">
                  <h2>
                    <span className="font-bold mr-2">Order Date:</span>
                    {moment(order?.createdAt).format("DD/MMM/yyy")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount:</span>
                    Rp{(order?.totalOrderAmount).toLocaleString("id-ID")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status:</span>
                    {order.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {order.orderItemList.map((orderItem, index) => (
                  <MyOrderItem
                    key={index}
                    orderItem={orderItem}
                    orderStatus={order.status}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
