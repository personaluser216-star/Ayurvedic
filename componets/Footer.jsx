"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [products, setProducts] = useState([]);

   useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/name`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load product names", err);
      }
    };

    fetchProductNames();
  }, []);
  return (
    <footer className="bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ===== 1. Company Info ===== */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logo.png"
              alt="Kanhiy Ayurveda"
              width={140}
              height={60}
              priority
               className="w-auto h-auto"
            />
          </Link>

          <p className="text-sm text-gray-600 mb-2">
            Village Pingli, Post Office Chirao, Karnal, Haryana – 132001
          </p>
          <p className="text-sm text-gray-600">📞 +91 90342-60700</p>
          <p className="text-sm text-gray-600">✉️ kanhiyaayurveda@gmail.com</p>
          <p className="text-sm text-gray-600">🌐 www.kanhiyaayurveda.com</p>
        </div>

        {/* ===== 2. Useful Links ===== */}
        <div>
          <h3 className="text-lg font-semibold mb-4 md:mt-12">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/products">Our Products</Link></li>
            <li><Link href="/enquiry">Enquiry</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* ===== 3. Products ===== */}
        <div>
  <h3 className="text-lg font-semibold mb-4 md:mt-12">Top Selling Products</h3>

  <ul className="space-y-2 text-sm text-gray-600">
    {products.length === 0 ? (
      <li className="text-gray-400">Loading...</li>
    ) : (
      products.slice(0, 5).map((product) => (
        <li key={product._id}>
         <Link
  href={`/product/${product.name
    .toLowerCase()
    .replace(/\s+/g, "-")}/${product._id}`}
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="hover:text-green-700"
>
  {product.name}
</Link>

        </li>
      ))
    )}
  </ul>
</div>


        {/* ===== 4. Newsletter & Payment ===== */}
        <div>
          <h3 className="text-lg font-semibold mb-4 md:mt-12">Subscribe</h3>

          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full px-3 py-2 border border-gray-300  text-sm focus:outline-none"
            />
            <button className="logo-text text-white px-4 py-2  text-sm">
              Subscribe
            </button>
          </div>

          

         
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t bg-green-800 text-center py-4 text-sm text-white">
        © {new Date().getFullYear()} <Link href={"/"}>Kanhiy Ayurveda.</Link> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
