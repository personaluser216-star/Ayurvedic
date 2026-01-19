"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const statusColors = {
  placed: "bg-yellow-100 text-yellow-800",
  packing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  out_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${id}`);
      if (res.data.success) {
        setOrder(res.data.data);
        setStatus(res.data.data.orderStatus);
      }
    } catch (error) {
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${id}`, { orderStatus: newStatus });
      if (res.data.success) {
        toast.success("Order status updated");
        setStatus(newStatus);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!order) return <div className="text-center py-20">Order not found</div>;

  return (
    <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-6">Order Details</h1>

      {/* Top section: Order + Customer + Status */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Order Info</h2>
          <p><span className="font-medium">Order ID:</span> {order._id}</p>
          <p><span className="font-medium">Placed On:</span> {new Date(order.createdAt).toLocaleString()}</p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className={`px-3 py-1 rounded text-sm font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
              {status.replaceAll("_", " ")}
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
          <p className="font-medium text-gray-800">{order.customer.firstName} {order.customer.lastName}</p>
          <p className="text-gray-600">{order.customer.email}</p>
          <p className="text-gray-600">{order.customer.phone}</p>
          <p className="text-gray-500 mt-1">{order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Update Status</h2>
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-3/4"
          >
            <option value="placed">Order Placed</option>
            <option value="packing">Packing</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Payment Info Card */}
      <div className="mb-6 rounded-lg shadow-inner">
        <h2 className="text-lg font-semibold mb-4">Payment Info</h2>
        <div className="grid grid-cols-2 md:grid-cols-4  border p-2 border-gray-300">
          <div>
            <p className="text-gray-500 border-b border-gray-300">Method</p>
            <p className="font-medium pt-2">{order.paymentMethod.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-gray-500 border-b border-gray-300">Payment Status</p>
            <p className="font-medium pt-2">{order.paymentStatus}</p>
          </div>
          <div>
            <p className="text-gray-500 border-b border-gray-300">Total Amount</p>
            <p className="font-medium pt-2">₹{order.totalAmount}</p>
          </div>
          <div>
            <p className="text-gray-500 border-b border-gray-300">Items Count</p>
            <p className="font-medium pt-2">{order.items.length}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-center">Qty</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">₹{item.price}</td>
                  <td className="px-4 py-2 text-right">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan="3" className="px-4 py-2 font-bold text-right">Total Amount</td>
                <td className="px-4 py-2 font-bold text-right">₹{order.totalAmount}</td>
              </tr>
            </tfoot>
          </table>
          <button className="bg-black text-white p-2 rounded mt-5 w-36">Bill generate</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
