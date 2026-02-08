"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [variants, setVariants] = useState([
    { weight: "", unit: "", price: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const addVariant = () => {
    setVariants([...variants, { weight: "", unit: "kg", price: "" }]);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async () => {
    if (!name || !description) {
      toast.error("Name & Description required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    images.forEach((img) => {
      if (img) formData.append("images", img);
    });

   const formattedVariants = variants.map((v) => ({
  weight: Number(v.weight),
  unit: v.unit,        // ✅ unit add
  price: Number(v.price),
}));

formData.append("variants", JSON.stringify(formattedVariants));


    try {
      setLoading(true);

      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product added successfully");
        router.push("/admin/product/getproduct"); 
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setVariants([{ weight: "", unit: "kg", price: "" }]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="md:p-2">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <p className="font-semibold text-xl">Add Products</p>
      <nav className="text-sm text-gray-500">
        <Link href="/admin" className="font-semibold text-gray-800 ">Home</Link> / Add Products
      </nav>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ================= LEFT COLUMN ================= */}
        <div>
          {/* Name */}
          <div className="mb-4">
            <p className="mb-1 font-medium">Product Name</p>
            <input
              className="border border-gray-300 p-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="mb-1 font-medium">Description</p>
            <textarea
              className="border border-gray-300 p-2 rounded w-full"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Images */}
          <div>
            <p className="mb-2 font-medium">Images</p>
            <div className="flex gap-4 flex-wrap">
              {images.map((img, index) => (
                <label
                  key={index}
                  className="w-24 h-24 border-gray-300 border-2 border-dashed rounded flex items-center justify-center cursor-pointer"
                >
                  {img ? (
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Upload</span>
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...images];
                      updated[index] = e.target.files[0];
                      setImages(updated);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div>
          <p className="mb-2 font-medium">Weight / Size & Price</p>

          {variants.map((v, i) => (
            <div
              key={i}
              className="
  border border-gray-300 rounded p-3 mb-3
  flex flex-col
  md:flex-row
  items-start md:items-center
  gap-3
"

            >
              <input
                type="number"
                placeholder="Weight"
                className="border p-2 border-gray-300 rounded w-24"
                value={v.weight}
                onChange={(e) =>
                  handleVariantChange(i, "weight", e.target.value)
                }
              />

              <select
                className="border p-2 border-gray-300 rounded"
                value={v.unit}
                onChange={(e) =>
                  handleVariantChange(i, "unit", e.target.value)
                }
              >
                <option value="kg">Kg</option>
                <option value="gram">Gram</option>
                 <option value="ltr">ltr</option>
                 <option value="tbl">Tablet</option>
                <option value="ml">ml</option>

                 

              </select>

              <input
                type="number"
                placeholder="Price"
                className="border p-2 border-gray-300 rounded flex-1  text-left"
                value={v.price}
                onChange={(e) =>
                  handleVariantChange(i, "price", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="text-blue-800 text-sm"
          >
            + Add More Variant
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black uppercase text-white mt-6 px-6 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  </div>
);

};

export default AddProduct;
