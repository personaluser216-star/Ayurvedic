"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TrackOrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();
  const orderId = params.orderId;

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/track-order/${orderId}`);

        if (!res.ok) {
          const text = await res.text();
          console.error("API Error:", res.status, text);
          setError(res.status === 404 ? "Order not found" : "Server error");
          return;
        }

        const data = await res.json();
        setOrder(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading order details...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!order?._id) return <p style={{ textAlign: "center" }}>Order not found!</p>;

  // 🔥 Steps
  const steps = ["placed", "processing", "shipped", "delivered"];
  const currentStepIndex = steps.indexOf(order.orderStatus);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "800px", margin: "auto" }}>
      
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 Track Your Order</h2>

      {/* 🔥 Progress Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        {steps.map((step, index) => (
          <div key={index} style={{ textAlign: "center", flex: 1, position: "relative" }}>
            
            {/* Circle */}
            <div
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                margin: "auto",
                backgroundColor: index <= currentStepIndex ? "#4CAF50" : "#ccc",
                color: "#fff",
                lineHeight: "35px",
                fontWeight: "bold"
              }}
            >
              {index <= currentStepIndex ? "✓" : index + 1}
            </div>

            {/* Label */}
            <p style={{ fontSize: "12px", marginTop: "8px" }}>
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </p>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "50%",
                  width: "100%",
                  height: "4px",
                  backgroundColor: index < currentStepIndex ? "#4CAF50" : "#ccc",
                  zIndex: -1,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 📦 Order Card */}
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p>
          <strong>Name:</strong> {order.customer?.firstName} {order.customer?.lastName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
            {order.orderStatus.toUpperCase()}
          </span>
        </p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      </div>

      {/* 🛍 Items */}
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h3>Items</h3>
        <ul>
          {order.items?.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} (₹{item.price})
            </li>
          ))}
        </ul>
      </div>

      {/* 📍 Address */}
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
        <h3>Delivery Details</h3>
        <p>
          {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
        </p>
        <p><strong>Phone:</strong> {order.customer?.phone}</p>
      </div>

    </div>
  );
}