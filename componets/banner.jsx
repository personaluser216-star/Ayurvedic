"use client";

import React from "react";
import Image from "next/image";

const banners = [
  {
    id: 1,
    image: "/banner1.png",
    title: "Cash On Delivery",
    desc: "No minimum order limit",
  },
  {
    id: 2,
    image: "/banner2.png",
    title: "Free Shipping",
    desc: "free order on above 499",
  },
  {
    id: 3,
    image: "/banner3.png",
    title: "Same-Day Dispatch",
    desc: "On all order",
  },
  {
    id: 4,
    image: "/banner4.png",
    title: "Fast Shipping",
    desc: "Shipping in all over india",
  },
];

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:py-10 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {banners.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4"
          >
            {/* OUTER CIRCLE */}
            <div className="w-20 h-20 p-2 rounded-full border flex items-center justify-center">
              {/* DASHED CIRCLE */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center">
                {/* IMAGE */}
                <div className="relative w-10 h-10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm  text-gray-600">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
