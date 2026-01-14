"use client";

import { apiRequest } from "@/lib/api";
import RequireRole from "@/components/RequireRole";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";

export type User = {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await apiRequest("/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <RequireRole anyOf={["ROLE_ADMIN", "ROLE_TELLER"]}>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Users</h2>
          <p className="text-sm text-slate-500">
            Manage system users and permissions
          </p>
        </div>

        <Link
          href="/users/add"
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          <IoIosAdd size={20} />
          Add User
        </Link>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Username</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium">Updated</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.uuid} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-slate-500">{user.createdAt}</td>
                <td className="px-6 py-4 text-slate-500">{user.updatedAt}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        user.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href="#"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline"
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

export default Users;
