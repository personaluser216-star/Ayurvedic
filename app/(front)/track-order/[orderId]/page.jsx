"use client"; // needed if you use useEffect / client hooks
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TrackOrderPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get dynamic param from URL
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const orderId = path.split("/").pop(); // last segment of URL

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found!</p>;

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>🛒 Track Your Order</h2>

      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Name:</strong> {order.customerName}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} × {item.quantity}
          </li>
        ))}
      </ul>

      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
    </div>
  );
}