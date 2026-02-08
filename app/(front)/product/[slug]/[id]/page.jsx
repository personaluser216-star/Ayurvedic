"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PageBanner from "@/componets/pagebanner";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import ProductSlider from "@/componets/ProductSlider";
import { getFavorites, setFavorites } from "@/utils/wishlist";
import { toast } from "react-toastify";
import { getShoppingCart, setShoppingCart } from "@/utils/shoppingcart";





const ProductDetail = () => {
  const { id ,slug} = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
const [favorites, setFavoritesState] = useState([]);

useEffect(() => {
  setFavoritesState(getFavorites());
}, []);


  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`
      );
      const data = await res.json();
      setProduct(data.data);
      setActiveImage(data.data.images?.[0]);
      setSelectedVariant(data.data.variants?.[0]); // default select
    };

    fetchProduct();
  }, [id]);
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

  // 🔔 update wishlist badge
  window.dispatchEvent(new Event("wishlistUpdated"));
};

  if (!product) return <p className="text-center py-20">Loading...</p>;
const increaseQty = () => setQuantity((prev) => prev + 1);

const decreaseQty = () => {
  if (quantity > 1) {
    setQuantity((prev) => prev - 1);
  }
};
const addToCart = () => {
  const cart = getShoppingCart();

  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === product._id &&
      item.variant.weight === selectedVariant.weight &&
      item.variant.unit === selectedVariant.unit
  );

  if (existingIndex !== -1) {
    // ✅ Same product + same variant → increase qty
    cart[existingIndex].quantity += quantity;
  } else {
    // ✅ New product OR new variant
    cart.push({
      productId: product._id,

      // 🔥 REQUIRED FOR CART PAGE UI
      name: product.name,
      images: product.images, // ✅ IMAGE WILL SHOW NOW

      variant: {
        _id: selectedVariant._id,
        weight: selectedVariant.weight,
        unit: selectedVariant.unit,
        price: selectedVariant.price,
      },

      quantity,
    });
  }

  setShoppingCart(cart);

  toast.success("Product added to cart 🛒", {
    position: "top-center",
  });

  window.dispatchEvent(new Event("shoppingcartupdate"));
};


  return (
    <div>
     
      {product && <PageBanner title={product.name} />}


      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE SECTION */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.images?.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg p-1 cursor-pointer 
                  ${activeImage === img ? "border-green-600" : "border-gray-200"}`}
                >
                  <Image src={img} alt="thumb" width={80} height={80} />
                </div>
              ))}
            </div>

            <div className="relative flex-1">
              <Image
                src={activeImage}
                alt={product.name}
                width={450}
                height={450}
                className="rounded-xl object-cover w-full"
              />

             <button
  onClick={() => toggleFav(product._id)}
  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
>
  {favorites.includes(product._id) ? (
    <IoHeart className="text-green-600 text-xl" />
  ) : (
    <IoHeartOutline className="text-gray-600 text-xl" />
  )}
</button>

            </div>
          </div>

          {/* PRODUCT INFO */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>

            {/* PRICE */}
            <p className="text-green-600 font-semibold text-xl mt-2">
              ₹{selectedVariant?.price}
            </p>

            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* SELECT WEIGHT */}
            <div className="mt-6">
              <label className="block mb-2 font-semibold">
               Choice  Weight
              </label>

            <select
  className="border border-gray-300  px-4 py-2 w-full "
  value={selectedVariant?.weight || ""}
  onChange={(e) => {
    const variant = product.variants.find(
      (v) => v.weight.toString() === e.target.value
    );
    setSelectedVariant(variant);
  }}
>

  {product.variants?.map((variant, index) => (
    <option 
    className=""
    key={index} value={variant.weight}>
      {variant.weight} {variant.unit}
    </option>
  ))}
</select>
{/* QUANTITY */}
<div className="mt-6">
  <label className="block mb-2 font-semibold">Quantity</label>

  <div className="flex items-center ">
    <button
      onClick={decreaseQty}
      className="w-10 h-10 border border-gray-300 bg-gray-100 text-xl  hover:bg-gray-100"
    >
      −
    </button>

    <span className="text-lg pt-1 w-6 text-center border w-10 h-10 text-xl border-gray-300 ">
      {quantity}
    </span>

    <button
      onClick={increaseQty}
      className="w-10 h-10 border bg-gray-100 border-gray-300 text-xl  hover:bg-gray-100"
    >
      +
    </button>
  </div>
</div>

{/* ACTION BUTTONS */}
<div className="mt-8 flex md:flex-row flex-col gap-4">
  <button
    className="flex-1 logo-text text-white py-3  font-semibold hover:bg-green-700 transition"
   
   onClick={addToCart}

  >
    Add to Cart
  </button>

  <button
    className="flex-1 border bg-black text-white py-3 font-semibold hover:border hover:text-black hover:bg-white transition"
  >
    Buy Now
  </button>
</div>

</div>

          </div>
        </div>
      </div>
    
     <ProductSlider/>
    </div>
  );
};

export default ProductDetail;
