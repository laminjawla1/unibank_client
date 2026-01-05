"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingScreen from "./components/ui/LoadingScreen";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      login(tokenFromCookie, { name: "User" });
    }
    setLoadingAuth(false);
  }, [login]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!loadingAuth && !token) {
      router.push("/auth/login");
    }
  }, [token, loadingAuth, router]);

  // While checking cookie, render nothing
  if (loadingAuth || !token) return <LoadingScreen />;
  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="p-4 sm:ml-64 mt-14">
        <div className="p-4 rounded-base">{children}</div>
      </div>
    </>
  );
};

export default Layout;
