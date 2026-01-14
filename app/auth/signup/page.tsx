"use client";

import UserRegistrationForm from "@/components/UserRegistrationForm";
import RequireRole from "@/components/RequireRole";
import { useAuthStore } from "@/stores/authStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "@/app/(landing)/components/ui/LoadingScreen";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const login = useAuthStore((s) => s.login);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      login(tokenFromCookie, { name: "User" });
    }
    setLoadingAuth(false);
  }, [login]);

  useEffect(() => {
    // Do not auto-redirect anonymous users; show a helpful message instead.
  }, [loadingAuth, token, router]);

  if (loadingAuth) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {!token ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              UniBank user accounts are created by an Admin or Teller. If you
              don’t have an account yet, please contact your supervisor.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Go to sign in
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <RequireRole anyOf={["ROLE_ADMIN", "ROLE_TELLER"]}>
            <UserRegistrationForm
              title="Sign Up"
              description="Create a new UniBank user account (Admin/Teller only)"
              cancelHref="/dashboard"
              successRedirectHref="/users"
              submitLabel="Create Account"
            />
          </RequireRole>
        )}
      </div>
    </div>
  );
}
