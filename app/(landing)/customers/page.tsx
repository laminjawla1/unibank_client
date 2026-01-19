"use client";

import { apiRequest } from "@/lib/api";
import RequireRole from "@/components/RequireRole";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export type Customer = {
  uuid: string;
  fullName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationalId: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
};

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await apiRequest("/customers");
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  return (
    <RequireRole anyOf={["ROLE_ADMIN", "ROLE_TELLER"]}>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Customers</h2>
            <p className="text-sm text-slate-500">
              View and manage registered customers
            </p>
          </div>

          <Link
            href="/customers/add"
            className="inline-flex items-center gap-1.5 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            <IoIosAdd size={20} />
            Add Customer
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-600">
                  Customer
                </th>
                <th className="px-6 py-3 font-medium text-slate-600">Phone</th>
                <th className="px-6 py-3 font-medium text-slate-600">
                  National ID
                </th>
                <th className="px-6 py-3 font-medium text-slate-600">
                  Created
                </th>
                <th className="px-6 py-3 font-medium text-slate-600">Status</th>
                <th className="px-6 py-3 font-medium text-right text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {customers.map((customer) => (
                <tr
                  key={customer.uuid}
                  className="hover:bg-slate-50 transition"
                >
                  {/* Customer Identity */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {customer.fullName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {customer.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">{customer.phoneNumber}</td>

                  <td className="px-6 py-4 text-slate-500">
                    {customer.nationalId}
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {new Date(customer.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          customer.status === "ACTIVE"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      />
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/customers/${customer.uuid}`}
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

export default Customers;
