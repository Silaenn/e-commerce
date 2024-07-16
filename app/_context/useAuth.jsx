"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const storedJwt = sessionStorage.getItem("jwt");

      if (!storedUser && !storedJwt) {
        router.push("/sign-in");
      } else {
        setUser(storedUser);
        setJwt(storedJwt);
      }
    }
  }, [router]);

  return { user, setUser, jwt, setJwt };
}
