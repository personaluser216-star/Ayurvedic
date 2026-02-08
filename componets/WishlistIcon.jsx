"use client";

import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import { getFavorites } from "@/utils/wishlist";

const WishlistIcon = () => {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(getFavorites().length);
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("wishlistUpdated", updateCount);
    return () =>
      window.removeEventListener("wishlistUpdated", updateCount);
  }, []);

  return (
    <Link href="/wishlist" className="relative">
      <IoMdHeartEmpty size={26} />

      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {count}
      </span>
    </Link>
  );
};

export default WishlistIcon;
