"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  IoLocationSharp,
  IoChevronDown,
  IoSearch,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import WishlistIcon from "./WishlistIcon";
import ShoppingcartIcon from "./ShoppingcartIcon";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";




const Navbar = () => {
const [mounted, setMounted] = useState(false); // 🔥 hydration fix
const [open, setOpen] = useState(false); // mobile sidebar
const [categoryOpen, setCategoryOpen] = useState(false); // mobile category
const [products, setProducts] = useState([]);
const [showAll, setShowAll] = useState(false);
const [search, setSearch] = useState("");
const router = useRouter();

const handleSearch = async () => {
  if (!search.trim()) return;

  try {
    const res = await fetch(
      `/api/product?search=${encodeURIComponent(search)}`
    );
    const data = await res.json();

    if (data.success && data.data.length > 0) {
      const product = data.data[0];

      const slug = product.name
        .toLowerCase()
        .replace(/\s+/g, "-");

      router.push(`/product/${slug}/${product._id}`);
    } else {
      toast.error("Product Not Found", {
        position: "top-center",
      });
    }
  } catch (err) {
    toast.error("Something went wrong");
  }
};




useEffect(() => {
  const fetchProductNames = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/name`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load product names", err);
    }
  };

  fetchProductNames();
}, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  return (
    <>
      {/* ===== TOP INFO BAR (DESKTOP ONLY) ===== */}
      <section className="hidden md:block">
        <div className="bg-green-800 text-white px-12 py-2 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <IoLocationSharp />
              <span>
                Village Pingli, Post Office Chiro, Karnal, Haryana, 132001, India
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>+91 90342-60700</span>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail />
                <span>kanhiyaayurveda@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN HEADER ===== */}
      <section className="border-b text-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 text-black">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Kanhiy Ayurveda"
                width={120}
                height={50}
                priority
                 className="w-auto h-auto"
              />
            </Link>

            {/* SEARCH (DESKTOP) */}
           <div className="hidden md:flex items-center w-2/3">
  <input
    type="text"
    placeholder="I'm shopping for..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
  />

  <button
    onClick={handleSearch}
    className="flex items-center gap-2 logo-text bg-green-700 px-4 py-2 text-white uppercase"
  >
    Search <IoSearch />
  </button>
</div>

            {/* ICONS */}
            <div className="flex items-center gap-4 text-2xl">
             <WishlistIcon/>
              <ShoppingcartIcon/>

              {/* MOBILE MENU BUTTON */}
              <button className="md:hidden" onClick={() => setOpen(true)}>
                <IoMenu />
              </button>
            </div>
          </div>

          {/* SEARCH (MOBILE) */}
          <div className="md:hidden mt-4 flex">
            <input
              type="text"
              placeholder="I'm shopping for..."
               value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
            />
            <button
            onClick={handleSearch}
            className="bg-green-700 px-4 py-2 text-white">
              <IoSearch />
            </button>
          </div>
        </div>
      </section>

      {/* ===== DESKTOP MENU ===== */}
      <section className="hidden md:block relative">
        <ul className="flex justify-center items-center gap-12 text-sm font-semibold uppercase">

          {/* BROWSE CATEGORY (DESKTOP) */}
          <li className="relative group">
            <button className="flex items-center gap-2 bg-[var(--logocolor)] text-white px-6 py-4">
              <IoMenu className="text-xl" />
              Browse Category
              <IoChevronDown className="text-lg" />
            </button>

           <ul
  className="absolute left-0 top-full w-56 bg-white shadow-lg
  opacity-0 invisible group-hover:opacity-100 group-hover:visible
  transition-all duration-300 z-50"
>
  {products.length === 0 ? (
    <li className="px-4 py-3 text-gray-400">
      Loading...
    </li>
  ) : (
    products.slice(0, 6).map((product) => (
      <li
        key={product._id}
        className="px-4 py-3 hover:bg-gray-100 border-b border-gray-200"
      >
        <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}/${product._id}`}>
          {product.name}
        </Link>
      </li>
    ))
  )}

  {/* OPTIONAL VIEW MORE */}
  {products.length > 8 && (
    <li className="px-4 py-3 border-t text-green-700 font-semibold cursor-pointer hover:bg-gray-50">
      <Link href="/product">
        View All Products →
      </Link>
    </li>
  )}
</ul>

          </li>

          <li><Link href="/" path="/" className="hover:border-b-2 ">Home</Link></li>
          <li><Link href="/about" path="/about" className="hover:border-b-2">About Us</Link></li>
          <li><Link href="/product" path="/product" className="hover:border-b-2">Our Products</Link></li>
          <li><Link href="/enquiry" path="/enquiry" className="hover:border-b-2">Enquiry</Link></li>
          <li><Link href="/contact" path="/contact" className="hover:border-b-2">Contact Us</Link></li>
        </ul>
      </section>

      {/* ===== MOBILE SIDEBAR ===== */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt="Logo" width={110} height={45}  className="w-auto h-auto" />
          </Link>
          <button onClick={() => setOpen(false)}>
            <IoClose className="text-2xl" />
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-6 py-6 text-sm font-semibold uppercase">

          {/* BROWSE CATEGORY (MOBILE) */}
         

          <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setOpen(false)}>About Us</Link></li>
          <li><Link href="/product" onClick={() => setOpen(false)}>Our Products</Link></li>
          <li><Link href="/enquiry" onClick={() => setOpen(false)}>Enquiry</Link></li>
          <li><Link href="/contact" onClick={() => setOpen(false)}>Contact Us</Link></li>
        <li>
  <button
    onClick={() => setCategoryOpen(!categoryOpen)}
    className="flex w-full items-center justify-between"
  >
    <span>Browse Category</span>
    <IoChevronDown
      className={`transition-transform ${
        categoryOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {categoryOpen && (
    <ul
      className={`mt-3 ml-3 flex flex-col gap-3 text-xs font-normal
      ${showAll ? "max-h-60 overflow-y-auto" : ""}`}
    >
      {products.length === 0 ? (
        <li className="text-gray-400">Loading...</li>
      ) : (
        <>
          {(showAll ? products : products.slice(0, 7)).map((product) => (
            <li key={product._id}>
              <Link
                href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}/${product._id}`}
                onClick={() => setOpen(false)}
                className="block hover:text-green-700"
              >
                {product.name}
              </Link>
            </li>
          ))}

          {/* VIEW MORE */}
          {!showAll && products.length > 7 && (
            <li>
              <button
                onClick={() => setShowAll(true)}
                className="text-green-700 font-semibold text-left"
              >
                + View More
              </button>
            </li>
          )}
        </>
      )}
    </ul>
  )}
</li>


        </ul>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
