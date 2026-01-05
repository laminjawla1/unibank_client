"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

const Logout = () => {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    logout();
    router.replace("/auth/login");
  }, [logout, router]);

  return null;
};

export default Logout;
