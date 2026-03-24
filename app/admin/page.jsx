"use client";

import React, { useEffect, useState } from "react";
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

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const [orderRes, productRes] = await Promise.all([
        fetch("/api/order"),
        fetch("/api/product"),
      ]);

      if (!orderRes.ok || !productRes.ok) {
        throw new Error("API failed");
      }

      const ordersData = await orderRes.json();
      const productsData = await productRes.json();

      const orders = Array.isArray(ordersData)
        ? ordersData
        : ordersData.orders || ordersData.data || [];

      const products = Array.isArray(productsData)
        ? productsData
        : productsData.products || productsData.data || [];

      /* ===== CALCULATIONS ===== */
      const totalOrders = orders.length;
      const totalProducts = products.length;

      const totalRevenue = orders.reduce(
        (sum, item) => sum + (item.totalAmount || 0),
        0
      );

      /* ===== ORDER STATUS ===== */
      const statusList = [
        "placed",
        "packing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ];

      const statusMap = {};
      statusList.forEach((status) => {
        statusMap[status] = 0;
      });

      orders.forEach((order) => {
        const status = order.orderStatus?.toLowerCase().trim();
        if (statusMap.hasOwnProperty(status)) {
          statusMap[status]++;
        } else {
          console.log("Unknown status:", order.orderStatus);
        }
      });

      const orderStatusData = statusList.map((status) => ({
        status: status, // keep raw DB value
        count: statusMap[status],
      }));

      /* ===== MONTHLY REVENUE ===== */
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const revenueMap = new Array(12).fill(0);

      orders.forEach((order) => {
        if (order.createdAt) {
          const month = new Date(order.createdAt).getMonth();
          revenueMap[month] += order.totalAmount || 0;
        }
      });

      const revenueData = months.map((m, i) => ({
        month: m,
        revenue: revenueMap[i],
      }));

      setData({
        totalOrders,
        totalProducts,
        totalRevenue,
        revenueData,
        orderStatusData,
      });

      setLoading(false);
    } catch (error) {
      console.error("Dashboard error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 5000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="p-5">Loading dashboard...</p>;
  }

  const stats = [
    { title: "Total Orders", value: data?.totalOrders || 0, icon: FaShoppingCart },
    { title: "Total Products", value: data?.totalProducts || 0, icon: FaBoxOpen },
    { title: "Total Users", value: "—", icon: FaUsers },
    { title: "Total Revenue", value: `₹${data?.totalRevenue || 0}`, icon: FaRupeeSign },
  ];

  return (
    <div className="space-y-6 md:p-4">

      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 -lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
            <div className="p-3 -full bg-green-100 text-green-600">
              <item.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* REVENUE */}
        <div className="bg-white p-5 -lg shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Monthly Revenue</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.revenueData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white p-5 -lg shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Order Status</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.orderStatusData || []}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="status"
                  tickFormatter={(val) =>
                    val
                      .split("_")
                      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                      .join(" ")
                  }
                  interval={0} // show all labels
                  angle={-15} // rotate if needed
                  textAnchor="center"
                />

                <YAxis />
                <Tooltip
                  labelFormatter={(val) =>
                    val
                      .split("_")
                      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                      .join(" ")
                  }
                />

                <Bar dataKey="count" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}