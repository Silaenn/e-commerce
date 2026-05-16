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
        console.log(resp.data.user);
        console.log(resp.data.jwt);
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
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-primary/10 w-full max-w-md space-y-8">
        <Link href="/">
          <Image src="/logo.png" width={150} height={150} alt="logo" className="hover:opacity-80 transition-opacity" />
        </Link>

        <div className="text-center space-y-2">
          <h2 className="font-bold text-4xl tracking-tighter text-primary">Create Account</h2>
          <p className="text-muted-foreground font-medium">
            Join our community for fresh, curated essentials.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="space-y-2">
            <Input
              placeholder="Username"
              className="rounded-2xl h-14 px-6 bg-secondary/20 border-transparent focus:bg-background focus:border-primary/20 transition-all"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            onClick={() => onCreateAccount()}
            disabled={!(username || email || password) || loader}
          >
            {loader ? (
              <LoaderIcon className="animate-spin h-6 w-6" />
            ) : (
              "Create an Account"
            )}
          </Button>

          <p className="text-center text-sm font-medium text-muted-foreground mt-4">
            Already have an account? {""}
            <Link href="/sign-in" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
