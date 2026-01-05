"use client";

import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  // Auto login if token exists in cookies
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Optionally fetch user from backend or use placeholder
      login(token, { name: "User" });
      router.push("/dashboard");
    }
  }, [login, router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/users/login", {
        method: "POST",
        body: { username, password },
      });

      login(data.token, data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Oops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <form className="flex flex-col space-y-6" onSubmit={handleLogin}>
          <h1 className="text-center text-2xl font-bold text-slate-800">
            Sign In
          </h1>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {/* Username */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Enter your username"
              className="p-3 rounded-md bg-slate-100 border border-slate-300 text-slate-800
                            focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="p-3 rounded-md bg-slate-100 border border-slate-300 text-slate-800
                            focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className={`
                text-white py-3 rounded-md text-lg font-semibold active:scale-[0.98] transition
                ${
                  loading
                    ? "bg-slate-600 cursor-not-allowed hover:bg-slate-500"
                    : "bg-black hover:bg-slate-800"
                }
            `}
          >
            {loading ? "LOGGING IN" : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
