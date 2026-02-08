"use client";

import {
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

/* ===== TOP STATS ===== */
const stats = [
  { title: "Total Orders", value: "1,245", icon: FaShoppingCart },
  { title: "Total Products", value: "320", icon: FaBoxOpen },
  { title: "Total Users", value: "890", icon: FaUsers },
  { title: "Total Revenue", value: "₹2,45,600", icon: FaRupeeSign },
];

/* ===== 12 MONTH REVENUE DATA ===== */
const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 26000 },
  { month: "Jun", revenue: 30000 },
  { month: "Jul", revenue: 28000 },
  { month: "Aug", revenue: 32000 },
  { month: "Sep", revenue: 27000 },
  { month: "Oct", revenue: 35000 },
  { month: "Nov", revenue: 40000 },
  { month: "Dec", revenue: 45000 },
];

/* ===== ORDER STATUS DATA ===== */
const orderStatusData = [
  { status: "Pending", count: 120 },
  { status: "Shipped", count: 340 },
  { status: "Delivered", count: 620 },
  { status: "Failed", count: 45 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">
                {item.value}
              </p>
            </div>

            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <item.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* MONTHLY REVENUE GRAPH */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">
            Monthly Revenue (12 Months)
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ORDER STATUS GRAPH */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">
            Order Status Overview
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
