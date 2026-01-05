"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Role } from "../../roles/page";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

const AddUser = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      apiRequest("/roles")
        .then((data) => {
          setRoles(data);
        })
        .catch((error) => {
          console.error("Error fetching roles: ", error);
        });
    };
    fetchRoles();
  }, []);

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await apiRequest("/users", {
        method: "POST",
        body: {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          username: formData.get("username"),
          password: formData.get("password"),
          roleIds: formData.getAll("roleIds"),
        },
      });
      router.push("/users");
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };
  return (
    <div className="max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <form onSubmit={handleFormSubmission}>
        {/* Header */}
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Add User</h2>
          <p className="text-sm text-slate-500 mt-1">
            Create a new user and assign a role
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          {/* First Name */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              First name
            </label>
            <input
              name="firstName"
              type="text"
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* Last Name */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Last name
            </label>
            <input
              name="lastName"
              type="text"
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* Username */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* Password */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {/* Role */}
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Roles
            </label>
            <select
              multiple
              name="roleIds"
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="">Select roles</option>
              {roles.map((role) => (
                <option key={role.uuid} value={role.uuid}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-x-4">
          <Link
            href="/users"
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
