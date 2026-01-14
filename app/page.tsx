"use client";

import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-600">UniBank</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Banking management for staff, simplified.
              </h1>
              <p className="mt-3 text-slate-600">
                Manage customers, accounts, and transactions securely with
                role-based access.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Create user (Admin/Teller)
              </Link>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Customers
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Register and manage customer profiles.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Accounts
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Open accounts and link them to customers.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Transactions
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Deposit/withdraw with audit-friendly history.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          UniBank • Client → API → Database
        </p>
      </main>
    </div>
  );
}
