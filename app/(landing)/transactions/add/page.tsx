"use client";

import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../../users/page";
import { Account } from "../page";

type TransactionType = {
  uuid: string;
  transactionType: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
};

const AddTransaction = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const accountsData = await apiRequest("/accounts");
      const transactionTypesData = await apiRequest("/transactions/types");
      const usersData = await apiRequest("/users");

      setAccounts(accountsData);
      setTransactionTypes(transactionTypesData);
      setUsers(usersData);
    };

    fetchData();
  }, []);

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await apiRequest("/transactions", {
        method: "POST",
        body: {
          accountId: formData.get("accountId"),
          transactionTypeId: formData.get("transactionTypeId"),
          amount: Number(formData.get("amount")),
          performedBy: formData.get("performedBy"),
        },
      });

      router.push("/transactions");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div className="max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <form onSubmit={handleFormSubmission}>
        {/* Header */}
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Add Transaction
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Record a deposit, withdrawal, or transfer.
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
          {/* Account */}
          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-slate-700">
              Account
            </label>
            <select
              name="accountId"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="">Select account</option>
              {accounts.map((account) => (
                <option key={account.uuid} value={account.uuid}>
                  {account.customer.fullName} — {account.accountNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Transaction Type
            </label>
            <select
              name="transactionTypeId"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="">Select type</option>
              {transactionTypes.map((transactionType) => (
                <option key={transactionType.uuid} value={transactionType.uuid}>
                  {transactionType.transactionType}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Amount (D)
            </label>
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
              placeholder="0.00"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* Performed By */}
          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-slate-700">
              Performed By
            </label>
            <select
              name="performedBy"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.uuid} value={user.uuid}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <Link
            href="/transactions"
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            Create Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
