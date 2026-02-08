"use client";

import React, { useEffect, useState } from "react";
import { getShoppingCart, setShoppingCart } from "@/utils/shoppingcart";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import CheckoutSteps from "@/componets/checkoutstep";

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // ================= LOAD & CLEAN CART =================
  useEffect(() => {
    const cart = getShoppingCart() || [];

    // remove items without variant (IMPORTANT FIX)
    const validCart = cart.filter(
      (item) => item && item.variant && item.variant.price
    );

    setCartItems(validCart);
    setShoppingCart(validCart);
  }, []);

  // ================= QUANTITY =================
  const increaseQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity < 10) {
      updated[index].quantity += 1;
    }
    setCartItems(updated);
    setShoppingCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity - 1);
    setCartItems(updated);
    setShoppingCart(updated);
  };

  // ================= REMOVE =================
  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    setShoppingCart(updated);
  };

  // ================= TOTAL =================
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.variant?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <>
      {/* STEPS */}
      <CheckoutSteps currentStep={1} />

      {/* CART */}
      <div className="max-w-7xl mx-auto px-5 py-7">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <IoCartOutline size={180} className="text-gray-200 mb-6" />

            <h2 className="text-xl font-semibold text-gray-700">
              Your cart is currently empty
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
              Looks like you haven’t added anything to your cart yet.
              Start shopping to fill it up!
            </p>

            <Link
              href="/product"
              className="mt-6 inline-block bg-green-600 logo-text text-white px-6 py-3 text-sm rounded-md hover:bg-green-700 transition"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT TABLE */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="p-3 w-10"></th>
                    <th className="p-3 text-left uppercase font-medium">
                      Product
                    </th>
                    <th></th>
                    <th className="p-3 text-left uppercase font-medium">
                      Price
                    </th>
                    <th className="p-3 text-left uppercase font-medium">
                      Quantity
                    </th>
                    <th className="p-3 text-left uppercase font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200"
                    >
                      <td className="p-3">
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-gray-400 hover:text-red-500 font-bold"
                        >
                          ✕
                        </button>
                      </td>

                      <td className="p-3">
                        <img
                          src={
                            item.images?.length
                              ? item.images[0]
                              : "/placeholder.png"
                          }
                          className="w-20 h-20 object-cover rounded"
                          alt={item.name}
                        />
                      </td>

                      <td className="p-3">
                        {item.name}
                        <br />
                        <span className="text-sm font-light">
                          (
                          {item.variant?.weight ?? "-"}{" "}
                          {item.variant?.unit ?? ""}
                          )
                        </span>
                      </td>

                      <td className="p-3">
                        ₹{item.variant?.price ?? 0}
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2 border w-fit">
                          <button
                            onClick={() => decreaseQty(index)}
                            className="border-r px-3 py-1"
                          >
                            −
                          </button>

                          <span className="min-w-[24px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(index)}
                            className="border-l px-3 py-1"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-3 font-semibold text-green-600">
                        ₹{(item.variant?.price ?? 0) * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT TOTAL */}
            <div className="border border-gray-300 p-6 h-fit">
              <h3 className="text-lg font-medium mb-4">
                Cart Totals
              </h3>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹0</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-green-600">
                  ₹{subtotal}
                </span>
              </div>

              <Link href="/checkout">
                <button className="w-full mt-4 logo-text uppercase text-white py-2 hover:bg-green-700">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCartPage;
