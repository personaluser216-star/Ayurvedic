"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const BillPrintPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("billOrder");
    if (data) {
      setOrder(JSON.parse(data));
    }
  }, []);

  if (!order) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-white">
      {/* Invoice Container */}
      <div className="md:w-[600px] mx-auto border p-6 border-gray-300">

        {/* Header */}
        <div className="flex justify-between mb-6">
          <div>
             <Image
                     src="/logo.png"
                     alt="Logo"
                     width={90}
                     height={60}
                   />
           
          </div>
          <div className="text-right text-sm">
            <p><b>Invoice #</b> {order._id.slice(-6).toUpperCase()}</p>
            <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-4 text-sm">
          <p className="font-semibold mb-1">Bill To:</p>
          <p>{order.customer.firstName} {order.customer.lastName}</p>
          <p>{order.customer.phone}</p>
          <p>
            {order.customer.address}, {order.customer.city},{" "}
            {order.customer.state} - {order.customer.pincode}
          </p>
        </div>

        {/* Items Table */}
        <table className="w-full border-collapse border text-sm mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Item</th>
              <th className="border p-2 text-center">Qty</th>
              <th className="border p-2 text-right">Price</th>
              <th className="border p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">₹{item.price}</td>
                <td className="border p-2 text-right">
                  ₹{item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Section */}
        <div className="flex justify-end mb-4 text-sm">
          <table className="w-1/2 border">
            <tbody>
              <tr>
                <td className="border p-2">Subtotal</td>
                <td className="border p-2 text-right">₹{order.totalAmount}</td>
              </tr>
              <tr className="font-bold">
                <td className="border p-2">Grand Total</td>
                <td className="border p-2 text-right">₹{order.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Info */}
        <div className="text-sm mb-6">
          <p><b>Payment Method:</b> {order.paymentMethod.toUpperCase()}</p>
          <p><b>Payment Status:</b> {order.paymentStatus}</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm mt-8 border-t border-gray-300 pt-4">
          <p>Thank you for your purchase 🙏</p>
         
        </div>

        {/* Print Button */}
        <div className="text-center mt-4 ">
          <button
            onClick={() => window.print()}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Print Invoice
          </button>
        </div>

      </div>
    </div>
  );
};

export default BillPrintPage;
