"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function TrackOrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSummary, setOpenSummary] = useState(false);

  const { orderId } = useParams();

  // Fetch order data
  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/track-order/${orderId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setOrder(data.data);
      } catch {
        setError("Order not found");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!order?._id) return <p className="text-center mt-10">Order not found!</p>;

 const steps = ["placed", "packing", "shipped", "out_for_delivery", "delivered"];
const currentStepIndex = steps.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="bg-gray-100 shadow py-1 px-4">
        <div className="flex justify-center items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={120} height={50} priority />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full p-4 flex-grow">

        {/* Order Summary */}
       <div className="flex flex-col mb-6">

  {/* Header + Total in one black line */}
 <div
  className="flex justify-between items-center cursor-pointer p-3 bg-black text-white"
  onClick={() => setOpenSummary(!openSummary)}
>
  {/* Left: Title + Arrow */}
  <div className="flex items-center gap-2">
    <h3 className="font-semibold text-lg">Order Summary</h3>
    <FaChevronDown
      className={`transition-transform duration-300 ${openSummary ? "rotate-180" : ""}`}
    />
  </div>

  {/* Right: Total Amount */}
  <span className="font-medium">₹{order.totalAmount}</span>
</div>
  {/* Smooth dropdown content */}
  <div
    className="overflow-hidden transition-[max-height] duration-500 ease-in-out bg-gray-100 "
    style={{ maxHeight: openSummary ? "1000px" : "0" }}
  >
    <div className="p-3 text-sm">

      {/* Items Table */}
      <div className=" pt-2">
        {order.items?.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded"
                />
              )}
              <span>{item.name} × {item.quantity}</span>
            </div>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="mt-3 border-t pt-2 text-sm space-y-1">
        <div className="flex justify-between">
          <span>Shipping Charge</span>
          <span>₹{order.shippingCharge}</span>
        </div>
        <div className="flex justify-between font-bold text-green-700">
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Stepper */}
        <p className="font-semibold mb-2">Track Your Order :</p>
        <div className="flex justify-between mb-10 mt-10">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center relative">
              <div
                className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-white font-bold
                  ${index <= currentStepIndex ? "bg-green-500" : "bg-gray-300"}`}
              >
                {index <= currentStepIndex ? "✓" : index + 1}
              </div>
              <p className="text-sm mt-2 capitalize">{step}</p>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-1 -z-10
                  ${index < currentStepIndex ? "bg-green-500" : "bg-gray-300"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-gray-100 p-5 mb-5">
          <h3 className="font-semibold mb-3">Contact Information</h3>
          <p className="font-light">{order.customer?.email}</p>
          <h3 className="font-semibold mb-3 mt-3">Shipping Address</h3>
          <p className="font-light">
            {order.customer?.firstName} {order.customer?.lastName}<br/>
            {order.customer?.address}, {order.customer?.city},<br/>
            {order.customer?.state} - {order.customer?.pincode}
          </p>
              <h3 className="font-semibold mb-3 mt-3">Phone</h3>
          <p>{order.customer?.phone}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-auto text-sm">
        <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex flex-wrap gap-4 font-light">
            <Link href="/return-policy" className="hover:text-green-600 underline">Return Policy</Link>
            <Link href="/shipping" className="hover:text-green-600 underline">Shipping</Link>
            <Link href="/privacy-policy" className="hover:text-green-600 underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-green-600 underline">Terms of Service</Link>
            <Link href="/contact" className="hover:text-green-600 underline">Contact</Link>
          </div>
          <div className="text-gray-400 mt-2 md:mt-0">© 2026 <Link href="/"><span className="text-black font-semibold">Kanhiy Ayurveda.</span> </Link>All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}