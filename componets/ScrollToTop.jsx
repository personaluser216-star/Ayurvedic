"use client"
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  // scroll percentage calculate
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);

      setVisible(scrollTop > 200); // 200px પછી દેખાય
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full logo-text flex items-center justify-center shadow-lg hover:bg-[#4a3f38] transition duration-300"
          aria-label="Scroll to top"
        >
          {/* Circle progress */}
          <svg className="absolute w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke=""
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="#ffffff"
              strokeWidth="4"
              fill="none"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={
                2 * Math.PI * 24 - (scrollPercent / 100) * 2 * Math.PI * 24
              }
              className="transition-all duration-150"
            />
          </svg>

          {/* Arrow */}
          <span className="relative text-white text-lg font-bold">↑</span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
