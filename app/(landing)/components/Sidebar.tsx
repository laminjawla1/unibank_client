"use client";

import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { PiUsersLight } from "react-icons/pi";
import { SiWebauthn } from "react-icons/si";
import { useAuthStore } from "@/stores/authStore";
import { hasAnyRole } from "@/lib/authz";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const sidebarIconClass =
  "shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand";
const sidebarItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <AiOutlineDashboard className={sidebarIconClass} />,
  },
  {
    href: "/accounts",
    label: "Accounts",
    icon: <MdOutlineAccountBalanceWallet className={sidebarIconClass} />,
    roles: ["ROLE_ADMIN", "ROLE_TELLER"],
  },
  {
    href: "/customers",
    label: "Customers",
    icon: <GoPeople className={sidebarIconClass} />,
    roles: ["ROLE_ADMIN", "ROLE_TELLER"],
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: <GrTransaction className={sidebarIconClass} />,
    roles: ["ROLE_ADMIN", "ROLE_TELLER", "ROLE_FINANCE"],
  },
  {
    href: "/roles",
    label: "Roles",
    icon: <SiWebauthn className={sidebarIconClass} />,
    roles: ["ROLE_ADMIN"],
  },
  {
    href: "/users",
    label: "Users",
    icon: <PiUsersLight className={sidebarIconClass} />,
    roles: ["ROLE_ADMIN", "ROLE_TELLER"],
  },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const user = useAuthStore((s) => s.user);
  const visibleItems = sidebarItems.filter((item: any) => {
    if (!item.roles) return true;
    return hasAnyRole(user, item.roles);
  });

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 w-64 h-full transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-e border-slate-300">
          <ul className="space-y-2 font-medium">
            {visibleItems.map((item: any) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center px-2 py-1.5 text-slate-600 rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                >
                  {item.icon}
                  <span className="ms-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
