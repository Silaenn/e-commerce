"use client";

import { UpdateCartContext } from "@/app/_context/UpdateCartContext";
import useAuth from "@/app/_context/useAuth";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const { user, jwt } = useAuth();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const [paymentPending, setPaymentPending] = useState(false);
  const [paymentToken, setPaymentToken] = useState(null);
  useEffect(() => {
    // Load saved form data from localStorage
    const savedUsername = localStorage.getItem("checkout_username");
    const savedEmail = localStorage.getItem("checkout_email");
    const savedPhone = localStorage.getItem("checkout_phone");
    const savedZip = localStorage.getItem("checkout_zip");
    const savedAddress = localStorage.getItem("checkout_address");
    const checkoutCompleted = localStorage.getItem("checkoutCompleted");

    if (!checkoutCompleted) {
      if (savedUsername) setUsername(savedUsername);
      if (savedEmail) setEmail(savedEmail);
      if (savedPhone) setPhone(savedPhone);
      if (savedZip) setZip(savedZip);
      if (savedAddress) setAddress(savedAddress);
    } else {
      // Jika checkout telah selesai, bersihkan data
      localStorage.removeItem("checkout_username");
      localStorage.removeItem("checkout_email");
      localStorage.removeItem("checkout_phone");
      localStorage.removeItem("checkout_zip");
      localStorage.removeItem("checkout_address");
      localStorage.removeItem("checkoutCompleted");
    }
  }, []);
  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    switch (field) {
      case "username":
        setUsername(value);
        localStorage.setItem("checkout_username", value);
        break;
      case "email":
        setEmail(value);
        localStorage.setItem("checkout_email", value);
        break;
      case "phone":
        setPhone(value);
        localStorage.setItem("checkout_phone", value);
        break;
      case "zip":
        setZip(value);
        localStorage.setItem("checkout_zip", value);
        break;
      case "address":
        setAddress(value);
        localStorage.setItem("checkout_address", value);
        break;
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
    getCartItems();
  }, [user, jwt, updateCart]);

  const getCartItems = async () => {
    if (user && jwt) {
      const cartItemList = await GlobalApi.getCartItems(user.id, jwt);
      setTotalCartItem(cartItemList?.length);
      setCartItemList(cartItemList);
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

  const onApprove = () => {
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
        userId: user.id,
      },
    };

    console.log(cartItemList);

    GlobalApi.createOrder(payload, jwt)
      .then((res) => {
        const token = res.transaction.transaction.token;
        setPaymentToken(token);
        localStorage.setItem("paymentToken", token);
        const id = res.order.data.id;
        localStorage.setItem("orderId", id);

        // Periksa ketersediaan Snap
        if (window.snap) {
          window.snap.pay(token, {
            onSuccess: function (result) {
              console.log("Payment success:", result);
              toast("Payment successful!");
              localStorage.setItem("checkoutCompleted", "true");

              const id = res.order.data.id;
              GlobalApi.updateOrder(id, "Success", jwt);

              cartItemList.forEach((item, index) => {
                GlobalApi.deleteCartItems(item.id, jwt).then((res) => {});
              });

              localStorage.removeItem("paymentPending");
              localStorage.removeItem("paymentToken");
              localStorage.removeItem("checkout_username");
              localStorage.removeItem("checkout_email");
              localStorage.removeItem("checkout_phone");
              localStorage.removeItem("checkout_zip");
              localStorage.removeItem("checkout_address");
              setUpdateCart(!updateCart);
              setPaymentPending(false);
              window.location.href = "/order-confirmation";

              // Tambahkan logika untuk menangani pembayaran sukses
            },
            onPending: function (result) {
              console.log("Payment pending:", result);
              toast("Payment is pending. Please complete the payment.");
              setPaymentPending(true);
              localStorage.setItem("paymentPending", "true");
              // Tambahkan logika untuk menangani pembayaran tertunda
            },
            onError: function (result) {
              console.error("Payment error:", result);
              toast("Payment failed. Please try again.");
              setPaymentPending(false);
              localStorage.removeItem("paymentPending");
              localStorage.removeItem("paymentToken");
              // Tambahkan logika untuk menangani pembayaran gagal
            },
            onClose: function () {
              console.log(
                "Customer closed the popup without finishing the payment"
              );
              toast(
                "Payment cancelled. Please try again if you wish to complete the order."
              );
              // window.location.href = "/order-confirmation";

              // Tambahkan logika untuk menangani penutupan popup
            },
          });
        } else {
          console.error("Snap is not available");
          toast("Payment system is not ready. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        toast("Failed to place order. Please try again.");
      });
  };

  const reopenPaymentPopup = () => {
    if (paymentPending && window.snap && paymentToken) {
      window.snap.pay(paymentToken, {
        onSuccess: function (result) {
          console.log("Payment success:", result);
          toast("Payment successful!");
          localStorage.setItem("checkoutCompleted", "true");

          const orderId = localStorage.getItem("orderId");

          GlobalApi.updateOrder(orderId, "Success", jwt);
          localStorage.setItem("paymentPending", "false");

          cartItemList.forEach((item, index) => {
            GlobalApi.deleteCartItems(item.id, jwt).then((res) => {});
          });

          localStorage.removeItem("paymentPending");
          localStorage.removeItem("paymentToken");
          localStorage.removeItem("checkout_username");
          localStorage.removeItem("checkout_email");
          localStorage.removeItem("checkout_phone");
          localStorage.removeItem("checkout_zip");
          localStorage.removeItem("checkout_address");
          setUpdateCart(!updateCart);
          setPaymentPending(false);
          window.location.href = "/order-confirmation";

          // Tambahkan logika untuk menangani pembayaran sukses
        },
        onPending: function (result) {
          console.log("Payment still pending:", result);
          toast("Payment is still pending. Please complete the payment.");
          setPaymentPending(true);
          localStorage.setItem("paymentPending", "true");
        },
      });
    }
  };

  useEffect(() => {
    const storedPaymentPending = localStorage.getItem("paymentPending");
    const storedPaymentToken = localStorage.getItem("paymentToken");

    if (storedPaymentPending === "true" && storedPaymentToken) {
      setPaymentPending(true);
      setPaymentToken(storedPaymentToken);
    }
  }, []);

  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid md:grid-cols-3 py-8">
        <div className="xl:col-span-2 lg:col-span-3 col-span-3 md:mx-20 mx-10 mb-5">
          <h2 className="font-bold text-3xl sm:mb-2 mb-2 text-center md:text-start">
            Billing Details
          </h2>
          <div className="grid md:grid-cols-2 md:gap-10 sm:mt-3 grid-cols-1 gap-5 ">
            <Input
              placeholder="Name"
              value={username}
              onChange={handleInputChange("username")}
            />
            <Input
              placeholder="Email"
              onChange={handleInputChange("email")}
              value={email}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-10 mt-3 grid-cols-1 gap-5">
            <Input
              placeholder="Phone"
              onChange={handleInputChange("phone")}
              value={phone}
            />
            <Input
              placeholder="Zip"
              onChange={handleInputChange("zip")}
              value={zip}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Adderes"
              onChange={handleInputChange("address")}
              value={address}
            />
          </div>

          {paymentPending && (
            <Link href={"/my-order"}>
              <div className="mt-4 text-center text-red-500">
                You have a pending payment. Please complete it to finish your
                order.
              </div>
            </Link>
          )}
        </div>

        <div className="mx-10 border xl:col-span-1 lg:col-span-3 col-span-3">
          <h2 className="p-3 bggray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal : <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery : <span>Rp10.000</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (5000) :{" "}
              <span>
                {"Rp" + (totalCartItem * 5000).toLocaleString("id-ID")}
              </span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total : <span>{calculateTotalAmount()}</span>
            </h2>

            {paymentPending ? (
              <Button onClick={reopenPaymentPopup} className="mt-4">
                Pending Payment <ArrowBigRight />
              </Button>
            ) : (
              <Button
                onClick={onApprove}
                disabled={!(username && email && zip && address)}
              >
                Payment <ArrowBigRight />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
