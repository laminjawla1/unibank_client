"use client";

import { useEffect, useState } from "react";
import DashboardCard from "../components/ui/DashboardCard";
import { apiRequest } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  HiOutlineUsers,
  HiOutlineCreditCard,
  HiOutlineUserGroup,
  HiOutlineArrowsRightLeft,
  HiOutlineArrowDownCircle,
  HiOutlineArrowUpCircle,
} from "react-icons/hi2";
import { formatCurrency } from "../transactions/page";

type DashboardData = {
  accountsCount?: number;
  customersCount?: number;
  usersCount?: number;
  transactionsTotal?: number;
  depositsCount?: number;
  withdrawalsCount?: number;
};

const Page = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiRequest("/reports/dashboard");
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare chart data
  const chartData = [
    {
      name: "Transactions",
      Deposits: dashboardData.depositsCount ?? 0,
      Withdrawals: dashboardData.withdrawalsCount ?? 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Customers"
          value={dashboardData.customersCount ?? 0}
          subtitle="Total registered"
          icon={<HiOutlineUsers size={24} />}
          bgColor="bg-blue-50"
        />

        <DashboardCard
          title="Accounts"
          value={dashboardData.accountsCount ?? 0}
          subtitle="Active accounts"
          icon={<HiOutlineCreditCard size={24} />}
          bgColor="bg-orange-50"
        />

        <DashboardCard
          title="Users"
          value={dashboardData.usersCount ?? 0}
          subtitle="System users"
          icon={<HiOutlineUserGroup size={24} />}
          bgColor="bg-purple-50"
        />

        <DashboardCard
          title="Deposits"
          value={dashboardData.depositsCount ?? 0}
          subtitle="Successful deposits"
          icon={<HiOutlineArrowDownCircle size={24} />}
          bgColor="bg-green-50"
        />

        <DashboardCard
          title="Withdrawals"
          value={dashboardData.withdrawalsCount ?? 0}
          subtitle="Completed withdrawals"
          icon={<HiOutlineArrowUpCircle size={24} />}
          bgColor="bg-red-50"
        />

        <DashboardCard
          title="Transactions"
          value={formatCurrency(dashboardData.transactionsTotal || 0)}
          subtitle="Total value"
          icon={<HiOutlineArrowsRightLeft size={24} />}
          bgColor="bg-amber-50"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Deposits vs Withdrawals
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Deposits" fill="#10b981" name="Deposits" />
            <Bar dataKey="Withdrawals" fill="#ef4444" name="Withdrawals" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;
