"use client";

import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import RequireRole from "@/components/RequireRole";
import { toast } from "react-toastify";

const AddCustomer = () => {
  const router = useRouter();

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await apiRequest("/customers", {
        method: "POST",
        body: {
          fullName: formData.get("fullName"),
          dob: formData.get("dob"),
          phoneNumber: formData.get("phoneNumber"),
          email: formData.get("email"),
          address: formData.get("address"),
          nationalId: formData.get("nationalId"),
        },
      });

      toast.success("Customer created successfully!");
      router.push("/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <RequireRole anyOf={["ROLE_ADMIN", "ROLE_TELLER"]}>
      <div className="max-w-4xl bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form onSubmit={handleFormSubmission}>
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Add Customer
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter customer personal and contact details
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-6">
            {/* Full Name */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>

            {/* Date of Birth */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>

            {/* Phone Number */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                type="tel"
                required
                placeholder="+220 xxx xxxx"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                name="address"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>

            {/* National ID */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                National ID
              </label>
              <input
                name="nationalId"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-end gap-x-4">
            <Link
              href="/customers"
              className="text-sm font-medium text-slate-600 hover:text-slate-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </RequireRole>
  );
};

export default AddCustomer;
