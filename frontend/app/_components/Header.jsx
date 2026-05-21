"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBasket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import useAuth from "../_context/useAuth";
import { SearchContext } from "../_context/SearchContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { search, setSearch, setSearchResults } = useContext(SearchContext);
  const [category, setCategory] = useState([]);
  const { user, jwt } = useAuth();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();
  const [subtotal, setSubTotal] = useState(0);
  const params = usePathname();
  const disabled = params == "/";

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  useEffect(() => {
    getCategoryList();
    if (user && jwt) {
      getCartItems();
    }
  }, [user, jwt, updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategory(resp.data.data);
    });
  };

  const getCartItems = async () => {
    if (user && user.id && jwt) {
      try {
        const cartItemList = await GlobalApi.getCartItems(user.id, jwt);
        setTotalCartItem(cartItemList?.length);
        setCartItemList(cartItemList);
      } catch (error) {
        console.error("DEBUG: Failed to fetch cart items:", error.response?.data || error.message);
      }
    }
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItems(id, jwt).then((res) => {
      toast("Item removed!");
      getCartItems();
    });
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
    }
  };

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 px-6 md:px-12 lg:px-24 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b flex justify-between items-center"
    >
      <div className="flex items-center gap-10">
        <Link href={"/"}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image
              src="/logo.png"
              alt="logo"
              width={130}
              height={80}
              className="cursor-pointer"
            />
          </motion.div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.h2 
              whileHover={{ color: "#22c55e" }}
              className="hidden md:flex gap-2 items-center text-sm font-bold cursor-pointer transition-colors uppercase tracking-widest"
            >
              Explore
            </motion.h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl p-2 min-w-[200px] bg-white shadow-2xl border">
            <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-gray-400 pb-2">Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((c, index) => (
              <Link
                key={index}
                href={"/products-category/" + c.name}
              >
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer rounded-xl p-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                      c?.image?.url || ""
                    }`}
                    alt={c?.name || "icon"}
                    width={25}
                    height={25}
                    unoptimized={true}
                  />
                  <h2 className="text-sm font-bold">{c?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <motion.div 
          initial={{ width: "300px" }}
          whileFocus={{ width: "400px" }}
          className="hidden md:flex items-center gap-3 bg-gray-100 rounded-full px-5 py-2 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all"
        >
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for items..."
            className="bg-transparent outline-none text-sm w-full font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
        </motion.div>
      </div>
      
      <div className="flex gap-6 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex gap-2 items-center text-lg relative group"
            >
              <ShoppingBasket className="h-7 w-7 text-gray-900 group-hover:text-primary transition-colors" />
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={totalCartItem}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full"
                >
                  {totalCartItem}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </SheetTrigger>
          <SheetContent className="rounded-l-[2rem] bg-white shadow-2xl border-l">
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-3 rounded-xl mb-4">
                Your Shopping Cart
              </SheetTitle>
              <SheetDescription asChild>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="flex flex-col absolute w-[90%] bottom-6">
                <h2 className="text-xl font-bold flex justify-between p-4 bg-gray-50 rounded-2xl mb-4">
                  Subtotal <span>Rp{subtotal.toLocaleString("id-ID")}</span>
                </h2>
                <Button
                  className="h-14 rounded-full text-lg font-bold shadow-xl shadow-green-900/10"
                  disabled={subtotal === 0}
                  onClick={() => router.push(jwt ? "/checkout" : "sign-in")}
                >
                  Go to Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!jwt ? (
          <Link href={"/sign-in"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="rounded-full px-8 font-bold">Login</Button>
            </motion.div>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <CircleUserRound className="h-6 w-6 text-primary" />
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl min-w-[180px] bg-white shadow-2xl border p-2">
              <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-gray-400 pb-2">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer rounded-xl p-3 font-bold">Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem className="cursor-pointer rounded-xl p-3 font-bold">My order</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSignOut()} className="text-red-500 cursor-pointer rounded-xl p-3 font-bold focus:bg-red-50 focus:text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
