"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CreateAccount = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.registerUser(username, email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Account Created Successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Form Side */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center p-8 md:p-20 bg-white order-last md:order-first"
      >
        <div className="w-full max-w-sm space-y-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="inline-block">
              <Image src="/logo.png" width={140} height={140} alt="logo" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-gray-500 font-medium">Join us for a fresh shopping experience.</p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Username</label>
              <Input
                placeholder="Full Name"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary transition-all font-medium"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email</label>
              <Input
                placeholder="name@example.com"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary transition-all font-medium"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-12 border-gray-200 focus:border-primary focus:ring-primary transition-all font-medium"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button
              className="w-full h-14 rounded-xl text-lg font-bold bg-primary text-white hover:bg-green-700 transition-all shadow-lg shadow-green-900/10 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
              onClick={() => onCreateAccount()}
              disabled={!(username || email || password) || loader}
            >
              {loader ? (
                <LoaderIcon className="animate-spin h-6 w-6" />
              ) : (
                "Create Account"
              )}
            </Button>

            <p className="text-center text-gray-500 font-medium">
              Already have an account? {""}
              <Link href="/sign-in" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Visual Side */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:block relative h-full w-full bg-green-50 overflow-hidden"
      >
        <Image 
          src="/create-account.jpeg" 
          layout="fill" 
          objectFit="cover" 
          alt="Fresh Veggies"
          className="opacity-90 grayscale-[10%]"
        />
        <div className="absolute inset-0 bg-green-900/5" />
      </motion.div>
    </div>
  );
};

export default CreateAccount;
