"use client";

import { hasAnyRole } from "@/lib/authz";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  anyOf: string[];
  redirectTo?: string;
  children: React.ReactNode;
};

export default function RequireRole({
  anyOf,
  redirectTo,
  children,
}: Props) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  const allowed = hasAnyRole(user, anyOf);

  useEffect(() => {
    if (!token) return;
    if (!allowed) {
      const target =
        redirectTo ?? `/unauthorized?roles=${encodeURIComponent(anyOf.join(","))}`;
      router.replace(target);
    }
  }, [allowed, redirectTo, router, token]);

  if (!token) return null;
  if (!allowed) return null;
  return <>{children}</>;
}
