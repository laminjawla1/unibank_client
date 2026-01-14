"use client";

import { apiRequest } from "@/lib/api";
import RequireRole from "@/components/RequireRole";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { User } from "../users/page";

type Customer = {
  uuid: string;
  fullName: string;
  email: string;
};

export type Account = {
  uuid: string;
  accountNumber: number;
  accountType: string;
  balance: number;
  customer: Customer;
  createdAt: string;
  status: "ACTIVE" | "INACTIVE";
};

type Transaction = {
  uuid: string;
  account: Account;
  amount: number;
  transactionType: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  createdAt: string;
  performedBy: User;
  status: "ACTIVE" | "INACTIVE";
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await apiRequest("/transactions");
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const formatCurrency = (amount: number) => `D ${amount.toLocaleString()}`;

  const formatDate = (date: string) => new Date(date).toLocaleString();

  const typeStyles = {
    DEPOSIT: "bg-green-100 text-green-700",
    WITHDRAWAL: "bg-red-100 text-red-700",
    TRANSFER: "bg-blue-100 text-blue-700",
  };

  return (
    <RequireRole anyOf={["ROLE_ADMIN", "ROLE_TELLER", "ROLE_FINANCE"]}>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Transactions</h2>
          <p className="text-sm text-slate-500">
            View and manage customer transactions
          </p>
        </div>

        <Link
          href="/transactions/add"
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          <IoIosAdd size={20} />
          Add Transaction
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Account No.</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Performed By</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {transactions.map((tx) => (
              <tr key={tx.uuid} className="hover:bg-slate-50 transition">
                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {tx.account.customer.fullName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {tx.account.customer.email}
                  </div>
                </td>

                {/* Account */}
                <td className="px-6 py-4 font-mono">
                  {tx.account.accountNumber}
                </td>

                {/* Transaction Type */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      typeStyles[tx.transactionType]
                    }`}
                  >
                    {tx.transactionType}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    tx.transactionType === "DEPOSIT"
                      ? "text-green-700"
                      : tx.transactionType === "WITHDRAWAL"
                      ? "text-red-700"
                      : "text-slate-800"
                  }`}
                >
                  {tx.transactionType === "WITHDRAWAL" ? "-" : "+"}
                  {formatCurrency(tx.amount)}
                </td>

                {/* Created */}
                <td className="px-6 py-4 text-slate-500">
                  {formatDate(tx.createdAt)}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      tx.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        tx.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    {tx.status}
                  </span>
                </td>

                {/* Performed By */}
                <td className="px-6 py-4 text-slate-500">
                  {tx.performedBy.firstName} {tx.performedBy.lastName}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/transactions/${tx.uuid}`}
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
    </RequireRole>
  );
};

export default Transactions;
