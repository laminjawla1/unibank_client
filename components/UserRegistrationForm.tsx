"use client";

import { apiRequest } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Role = {
  uuid: string;
  name: string;
};

type Props = {
  title?: string;
  description?: string;
  cancelHref: string;
  successRedirectHref: string;
  submitLabel?: string;
};

export default function UserRegistrationForm({
  title = "Add User",
  description = "Create a new user and assign a role",
  cancelHref,
  successRedirectHref,
  submitLabel = "Save User",
}: Props) {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiRequest("/roles")
      .then((data) => {
        setRoles(data);
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : "Error fetching roles";
        setError(message);
      });
  }, []);

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    setLoading(true);
    setError("");

    try {
      await apiRequest("/users/register", {
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

      router.push(successRedirectHref);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to create user";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <form onSubmit={handleFormSubmission}>
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
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

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
            <p className="mt-1 text-xs text-slate-500">
              Must include uppercase, lowercase, digit, and special character.
            </p>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              Roles
            </label>
            <select
              multiple
              name="roleIds"
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              {roles.map((role) => (
                <option key={role.uuid} value={role.uuid}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-x-4">
          <Link
            href={cancelHref}
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Cancel
          </Link>

          <button
            disabled={loading}
            type="submit"
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-slate-600 ${
              loading
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-slate-700 hover:bg-slate-800"
            }`}
          >
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
