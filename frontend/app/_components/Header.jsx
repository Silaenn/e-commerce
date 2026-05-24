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
  const { setSearch } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState([]);
  const { user, jwt } = useAuth();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();
  const [subtotal, setSubTotal] = useState(0);
  const params = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const disabled = params == "/"; // Hapus logika ini

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

  const onDeleteItem = async (id) => {
    if (!jwt) {
      toast("Please sign in to remove items.");
      return;
    }

    try {
      await GlobalApi.deleteCartItems(id, jwt);
      setCartItemList((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        setTotalCartItem(updated.length);
        return updated;
      });
      setUpdateCart((prev) => !prev);
      toast("Item removed!");
    } catch (error) {
      console.error(
        "DEBUG: Failed to delete cart item:",
        error.response?.data || error.message
      );
      toast("Failed to remove item. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearch(searchInput);
      router.push(`/search?q=${searchInput}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="py-4 px-5 sm:px-8 md:px-12 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b w-full"
    >
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 sm:gap-8 flex-1">
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
              className="hidden xl:flex gap-2 items-center text-sm font-black cursor-pointer transition-colors uppercase tracking-[0.2em]"
            >
              <LayoutGrid className="h-5 w-5 text-primary" />
              Explore
            </motion.h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl p-2 min-w-[240px] bg-white shadow-2xl border border-green-100">
            <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400 p-4">Categories</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-green-50" />
            {category.map((c, index) => (
              <Link
                key={index}
                href={"/products-category/" + c.name}
              >
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer rounded-xl p-3 font-bold text-gray-600">
                  <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                        c?.image?.url || ""
                      }`}
                      alt={c?.name || "icon"}
                      width={25}
                      height={25}
                      unoptimized={true}
                    />
                  </div>
                  <h2 className="text-sm">{c?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <motion.div 
          className="hidden md:flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-3 border border-gray-100 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-green-900/5 transition-all w-full max-w-xl"
        >
          <Search className="h-5 w-5 text-primary/40" />
          <input
            type="text"
            placeholder="Search fresh groceries, organic veggies..."
            className="bg-transparent outline-none text-sm w-full font-bold placeholder:text-gray-300 placeholder:font-medium"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </motion.div>
      </div>
      
      <div className="flex gap-4 sm:gap-8 items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden flex items-center justify-center text-gray-900 hover:text-primary transition-colors"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-6 w-6" />
        </motion.button>
        <Sheet>
          <SheetTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex gap-2 items-center text-lg relative group"
            >
              <ShoppingBasket className="h-6 w-6 sm:h-7 sm:w-7 text-gray-900 group-hover:text-primary transition-colors" />
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

          <SheetContent className="rounded-l-[1.5rem] sm:rounded-l-[2rem] bg-white shadow-2xl border-l p-0 flex flex-col h-full overflow-hidden w-full sm:w-[380px] max-w-full">
            <SheetHeader className="px-4 sm:px-8 pt-10 sm:pt-14 pb-3 sm:pb-4 relative flex flex-col flex-1 min-h-0">
              <SheetTitle className="bg-primary text-white font-extrabold text-base sm:text-xl p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg shadow-green-900/10">
                Your Shopping Cart
              </SheetTitle>
              <SheetDescription asChild>
                <div className="flex-1 min-h-0 overflow-y-auto mt-3 sm:mt-4 pr-1">
                  <CartItemList
                    cartItemList={cartItemList}
                    onDeleteItem={onDeleteItem}
                  />
                </div>
              </SheetDescription>
            </SheetHeader>

            <div className="mt-auto px-4 sm:px-8 py-4 sm:py-6 bg-gray-50/50 border-t shrink-0">
              <div className="flex flex-col gap-3 sm:gap-6">
                <div className="flex justify-between items-center bg-white px-4 py-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-green-100/50">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                    Subtotal
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-primary">
                    Rp{subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <SheetClose asChild>
                  <Button
                    className="h-12 sm:h-16 rounded-full text-base sm:text-lg font-black shadow-xl shadow-green-900/20 w-full"
                    disabled={subtotal === 0}
                    onClick={() => router.push(jwt ? "/checkout" : "sign-in")}
                  >
                    Go to Checkout
                  </Button>
                </SheetClose>
              </div>
            </div>
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
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-1">
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-3 border border-gray-100 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-green-900/5 transition-all">
                <Search className="h-5 w-5 text-primary/40" />
                <input
                  type="text"
                  placeholder="Search fresh groceries..."
                  className="bg-transparent outline-none text-sm w-full font-bold placeholder:text-gray-300 placeholder:font-medium"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
