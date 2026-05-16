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
    if (user && jwt) {
      getCategoryList();
      getCartItems();
    }
  }, [user, jwt, updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategory(resp.data.data);
    });
  };

  const getCartItems = async () => {
    if (user && jwt) {
      const cartItemList = await GlobalApi.getCartItems(user.id, jwt);
      setTotalCartItem(cartItemList?.length);
      setCartItemList(cartItemList);
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
    <div className="p-4 px-6 md:px-12 lg:px-24 sticky top-0 z-50 backdrop-blur-lg bg-background/80 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-12">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={80}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center text-sm font-medium cursor-pointer hover:text-primary transition-colors">
              Categories
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl p-2 min-w-[200px]">
            <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-muted-foreground pb-2">Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((c, index) => (
              <Link
                key={index}
                href={"/products-category/" + c.name}
              >
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer rounded-xl p-3 hover:bg-secondary">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:1337"}${
                      c?.image?.url || ""
                    }`}
                    alt={c?.name || "icon"}
                    width={24}
                    height={24}
                    unoptimized={true}
                  />
                  <h2 className="text-sm font-medium">{c?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex items-center gap-3 bg-secondary/50 rounded-full px-6 py-2 w-[300px] group focus-within:bg-secondary transition-all">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket className="h-7 w-7" />{" "}
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCartItem}{" "}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="flex flex-col absolute w-[90%] bottom-6">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal <span>Rp{subtotal.toLocaleString("id-ID")}</span>
                </h2>
                <Button
                  disabled={subtotal === 0}
                  onClick={() => router.push(jwt ? "/checkout" : "sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!jwt ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="h-12 w-12 bg-green-100 cursor-pointer text-primary p-2 rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem>My order</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
