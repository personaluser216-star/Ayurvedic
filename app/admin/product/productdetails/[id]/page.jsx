"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();   // ✅ SAME AS EDIT
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        const result = await res.json();

        if (result.success) {
          setProduct(result.data);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="p-6 text-red-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="md:p-2">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-xl">Product Details</p>

        <nav className="text-sm text-gray-500">
          <Link href="/admin" className="font-semibold text-gray-800">
            Home
          </Link>{" "}
          / Product Details
        </nav>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 ">
          {/* LEFT */}
          <div>
            <p className="font-medium mb-1">Product Name</p>
            <p className="mb-4 text-gray-700">{product.name}</p>

            <p className="font-medium mb-1">Description</p>
            <p className="text-gray-600">{product.description}</p>

            {/* IMAGES */}
            <p className="mt-4 mb-2 font-medium">Images</p>
            <div className="flex gap-4 flex-wrap">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-24 h-24 p-2 border object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="pt-2">
            <p className="font-medium mb-2">Variants</p>

           <div className="max-w-sm border border-gray-300 rounded overflow-hidden">
  {/* Header */}
  <div className="grid grid-cols-2 bg-gray-100 p-3 font-semibold text-sm">
    <span>Weight</span>
    <span>Price</span>
  </div>

  {/* Rows */}
  {product.variants?.map((v, i) => (
    <div
      key={i}
      className="grid grid-cols-2 p-3 border-t text-sm items-center"
    >
      <span>
        {v.weight} {v.unit}
      </span>

      <span className="font-semibold">
        ₹{v.price}
      </span>
    </div>
  ))}
</div>


           <div className="flex gap-4">
             <button
              onClick={() =>
                router.push(`/admin/product/editproduct/${id}`)
              }
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Edit Product
            </button>
             <button
              onClick={() =>
                router.push('/admin/product/getproduct')
              }
              className="mt-4 px-4 py-2 bg-gray-100 text-black rounded border"
            >
              Back To Product
            </button>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
