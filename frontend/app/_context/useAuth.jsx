"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = sessionStorage.getItem("user");
        const storedJwt = sessionStorage.getItem("jwt");

        if (storedUser && storedJwt) {
          setUser(JSON.parse(storedUser));
          setJwt(storedJwt);
        }
      } catch (error) {
        console.error("Error parsing user from sessionStorage", error);
      }
    }
  }, []);

  return { user, setUser, jwt, setJwt };
}
