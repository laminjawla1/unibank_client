"use client";

import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RequireRole from "@/components/RequireRole";

type Customer = {
  uuid: string;
  fullName: string;
  email: string;
};

type AccountType = {
  uuid: string;
  type: string;
};

const AddAccount = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await apiRequest("/customers");
      const accountTypesData = await apiRequest("/accounts/types");

      setCustomers(customersData);
      setAccountTypes(accountTypesData);
    };

    fetchData();
  }, []);

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await apiRequest("/accounts", {
        method: "POST",
        body: {
          customerId: formData.get("customerId"),
          accountTypeId: formData.get("accountTypeId"),
          initialBalance: Number(formData.get("initialBalance")),
        },
      });

      router.push("/accounts");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <RequireRole anyOf={["ROLE_ADMIN", "ROLE_TELLER"]}>
      <div className="max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form onSubmit={handleFormSubmission}>
        {/* Header */}
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Add Account</h2>
          <p className="text-sm text-slate-500 mt-1">
            Create a new account for an existing customer.
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-6">
          {/* Customer */}
          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-slate-700">
              Customer
            </label>
            <select
              name="customerId"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="">Select customer</option>
              {customers.map((customer) => (
                <option key={customer.uuid} value={customer.uuid}>
                  {customer.fullName} ({customer.email})
                </option>
              ))}
            </select>
          </div>

          {/* Account Type */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Account Type
            </label>
            <select
              name="accountTypeId"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="">Select account type</option>
              {accountTypes.map((type) => (
                <option key={type.uuid} value={type.uuid}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          {/* Initial Balance */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Initial Balance
            </label>
            <input
              name="initialBalance"
              type="number"
              min="0"
              step="0.01"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-x-4">
          <Link
            href="/accounts"
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            Create Account
          </button>
        </div>
        </form>
      </div>
    </RequireRole>
  );
};

export default AddAccount;
