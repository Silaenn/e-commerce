"use client";

import { UpdateCartContext } from "@/app/_context/UpdateCartContext";
import useAuth from "@/app/_context/useAuth";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight, ArrowLeft, CreditCard, MapPin, Phone, Mail, User, ReceiptText, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { user, jwt } = useAuth();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const [paymentPending, setPaymentPending] = useState(false);
  const [paymentToken, setPaymentToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && jwt) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      fetchInitialData();
    }

    const storedPaymentPending = sessionStorage.getItem("paymentPending");
    const storedPaymentToken = sessionStorage.getItem("paymentToken");

    if (storedPaymentPending === "true" && storedPaymentToken) {
      setPaymentPending(true);
      setPaymentToken(storedPaymentToken);
    }
  }, [user, jwt]);

  const fetchInitialData = async () => {
    setIsFetching(true);
    try {
      const [addresses, items] = await Promise.all([
        GlobalApi.getUserAddresses(user.id, jwt),
        GlobalApi.getCartItems(user.id, jwt)
      ]);

      setUserAddresses(addresses);
      if (addresses.length > 0) {
        const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
        applyAddress(defaultAddr);
      } else {
        setSelectedAddressId("new");
      }

      setTotalCartItem(items?.length);
      setCartItemList(items);
    } catch (error) {
      console.error("Error fetching initial checkout data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const applyAddress = (addr) => {
    setSelectedAddressId(addr.documentId);
    setPhone(addr.phone || "");
    setZip(addr.zip || "");
    setAddress(addr.address || "");
  };

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
    if (id === "new") {
      setPhone("");
      setZip("");
      setAddress("");
    } else {
      const selected = userAddresses.find(a => a.documentId === id);
      if (selected) applyAddress(selected);
    }
  };

  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    switch (field) {
      case "username": setUsername(value); break;
      case "email": setEmail(value); break;
      case "phone": setPhone(value); break;
      case "zip": setZip(value); break;
      case "address": setAddress(value); break;
    }
  };

  useEffect(() => {
    if (!window.snap) {
      const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
      const clientKey = process.env.NEXT_PUBLIC_CLIENT;
      const script = document.createElement("script");

      script.src = snapScript;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  useEffect(() => {
    if (updateCart && !paymentSuccess) {
      getCartItems();
    }
  }, [updateCart]);

  const getCartItems = async () => {
    if (user && jwt) {
      const items = await GlobalApi.getCartItems(user.id, jwt);
      setTotalCartItem(items?.length);
      setCartItemList(items);
    }
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setTotalOrderAmount(total + 5000 + 10000);
    setSubTotal(total);
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = subtotal + 5000 * totalCartItem + 10000;
    return "Rp" + totalAmount.toLocaleString("id-ID");
  };

  const onApprove = async () => {
    if (loading) return;
    setLoading(true);

    if (saveAddress && selectedAddressId === "new") {
      try {
        await GlobalApi.addUserAddress({
          data: {
            name: username,
            phone: phone,
            zip: zip,
            address: address,
            userId: user.id.toString(),
            isDefault: userAddresses.length === 0
          }
        }, jwt);
      } catch (error) {
        console.error("Error saving address:", error);
      }
    }

    const payload = {
      data: {
        paymentId: user.id.toString(),
        totalOrderAmount: totalOrderAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderitemList: cartItemList,
        userId: user.id.toString(),
        Status: "pending",
      },
    };

    GlobalApi.createOrder(payload, jwt)
      .then((res) => {
        const token = res.transaction.transaction.token;
        setPaymentToken(token);
        sessionStorage.setItem("paymentToken", token);
        const orderDocId = res.order.data.documentId;
        sessionStorage.setItem("orderId", orderDocId);

        if (window.snap) {
          window.snap.pay(token, {
            onSuccess: async function (result) {
              setPaymentSuccess(true); // Lock UI
              toast.success("Payment successful!");
              localStorage.setItem("checkoutCompleted", "true");

              await GlobalApi.updateOrder(orderDocId, "paid", jwt);

              await Promise.all(
                cartItemList.map((item) => GlobalApi.deleteCartItems(item.id, jwt))
              );

              sessionStorage.removeItem("paymentPending");
              sessionStorage.removeItem("paymentToken");
              sessionStorage.removeItem("orderId");
              setUpdateCart(!updateCart);
              router.push("/order-confirmation");
            },
            onPending: function (result) {
              toast("Payment is pending. Please complete the payment.");
              setPaymentPending(true);
              sessionStorage.setItem("paymentPending", "true");
              setLoading(false);
            },
            onError: function (result) {
              toast.error("Payment failed. Please try again.");
              setPaymentPending(false);
              sessionStorage.removeItem("paymentPending");
              sessionStorage.removeItem("paymentToken");
              sessionStorage.removeItem("orderId");
              setLoading(false);
            },
            onClose: async function () {
              toast("Payment cancelled.");
              await GlobalApi.updateOrder(orderDocId, "cancelled", jwt);
              sessionStorage.removeItem("paymentPending");
              sessionStorage.removeItem("paymentToken");
              sessionStorage.removeItem("orderId");
              setPaymentPending(false);
              setLoading(false);
            },
          });
        } else {
          toast.error("Payment system is not ready. Please try again later.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        toast.error("Failed to place order. Please try again.");
        setLoading(false);
      });
  };

  const reopenPaymentPopup = () => {
    if (paymentPending && window.snap && paymentToken) {
      setLoading(true);
      window.snap.pay(paymentToken, {
        onSuccess: async function (result) {
          setPaymentSuccess(true);
          toast.success("Payment successful!");
          localStorage.setItem("checkoutCompleted", "true");

          const orderId = sessionStorage.getItem("orderId");
          await GlobalApi.updateOrder(orderId, "paid", jwt);

          await Promise.all(
            cartItemList.map((item) => GlobalApi.deleteCartItems(item.id, jwt))
          );

          sessionStorage.removeItem("paymentPending");
          sessionStorage.removeItem("paymentToken");
          sessionStorage.removeItem("orderId");
          setUpdateCart(!updateCart);
          router.push("/order-confirmation");
        },
        onPending: function (result) {
          toast("Payment is still pending.");
          setLoading(false);
        },
        onClose: function () {
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    const checkPendingOrder = async () => {
      const storedPaymentPending = sessionStorage.getItem("paymentPending");
      const storedPaymentToken = sessionStorage.getItem("paymentToken");
      const storedOrderId = sessionStorage.getItem("orderId");

      if (storedPaymentPending === "true" && storedOrderId && jwt) {
        try {
          await GlobalApi.getMyOrder(user.id, jwt); 
          setPaymentPending(true);
          setPaymentToken(storedPaymentToken);
        } catch (error) {
          console.log("Pending order not found, clearing session...");
          sessionStorage.removeItem("paymentPending");
          sessionStorage.removeItem("paymentToken");
          sessionStorage.removeItem("orderId");
          setPaymentPending(false);
          setPaymentToken(null);
        }
      }
    };

    if (user && jwt) {
      checkPendingOrder();
    }
  }, [user, jwt]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-green-50/30 py-10 sm:py-16 px-5 sm:px-8 md:px-12 w-full border-b border-green-100/50">
        <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 sm:space-y-3 text-center sm:text-left"
          >
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="h-0.5 w-8 bg-primary/60" />
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                Secure Checkout
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-gray-900">
              {paymentSuccess ? "Payment Verified" : "Review & Pay"}
            </h2>
          </motion.div>

          {!paymentSuccess && (
            <Link href={"/"}>
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-white border border-green-100 rounded-full text-primary font-black shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all text-xs sm:text-sm uppercase tracking-widest"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                Continue Shopping
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-5 py-4 sm:px-8 sm:py-6 md:p-12">
        <AnimatePresence mode="wait">
          {isFetching || paymentSuccess ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12"
            >
              <div className="lg:col-span-2 space-y-10">
                 <div className="space-y-6">
                    {paymentSuccess ? (
                       <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-green-50/30 rounded-[3rem] border border-green-100">
                          <motion.div 
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="h-24 w-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-900/20"
                          >
                             <Sparkles className="h-12 w-12" />
                          </motion.div>
                          <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Payment Verified!</h2>
                            <p className="text-gray-500 font-bold text-lg">Finalizing your order and clearing cart...</p>
                          </div>
                          <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: "100%" }}
                               transition={{ duration: 1.5 }}
                               className="h-full bg-primary"
                             />
                          </div>
                       </div>
                    ) : (
                       <>
                          <div className="h-16 w-full bg-gray-300 animate-pulse rounded-3xl" />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                             <div className="h-14 w-full bg-gray-200 animate-pulse rounded-2xl" />
                             <div className="h-14 w-full bg-gray-200 animate-pulse rounded-2xl" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                             <div className="h-14 w-full bg-gray-200 animate-pulse rounded-2xl" />
                             <div className="h-14 w-full bg-gray-200 animate-pulse rounded-2xl" />
                          </div>
                          <div className="h-40 w-full bg-gray-200 animate-pulse rounded-3xl" />
                       </>
                    )}
                 </div>
              </div>
              <div className="lg:col-span-1">
                 <div className="h-[450px] w-full bg-gray-300 animate-pulse rounded-[2.5rem]" />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12"
            >
              {/* Left Column: Billing Details */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-10">
                <div className="space-y-5 sm:space-y-6">
                  {/* Section Header + Address Select */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                        <ReceiptText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
                          Billing Details
                        </h2>
                        <p className="text-gray-400 font-medium text-sm">
                          Please enter your shipping information below.
                        </p>
                      </div>
                    </div>
                    {userAddresses.length > 0 && (
                      <div className="w-full sm:w-64">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                          Select Saved Address
                        </label>
                        <select
                          className="w-full h-10 px-4 rounded-xl border border-gray-100 bg-gray-50 text-xs font-bold focus:bg-white outline-none transition-all cursor-pointer"
                          value={selectedAddressId}
                          onChange={(e) => handleAddressSelect(e.target.value)}
                        >
                          {userAddresses.map((addr) => (
                            <option key={addr.documentId} value={addr.documentId}>
                              {addr.name} ({addr.address.substring(0, 15)}...)
                            </option>
                          ))}
                          <option value="new">+ Add New Address</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                        Full Name
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Enter your name"
                          className="h-12 sm:h-14 pl-11 sm:pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-bold text-sm"
                          value={username}
                          onChange={handleInputChange("username")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Enter your email"
                          className="h-12 sm:h-14 pl-11 sm:pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-bold text-sm"
                          onChange={handleInputChange("email")}
                          value={email}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Zip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                        Phone Number
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Phone number"
                          className="h-12 sm:h-14 pl-11 sm:pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-bold text-sm"
                          onChange={handleInputChange("phone")}
                          value={phone}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                        Zip Code
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Zip code"
                          className="h-12 sm:h-14 pl-11 sm:pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-bold text-sm"
                          onChange={handleInputChange("zip")}
                          value={zip}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full Address */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                        Full Address
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Complete delivery address"
                          className="h-12 sm:h-14 pl-11 sm:pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-bold text-sm"
                          onChange={handleInputChange("address")}
                          value={address}
                        />
                      </div>
                    </div>

                    {selectedAddressId === "new" && (
                      <label className="flex items-center gap-3 cursor-pointer group w-fit">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="peer hidden"
                            checked={saveAddress}
                            onChange={(e) => setSaveAddress(e.target.checked)}
                          />
                          <div className="h-6 w-6 border-2 border-gray-200 rounded-lg peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-500 group-hover:text-primary transition-colors">
                          Save this address to my profile
                        </span>
                      </label>
                    )}
                  </div>

                  {paymentPending && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 sm:p-6 bg-red-50 border border-red-100 rounded-2xl sm:rounded-[2rem] flex items-start sm:items-center gap-3 sm:gap-4"
                    >
                      <div className="h-8 w-8 sm:h-10 sm:w-10 bg-red-500 rounded-full flex items-center justify-center text-white shrink-0 text-sm font-black">
                        !
                      </div>
                      <p className="text-red-700 font-bold text-sm">
                        You have a pending payment. Please click the "Complete Payment" button to finish your order.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-gray-100 shadow-xl shadow-green-900/5 lg:sticky lg:top-28">
                  <div className="space-y-5 sm:space-y-6">
                    <div className="flex justify-between items-center pb-4 sm:pb-6 border-b border-gray-200">
                      <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight">
                        Order Summary
                      </h2>
                      <span className="bg-primary/10 text-primary px-3 sm:px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                        {totalCartItem} Items
                      </span>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        <span>Subtotal</span>
                        <span className="text-gray-900 font-black text-sm">
                          Rp{subtotal.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        <span>Delivery Fee</span>
                        <span className="text-gray-900 font-black text-sm">Rp10.000</span>
                      </div>
                      <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        <span>Platform Fee</span>
                        <span className="text-gray-900 font-black text-sm">Rp5.000</span>
                      </div>
                    </div>

                    <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-4 sm:space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-black uppercase tracking-widest text-xs">
                          Total Amount
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-primary tracking-tighter">
                          {calculateTotalAmount()}
                        </span>
                      </div>

                      {paymentPending ? (
                        <Button
                          onClick={reopenPaymentPopup}
                          disabled={loading}
                          className="w-full h-12 sm:h-16 rounded-full text-base sm:text-lg font-black bg-orange-500 hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 gap-3"
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              Complete Payment
                              <ArrowBigRight className="h-5 w-5 sm:h-6 sm:w-6" />
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={onApprove}
                          disabled={
                            !(username && email && zip && address) ||
                            totalCartItem === 0 ||
                            loading
                          }
                          className="w-full h-12 sm:h-16 rounded-full text-base sm:text-lg font-black bg-primary text-white hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 gap-2 sm:gap-3 active:scale-[0.98]"
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                              Proceed to Payment
                              <ArrowBigRight className="h-5 w-5 sm:h-6 sm:w-6" />
                            </>
                          )}
                        </Button>
                      )}

                      <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                        Secure Payment by Midtrans
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pb-16 sm:pb-20" />
    </div>
  );
};

export default Checkout;
