// OrderSuccess.jsx
import React from "react";

const OrderSuccess = ({ customerName, orderId, totalAmount, paymentMethod }) => {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>🎉 Order Confirmed!</h2>
      <p>Hi {customerName},</p>
      <p>Your order has been successfully placed.</p>

      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <p>
        <a
          href={`https://ayurvedic-two.vercel.app/track-order/${orderId}`} 
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "10px"
          }}
        >
          Track Your Order
        </a>
      </p>
    </div>
  );
};

export default OrderSuccess;