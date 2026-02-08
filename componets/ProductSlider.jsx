"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
        );
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Product fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div className="relative md:px-12 px-6 md:pl-24 md:pr-24 md:mt-12 mt-6 mb-16">
        <h2 className="text-2xl font-semibold mb-10 ">Related Product</h2>
      
      <button
        ref={prevRef}
        className="absolute md:left-8 md:top-1/2 left-64 top-3 translate-y-1/2 z-10
          md:w-12 md:h-12  w-8 h-8 flex items-center justify-center
          logo-text text-white rounded-full shadow-md
          transition"
      >
        <IoChevronBack size={24} />
      </button>

      
      <button
        ref={nextRef}
        className="absolute md:right-8 md:top-1/2  right-4 top-11 -translate-y-1/2 z-10
          md:w-12 md:h-12 w-8 h-8 flex items-center justify-center
          logo-text text-white rounded-full shadow-md
          transition"
      >
        <IoChevronForward size={24} />
      </button>

      <Swiper
       modules={[Navigation, Autoplay]} 
                loop={true}             // 🔁 loop forever
        speed={2000}            
        spaceBetween={20}
        slidesPerView={5}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
         autoplay={{
          delay: 2500,     
          disableOnInteraction: false, 
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="border rounded-lg p-3 bg-white hover:shadow-lg transition">
              <Link
                href={`/product/${product.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}/${product._id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Image
                  src={product.images?.[0]}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-[240px] object-cover rounded-md"
                />

                <h3 className="mt-4 text-sm font-semibold line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-green-600 font-bold mt-1">
                  ₹{product.variants?.[0]?.price}
                </p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
