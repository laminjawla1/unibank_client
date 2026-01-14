"use client";

import { create } from "zustand";
import Cookies from "js-cookie";

const USER_STORAGE_KEY = "unibank_user";

const loadStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const storeUser = (user: any | null) => {
  try {
    if (!user) {
      localStorage.removeItem(USER_STORAGE_KEY);
    } else {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  } catch {
    // ignore storage failures
  }
};

interface AuthState {
  token: string | null;
  user: any | null;
  login: (token: string, user: any) => void;
  setUser: (user: any | null) => void;
  logout: () => void;
}

let logoutTimer: NodeJS.Timeout | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  token: Cookies.get("token") || null,
  user: typeof window !== "undefined" ? loadStoredUser() : null,
  login: (token, user) => {
    set({ token, user });

    storeUser(user);

    Cookies.set("token", token, { expires: 1 / 48, path: "/" });

    if (logoutTimer) clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => get().logout(), 30 * 60 * 1000);
  },
  setUser: (user) => {
    set({ user });
    storeUser(user);
  },
  logout: () => {
    set({ token: null, user: null });
    Cookies.remove("token", { path: "/" });
    storeUser(null);
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
