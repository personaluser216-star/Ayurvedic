"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

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
    }
  };

  // 🔹 UPDATE STATUS
  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${orderId}`,
        { orderStatus: status }
      );

      if (res.data.success) {
        toast.success("Status updated");
        fetchOrders();
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className=" px-4 ">
      <h1 className="text-xl font-semibold mb-5 ">All Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="
           bg-white rounded-lg
            flex justify-between
            gap-4 border border-gray-200
            rounded p-4 mb-4 text-md
          "
        >
          {/* CUSTOMER */}
          <div className="p-2">
            <p className="font-semibold">
             {order.customer.firstName} {order.customer.lastName}
            </p>
            <p>{order.customer.phone}</p>
            <p className="text-gray-600">
              {order.customer.address}, {order.customer.city}
            </p>
          </div>

          {/* ITEMS */}
          <div>
            <p className="font-bold mb-1">Items</p>
            {order.items.map((item, i) => (
              <p key={i}>
                {item.name} × {item.quantity}
              </p>
            ))}
          </div>

          {/* PAYMENT */}
          <div>
            <p className="font-bold mb-1">Payment</p>
            <p>Method: {order.paymentMethod.toUpperCase()}</p>
            <p>Status: {order.paymentStatus}</p>
          </div>

          {/* TOTAL */}
          <div>
            <p className="font-bold mb-1">Amount</p>
            <p>₹{order.totalAmount}</p>
          </div>

          {/* STATUS UPDATE */}
          <div>
            <p className="font-bold mb-1">Order Status</p>
            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border px-2 py-1 rounded w-full"
            >
              <option value="placed">Order Placed</option>
              <option value="packing">Packing</option>
              <option value="shipped">Shipped</option>
              <option value="out_for_delivery">
                Out for Delivery
              </option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
