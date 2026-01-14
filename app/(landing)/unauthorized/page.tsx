"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const required = searchParams.get("roles");
  const user = useAuthStore((s) => s.user);

  const requiredRoles = required ? required.split(",").filter(Boolean) : [];
  const myRoles: string[] = Array.isArray(user?.roles) ? user.roles : [];

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-900">Access denied</h1>
      <p className="mt-2 text-sm text-slate-600">
        You’re signed in, but your account doesn’t have permission to view this
        page.
      </p>

      {requiredRoles.length > 0 && (
        <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">Required role</p>
          <p className="mt-1 text-sm text-slate-600">
            {requiredRoles.join(" or ")}
          </p>
        </div>
      )}

      {myRoles.length > 0 && (
        <div className="mt-3 text-xs text-slate-500">
          Your roles: {myRoles.join(", ")}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Back to dashboard
        </Link>
        <Link
          href="/auth/logout"
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Switch account
        </Link>
      </div>
    </div>
  );
}
