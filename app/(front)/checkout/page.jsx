"use client";

import React, { useEffect, useState } from "react";
import { clearShoppingCart, getShoppingCart } from "@/utils/shoppingcart";
import CheckoutSteps from "@/componets/checkoutstep";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [onlineMethod, setOnlineMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ LOAD + CLEAN CART (Production Safe)
  useEffect(() => {
    const cart = getShoppingCart() || [];

    const cleanedCart = cart.filter(
      (item) =>
        item &&
        item.productId &&
        item.variant &&
        item.variant.price
    );

    setCartProducts(cleanedCart);
  }, []);

  // ✅ SAFE TOTAL CALCULATION
  const total = cartProducts.reduce((sum, item) => {
    const price = item?.variant?.price || 0;
    const qty = item?.quantity || 0;
    return sum + price * qty;
  }, 0);

  const placeOrder = async () => {
    if (loading) return;

    if (!firstName || !phone || !address) {
      toast.error("Please fill billing details");
      return;
    }

    if (!cartProducts.length) {
      toast.error("Cart is empty");
      return;
    }

    setLoading(true);

    const orderPayload = {
      customer: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
      },
      items: cartProducts.map((item) => ({
        productId: item.productId || item._id,
        name: item?.name || "",
        price: item?.variant?.price || 0,
        quantity: item?.quantity || 1,
      })),
      totalAmount: total,
      paymentMethod,
    };

    // ================= COD FLOW =================
    if (paymentMethod === "cod") {
      try {
        const res = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
          clearShoppingCart();
          toast.success("COD Order placed successfully 🎉");

          // ✅ Send WhatsApp only if order success
          if (data?.order?._id) {
            await fetch("/api/sendwhatspp", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phone,
                firstName,
                orderId: data.order._id,
                total,
              }),
            });
          }

          setTimeout(() => {
            router.replace("/");
          }, 1500);
        } else {
          toast.error(data.error || "Order failed");
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        toast.error("Something went wrong");
      }
      return;
    }

    // ================= STRIPE FLOW =================
    if (paymentMethod === "online" && onlineMethod === "stripe") {
      try {
        const res = await fetch("/api/order/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success && data.url) {
          window.location.href = data.url;
        } else {
          toast.error("Stripe payment failed");
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        toast.error("Payment error");
      }
    }
  };

  return (
    <>
      <CheckoutSteps currentStep={2} />

      <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* BILLING */}
        <div className="md:col-span-2">
          <div className="border md:p-8 p-4">
            <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-3" placeholder="First Name" />
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-3" placeholder="Last Name" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 md:col-span-2" placeholder="Email" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-3" placeholder="Phone" />
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="border p-3" placeholder="Address" />
              <input value={city} onChange={(e) => setCity(e.target.value)} className="border p-3" placeholder="City" />
              <input value={state} onChange={(e) => setState(e.target.value)} className="border p-3" placeholder="State" />
              <input value={pincode} onChange={(e) => setPincode(e.target.value)} className="border p-3" placeholder="Pincode" />
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Your Order</h2>

          {cartProducts.map((item, index) => (
            <div key={index} className="flex justify-between mb-2 text-sm">
              <span>
                {item?.name} (
                {item?.variant?.weight || ""}
                {item?.variant?.unit || ""}
                ) × {item?.quantity || 0}
              </span>
              <span>
                ₹{(item?.variant?.price || 0) * (item?.quantity || 0)}
              </span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-green-600">₹{total}</span>
          </div>

          {/* PAYMENT */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Payment Method</h3>

            <label className="flex gap-2">
              <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>

            <label className="flex gap-2 mt-2">
              <input type="radio" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              Online Payment
            </label>

            {paymentMethod === "online" && (
              <div className="ml-5 mt-2">
                <label className="flex gap-2">
                  <input type="radio" checked={onlineMethod === "stripe"} onChange={() => setOnlineMethod("stripe")} />
                  Stripe
                </label>
              </div>
            )}
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full mt-6 logo-text text-white py-2"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
