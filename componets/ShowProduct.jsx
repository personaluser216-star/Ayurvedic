"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCart } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getFavorites, setFavorites } from "@/utils/wishlist";
import { toast } from "react-toastify";

import { getShoppingCart, setShoppingCart } from "@/utils/shoppingcart";



const ITEMS_PER_PAGE = 10;

const ShowProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState("right");
  const [favorites, setFavoritesState] = useState([]);
  const router = useRouter();

    useEffect(() => {
      setFavoritesState(getFavorites());
    }, []);
  
   useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`)
        .then((res) => res.json())
        .then((data) => setProducts(data.data || []));
    }, []);
  
     const toggleFav = (id) => {
      let updated;
  
      if (favorites.includes(id)) {
        updated = favorites.filter((i) => i !== id);
        toast.success(" Product removed from wishlist", {
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
  
      
      window.dispatchEvent(new Event("wishlistUpdated"));
    };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const start = currentPage * ITEMS_PER_PAGE;
  const currentProducts = products.slice(start, start + ITEMS_PER_PAGE);

  const changePage = (index) => {
    setDirection(index > currentPage ? "right" : "left");
    setCurrentPage(index);

    const section = document.getElementById("latest-products");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ===== ADD TO CART (FULL PRODUCT) =====
  const addToCart = (product) => {
    const cart = getShoppingCart() || [];

    const existingIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingIndex !== -1) {
      // 🔁 increase quantity
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;

      toast.success("Product quantity updated", {
        position: "top-center",
      });
    } else {
      // ➕ add new product
      updatedCart = [
        ...cart,
        {
          ...product,
          variant: product.variants?.[0], // REQUIRED by cart page
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
    <div id="latest-products" className="max-w-7xl mx-auto px-6 py-10 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6">Latest Products</h2>

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 transition-all duration-500 ease-in-out ${
          direction === "right" ? "animate-slideRight" : "animate-slideLeft"
        }`}
      >
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="relative border rounded-lg p-3 bg-white shadow hover:shadow-lg transition group"
          >
            {/* ❤️ + 🛒 */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
              <button
                onClick={() => toggleFav(product._id)}
                className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
              >
                {favorites.includes(product._id) ? (
                  <FaHeart className="text-green-600 text-lg" />
                ) : (
                  <FaRegHeart className="text-gray-500 text-lg" />
                )}
              </button>

              <button
               onClick={() => addToCart(product)}
                


                className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
              >
                <IoCart className="text-gray-500 text-lg" />
              </button>
            </div>

            {/* 👁️ hover view */}
            <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button
                onClick={() => {router.push(`/product/${product.name
    .toLowerCase()
    .replace(/\s+/g, "-")}/${product._id}`)
                  window.scrollTo({ top: 0, behavior: "smooth" });
              }
              }
                className="bg-white p-3 rounded-full shadow hover:scale-110 transition"
              >
                <FaEye className="text-gray-800" />
                
              </button>
              
            </div>


            {/* Product Image */}
            <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />

            {/* Product Info */}
            <h3 className="mt-2 text-sm font-medium line-clamp-2">{product.name}</h3>
            <p className="text-green-600 font-bold mt-1">
              ₹{product.variants?.[0]?.price}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => changePage(i)}
            className={`w-3 h-3 rounded-lg transition-all ${
              currentPage === i ? "bg-green-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Slide animations */}
      
    </div>
  );
};

export default ShowProductSlider;
