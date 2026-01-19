"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`
      );

      if (res.data.success) {
        setOrders(res.data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      width: 230,
    },
    {
      field: "name",
      headerName: "Name",
      width:130,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150,
    },
   {
  field: "paymentStatus",
  headerName: "Payment Status",
  width: 150,
  renderCell: (params) => {
    const status = params.value;

    return (
      <span
        className={`px-2 py-1 rounded text-sm font-medium
          ${
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

    {
      field: "total",
      headerName: "Total Amount",
      width: 120,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() =>
            router.push(`/admin/order/orderdetails/${params.row.fullId}`)
          }
          className="text-blue-600 font-semibold  hover:underline"
        >
          View Order
        </button>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id, // grid display id
    fullId: order._id,       // real id for navigation
    name: `${order.customer.firstName} ${order.customer.lastName}`,
    phone: order.customer.phone,
    paymentMethod: order.paymentMethod.toUpperCase(),
    paymentStatus: order.paymentStatus,
    total: `₹${order.totalAmount}`,
    orderStatus: order.orderStatus.replaceAll("_", " "),
  }));

  return (
    <div className="px-4">
      <h1 className="text-xl font-semibold mb-4">
      All Orders
      </h1>

      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
