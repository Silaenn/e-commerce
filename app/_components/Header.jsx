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
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={100}
            className="cursor-pointer"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h5 w5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((c, index) => (
              <Link
                key={index}
                href={"/products-category/" + c.attributes.name}
              >
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${
                      c?.attributes?.icon?.data?.[0]?.attributes?.url || ""
                    }`}
                    alt={c?.attributes?.name || "icon"}
                    width={30}
                    height={30}
                    unoptimized={true}
                  />
                  <h2 className="text-lg">{c?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden ">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="flex gap-5 items-center">
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
