"use client";

import { apiRequest } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

type Customer = {
  uuid: string;
  fullName: string;
  email: string;
};

type Account = {
  uuid: string;
  accountNumber: number;
  accountType: string;
  balance: number;
  customer: Customer;
  createdAt: string;
  status: "ACTIVE" | "INACTIVE";
};

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await apiRequest("/accounts");
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Accounts</h2>
          <p className="text-sm text-slate-500">
            View and manage customer accounts
          </p>
        </div>

        <Link
          href="/accounts/add"
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          <IoIosAdd size={20} />
          Add Account
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-600">Customer</th>
              <th className="px-6 py-3 font-medium text-slate-600">
                Account No.
              </th>
              <th className="px-6 py-3 font-medium text-slate-600">Type</th>
              <th className="px-6 py-3 font-medium text-slate-600 text-right">
                Balance
              </th>
              <th className="px-6 py-3 font-medium text-slate-600">Created</th>
              <th className="px-6 py-3 font-medium text-slate-600">Status</th>
              <th className="px-6 py-3 font-medium text-right text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {accounts.map((account) => (
              <tr key={account.uuid} className="hover:bg-slate-50 transition">
                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {account.customer.fullName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {account.customer.email}
                  </div>
                </td>

                {/* Account Number */}
                <td className="px-6 py-4 font-mono text-slate-700">
                  {account.accountNumber}
                </td>

                {/* Account Type */}
                <td className="px-6 py-4 text-slate-500">
                  {account.accountType}
                </td>

                {/* Balance */}
                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                  {account.balance.toLocaleString()}
                </td>

                {/* Created */}
                <td className="px-6 py-4 text-slate-500">
                  {account.createdAt}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      account.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        account.status === "ACTIVE"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    />
                    {account.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/accounts/${account.uuid}`}
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
