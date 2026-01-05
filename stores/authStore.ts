"use client";

import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  user: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

let logoutTimer: NodeJS.Timeout | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  token: Cookies.get("token") || null,
  user: null,
  login: (token, user) => {
    set({ token, user });

    Cookies.set("token", token, { expires: 1 / 48, path: "/" });

    if (logoutTimer) clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => get().logout(), 30 * 60 * 1000);
  },
  logout: () => {
    set({ token: null, user: null });
    Cookies.remove("token", { path: "/" });
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      logoutTimer = null;
    }
  },
}));

const token = Cookies.get("token");
if (token) {
  logoutTimer = setTimeout(() => {
    useAuthStore.getState().logout();
  }, 30 * 60 * 1000);
}
