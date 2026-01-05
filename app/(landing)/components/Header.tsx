"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  onToggleSidebar: () => void;
};

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            aria-expanded={false}
            type="button"
            className="sm:hidden rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:ring-2 focus:ring-slate-300"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h10"
              />
            </svg>
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              width={28}
              height={28}
              src="/logos/bank.jpg"
              alt="UniBank"
              className="rounded"
            />
            <span className="text-lg font-semibold text-slate-800">
              UNiBANK
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full focus:ring-2 focus:ring-slate-300"
          >
            <Image
              width={32}
              height={32}
              src="/profile.png"
              alt="User"
              className="rounded-full"
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-semibold text-slate-800">
                  Neil Sims
                </p>
                <p className="text-xs text-slate-500 truncate">
                  neil.sims@flowbite.com
                </p>
              </div>

              <ul className="py-1 text-sm text-slate-600">
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-slate-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-slate-100"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/earnings"
                    className="block px-4 py-2 hover:bg-slate-100"
                  >
                    Earnings
                  </Link>
                </li>
                <li className="border-t border-slate-200">
                  <Link
                    href="/auth/logout"
                    className="block px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
