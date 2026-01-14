"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingScreen from "./components/ui/LoadingScreen";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { apiRequest } from "@/lib/api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      // keep token in store; user will be resolved from /users/me
      login(tokenFromCookie, user ?? { name: "User" });
    }
    setLoadingAuth(false);
  }, [login, user]);

  useEffect(() => {
    if (!token) return;
    if (user?.roles?.length) return;

    apiRequest("/users/me")
      .then((me) => {
        setUser(me);
      })
      .catch(() => {
        // apiRequest will auto-logout on 401
      });
  }, [setUser, token, user]);

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
