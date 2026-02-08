"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

import { getFavorites, setFavorites } from "@/utils/wishlist";
import { getShoppingCart, setShoppingCart } from "@/utils/shoppingcart";

const ITEMS_PER_PAGE = 6;

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavoritesState] = useState([]);

  // ===== LOAD WISHLIST =====
  useEffect(() => {
    setFavoritesState(getFavorites() || []);
  }, []);

  // ===== LOAD PRODUCTS =====
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(console.error);
  }, []);

  // ===== TOGGLE WISHLIST =====
  const toggleFav = (id) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((i) => i !== id);
      toast.success("Product removed from wishlist", {
        position: "top-center",
      });
    } else {
      updated = [...favorites, id];
      toast.success("Product added to wishlist", {
        position: "top-center",
      });
    }

    setFavoritesState(updated);
    setFavorites(updated);

    // 🔔 notify wishlist icon
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // ===== ADD TO CART =====
  const addToCart = (product) => {
    const cart = getShoppingCart() || [];

    const index = cart.findIndex((i) => i._id === product._id);
    let updatedCart;

    if (index !== -1) {
      updatedCart = [...cart];
      updatedCart[index].quantity += 1;

      toast.success("Product quantity updated", {
        position: "top-center",
      });
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          variant: product.variants?.[0], // REQUIRED
          quantity: 1,
        },
      ];

      toast.success("Product added to cart", {
        position: "top-center",
      });
    }

    setShoppingCart(updatedCart);

    // 🔔 notify cart icon
    window.dispatchEvent(new Event("shoppingcartupdate"));
  };

  return (
    <>
      <h2 className="text-2xl md:pl-36 pl-6 mt-6 font-semibold">
        Best Products
      </h2>

      <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-6">
        {/* ===== LEFT BANNER ===== */}
        <div className="w-full md:w-1/4">
          <div className="relative h-84 md:h-full rounded-lg overflow-hidden shadow-lg">
            <img
              src="/ss.jpg"
              alt="Banner"
              className="w-full h-full object-fill md:object-cover"
            />

            <div className="absolute md:top-24 top-8 left-4 md:left-8">
              <h3 className="text-black text-lg md:text-xl font-semibold">
                KABJ NASHAK CHURAN
              </h3>

              <button className="mt-2 logo-text text-white rounded-lg px-4 py-2 shadow hover:bg-green-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* ===== PRODUCTS GRID ===== */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, ITEMS_PER_PAGE).map((product) => (
            <div
              key={product._id}
              className="relative border rounded-xl p-3 bg-white shadow hover:shadow-lg transition"
            >
              {/* ❤️ Wishlist + 🛒 Cart */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                <button
                  onClick={() => toggleFav(product._id)}
                  className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  {favorites.includes(product._id) ? (
                    <FaHeart className="text-green-600 text-sm" />
                  ) : (
                    <FaRegHeart className="text-gray-500 text-sm" />
                  )}
                </button>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <FaShoppingCart className="text-gray-700 text-sm" />
                </button>
              </div>

              {/* IMAGE */}
              <Link
                href={`/product/${product.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${product._id}`}
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              >
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-72 object-cover rounded-lg cursor-pointer"
                />
              </Link>

              {/* INFO */}
              <h3 className="mt-2 text-sm font-medium line-clamp-2">
                {product.name}
              </h3>

              <p className="text-green-600 font-bold mt-1">
                ₹{product.variants?.[0]?.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSeller;
