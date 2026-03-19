"use client";

import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Fetch orders API
  const fetchOrders = async (status = "packing") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/order/status/${status}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]); // safety
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]); // safety
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial fetch & auto refresh on page navigation
  useEffect(() => {
    fetchOrders("packing");
  }, [pathname]);

  // ✅ DataGrid columns
  const columns = [
    { field: "id", headerName: "Order ID", width: 230 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "paymentMethod", headerName: "Payment Method", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        return (
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    { field: "total", headerName: "Total Amount", width: 120 },
    { field: "orderStatus", headerName: "Order Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() =>
            router.push(`/admin/order/orderdetails/${params.row.fullId}`)
          }
          className="text-blue-600 font-semibold hover:underline"
        >
          View Order
        </button>
      ),
    },
  ];

const rows = orders
  .filter(order => order.orderStatus === "packing") // 🔥 only placed orders
  .map(order => ({
    id: order._id,
    fullId: order._id,
    name: `${order.customer?.firstName ?? ""} ${order.customer?.lastName ?? ""}`,
    phone: order.customer?.phone ?? "",
    paymentMethod: order.paymentMethod?.toUpperCase() ?? "",
    paymentStatus: order.paymentStatus ?? "",
    total: `₹${order.totalAmount ?? 0}`,
    orderStatus: order.orderStatus ? order.orderStatus.replaceAll("_", " ") : "",
  }));

  return (
    <div className="px-4">
      <h1 className="text-xl font-semibold mb-4">Packing Orders</h1>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}