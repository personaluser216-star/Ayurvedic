"use client";

import React, { useEffect, useState } from "react";
import { getFavorites, setFavorites } from "@/utils/wishlist";
import PageBanner from "@/componets/pagebanner";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { getShoppingCart, setShoppingCart } from "@/utils/shoppingcart";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    const ids = getFavorites();
    setFavIds(ids);
  }, []);

  useEffect(() => {
    if (!favIds.length) {
      setWishlist([]);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.data.filter((p) =>
          favIds.includes(p._id)
        );
        setWishlist(filtered);
      });
  }, [favIds]);

  const removeWishlist = (id) => {
    const updated = favIds.filter((i) => i !== id);
    setFavIds(updated);
    setFavorites(updated);

    window.dispatchEvent(new Event("wishlistUpdated"));
  };
const addToCart = (product) => {
  const cart = [...getShoppingCart()];
  const selectedVariant = product.variants?.[0];

  if (!selectedVariant) {
    toast.error("Variant not available");
    return;
  }

  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === product._id &&
      item.variant.weight === selectedVariant.weight &&
      item.variant.unit === selectedVariant.unit
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      images: product.images,
      variant: {
        _id: selectedVariant._id,
        weight: selectedVariant.weight,
        unit: selectedVariant.unit,
        price: selectedVariant.price,
      },
      quantity: 1,
    });
  }

  // ✅ CART UPDATE
  setShoppingCart(cart);

  // ✅ WISHLIST UPDATE
  const updatedFav = favIds.filter((i) => i !== product._id);
  setFavIds(updatedFav);
  setFavorites(updatedFav);

  // 🔥 THIS WAS MISSING
  window.dispatchEvent(new Event("wishlistUpdated"));

  toast.success("Product added to cart 🛒");
};



  return (
    <>
      <PageBanner title="Wishlist" />

      <div className="max-w-7xl mx-auto px-5 py-10">
        {wishlist.length === 0 ? (
          /* ===== EMPTY WISHLIST UI ===== */ 
        <>
          <h2 className="mt-4 text-xl font-semibold">
              Your wishlist is empty
            </h2>
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CiHeart className="w-56 h-56 text-gray-200" />

           

            <p className="text-gray-500 mt-2">
              You haven’t added any products yet
            </p>

            <Link
              href="/product"
              className="mt-6 inline-block logo-text text-white px-6 py-2 text-sm rounded hover:bg-green-700 transition"
            >
              Return to shop
            </Link>
          </div>
        </>
        ) : (
          /* ===== WISHLIST PRODUCTS ===== */
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="relative border rounded-xl p-3 bg-white shadow"
              >
                <button
                  onClick={() => removeWishlist(product._id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  ❌
                </button>

                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  className="w-full md:h-64 h-52 md:object-cover object-contain rounded-lg"
                />

                <p className="mt-2 text-sm font-medium line-clamp-2">
                  {product.name}
                </p>

                <p className="text-green-600 font-bold mt-1">
                  ₹{product.variants?.[0]?.price}
                </p>
                <button
  onClick={() => addToCart(product)}
  className="rounded-md mt-3 p-2 w-full logo-text text-white bg-green-600 hover:bg-green-700 transition"
>
  Add To Cart
</button>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
