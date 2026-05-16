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

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);

    GlobalApi.signInUser(email, password).then(
      (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast("Login Successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        console.log(e);
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-primary/10 w-full max-w-md space-y-8">
        <Link href="/">
          <Image src="/logo.png" width={150} height={150} alt="logo" className="hover:opacity-80 transition-opacity" />
        </Link>

        <div className="text-center space-y-2">
          <h2 className="font-bold text-4xl tracking-tighter text-primary">Sign In</h2>
          <p className="text-muted-foreground font-medium">
            Welcome back! Let's get you some fresh groceries.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="space-y-2">
            <Input
              placeholder="name@example.com"
              className="rounded-2xl h-14 px-6 bg-secondary/20 border-transparent focus:bg-background focus:border-primary/20 transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              className="rounded-2xl h-14 px-6 bg-secondary/20 border-transparent focus:bg-background focus:border-primary/20 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button
            className="w-full h-14 rounded-2xl text-lg font-bold bg-primary text-background hover:scale-[1.02] transition-transform shadow-xl shadow-primary/10 mt-4"
            onClick={() => onSignIn()}
            disabled={!(email || password) || loader}
          >
            {loader ? (
              <LoaderIcon className="animate-spin h-6 w-6" />
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-center text-sm font-medium text-muted-foreground mt-4">
            Don't have an account? {""}
            <Link href="/create-account" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
