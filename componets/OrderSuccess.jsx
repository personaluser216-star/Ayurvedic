import React from "react";

const OrderSuccess = ({
  customerName,
  orderId,
  totalAmount,
  paymentMethod,
  items,
  address,
  phone,
}) => {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>🎉 Order Confirmed!</h2>

      <p>Hi {customerName},</p>
      <p>Your order has been successfully placed.</p>

      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <h3>Order Items:</h3>
      <ul>
        {items?.map((item, index) => (
          <li key={index}>
            {item.name} × {item.quantity}
          </li>
        ))}
      </ul>

      <p><strong>Address:</strong> {address}</p>
      <p><strong>Phone:</strong> {phone}</p>

      {/* Track Order Button */}
      <p>
        <a
          href={`https://ayurvedic-two.vercel.app/track-order/${orderId}`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Track Your Order
        </a>
      </p>

      <br />
      <p>Thank you for shopping with us ❤️</p>
      <p><b>Kanhiya Ayurveda</b></p>
    </div>
  );
};

export default OrderSuccess;