"use client";

import Link from "next/link";
import React from "react";

const cardData = [
  {
    img: "/t1.jpg",
    title: "Diabetes Churan"
  },
  {
    img: "/t2.jpg",
    title: "kanhiya pain oil"
  },
  {
    img: "/t3.jpg",
    title: "swadisht churan"
  },
];

const Poster = () => {
  return (
    <div className="max-w-7xl mx-auto  py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="relative md:rounded-lg  overflow-hidden shadow-lg"
        >
          {/* Image */}
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-64 object-cover"
          />

          {/* Overlay text + button */}
          <div className="absolute top-16 left-2  p-4 ">
            <h3 className="text-black font-semibold text-xl">{card.title}</h3>
            <Link
  href="/product"
  className="mt-2 inline-block logo-text text-white rounded-lg px-4 py-2 shadow hover:bg-green-700 transition"
>
  Shop Now
</Link>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Poster;
