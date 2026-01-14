"use client";

import { apiRequest } from "@/lib/api";
import RequireRole from "@/components/RequireRole";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export type Role = {
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
};

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await apiRequest("/roles");
        setRoles(data);
      } catch (error) {
        console.log(error);
        console.error("Error fetching roles: ", error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <RequireRole anyOf={["ROLE_ADMIN"]}>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Roles & Permissions
          </h2>
          <p className="text-sm text-slate-500">
            Define access levels and user responsibilities
          </p>
        </div>

        <Link
          href="/roles/add"
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          <IoIosAdd size={20} />
          Add Role
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-600">
                Role Name
              </th>
              <th className="px-6 py-3 font-medium text-slate-600">Created</th>
              <th className="px-6 py-3 font-medium text-slate-600">Updated</th>
              <th className="px-6 py-3 font-medium text-slate-600">Status</th>
              <th className="px-6 py-3 font-medium text-right text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {roles.map((role) => (
              <tr key={role.uuid} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {role.name}
                </td>

                <td className="px-6 py-4 text-slate-500">{role.createdAt}</td>

                <td className="px-6 py-4 text-slate-500">{role.updatedAt}</td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      role.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        role.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    {role.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline"
                  >
                    Edit
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

export default Roles;
