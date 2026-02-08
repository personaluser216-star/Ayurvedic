"use client";

import Link from "next/link";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getShoppingCart } from "@/utils/shoppingcart";

const ShoppingcartIcon = () => {
  const [shopcart, setShopcart] = useState(0);

  const updateshoppingcart = () => {
    const cart = getShoppingCart();

    // ✅ TOTAL quantity count
    const totalQty = cart.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    setShopcart(totalQty);
  };

  useEffect(() => {
    updateshoppingcart();
    window.addEventListener("shoppingcartupdate", updateshoppingcart);

    return () =>
      window.removeEventListener("shoppingcartupdate", updateshoppingcart);
  }, []);

  return (
    <Link href="/shoppingcart" className="relative">
      <PiShoppingCartSimple size={26} />

      {shopcart > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {shopcart}
        </span>
      )}
    </Link>
  );
};

export default ShoppingcartIcon;
