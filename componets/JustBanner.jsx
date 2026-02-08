"use client";

import React from "react";

const cardData = [
  { img: "/11.jpg" },
  { img: "/12.jpg" },
];

const Poster = () => {
  return (
    <div className="max-w-7xl mx-auto md:py-10  grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="relative"
        >
          {/* Image */}
          <img
            src={card.img}
            alt={`Poster ${index + 1}`}
            className="w-full md:h-96 object-fill rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default Poster;
