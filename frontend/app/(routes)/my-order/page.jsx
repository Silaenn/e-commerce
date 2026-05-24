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
import { motion } from "framer-motion";
import MyOrderItem from "./_components/MyOrderItem";
import { ArrowLeft, History } from "lucide-react";
import Link from "next/link";

const MyOrder = () => {
  const { jwt, user } = useAuth();
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (jwt === null) return;
    if (!jwt) router.replace("/");
    getMyOrder();
  }, [jwt, router]);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    setOrderList(orderList_);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Premium Header */}
      <div className="bg-green-50/30 py-10 sm:py-16 px-5 sm:px-8 md:px-12 w-full border-b border-green-100/50">
         <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-rowjustify-between items-center gap-4 sm:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 sm:space-y-3 text-center sm:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="h-0.5 w-8 bg-primary/60" />
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                Account
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-gray-900">
              Order History
            </h2>
          </motion.div>

          <Link href={"/"}>
            <motion.button 
              whileHover={{ x: -5 }}
              className="flex items-center gap-3 px-8 py-4 bg-white border border-green-100 rounded-full text-primary font-black shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all text-xs sm:text-sm uppercase tracking-widest"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8">
          {orderList.length > 0 ? orderList.map((order, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
            >
              <Collapsible className="group">
                <CollapsibleTrigger asChild>
                  <div className="w-full  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-5 sm:p-8 md:p-10 bg-white border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem] hover:border-primary/20 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 cursor-pointer group-data-[state=open]:border-primary/20 group-data-[state=open]:shadow-xl">
                    <div className="flex items-center gap-5 sm:gap-8">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-[1rem] sm:rounded-[1.2rem] bg-green-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <History className="h-7 w-7" />
                      </div>
                      <div className="text-left space-y-1">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Placed</p>
                        <h2 className="text-lg sm:text-xl font-black text-gray-900">{moment(order?.createdAt).format("DD MMMM YYYY")}</h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 sm:gap-8 md:gap-16 w-full sm:w-auto">
                      <div className="text-center md:text-left space-y-1 w-40">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                        <h2 className="text-xl sm:text-2xl font-black text-primary">Rp{(order?.totalOrderAmount).toLocaleString("id-ID")}</h2>
                      </div>
                      
                      <div className="text-center md:text-left space-y-1 w-32 flex flex-col items-center">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</p>
                        <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm inline-block
                          ${(order.status?.toLowerCase() === 'paid' || order.status?.toLowerCase() === 'success') 
                            ? 'bg-green-100 text-green-700' 
                            : order.status?.toLowerCase() === 'cancelled'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-amber-100 text-amber-700'}
                        `}>
                          {order.status || 'pending'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 sm:mt-6 bg-gray-50/50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-12 border border-green-50 shadow-inner"
                  >
                    <div className="space-y-8">
                      {order.orderItemList.map((orderItem, idx) => (
                        <MyOrderItem
                          key={idx}
                          orderItem={orderItem}
                          orderStatus={order.status}
                        />
                      ))}
                    </div>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          )) : (
            <div className="py-16 sm:py-32 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
              <div className="bg-gray-50 p-8 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem]">
                <History className="h-14 w-14 sm:h-20 sm:w-20 text-gray-200" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter">No orders found</h2>
                <p className="text-gray-400 font-medium text-base sm:text-lg">You haven't made any purchases yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
