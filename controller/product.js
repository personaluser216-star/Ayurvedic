import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Product from "@/models/product";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import product from "@/models/product";

/* ================= ADD PRODUCT ================= */
export async function addproduct(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");

    const variantsRaw = formData.get("variants");
    const variants = variantsRaw ? JSON.parse(variantsRaw) : [];

    const files = formData.getAll("images");

    if (!name || !description) {
      return NextResponse.json(
        { success: false, message: "Name & description required" },
        { status: 400 }
      );
    }

    if (!files.length) {
      return NextResponse.json(
        { success: false, message: "Upload at least one image" },
        { status: 400 }
      );
    }

    if (!variants.length) {
      return NextResponse.json(
        { success: false, message: "Please add weight & price" },
        { status: 400 }
      );
    }

    /* Upload images */
    const imageUrls = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrls.push(result.secure_url);
    }

    const product = await Product.create({
      name,
      description,
      images: imageUrls,
      variants,
    });

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* ================= GET PRODUCTS ================= */
export async function getproduct(search = "") {
  try {
    await connectDB();

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to get products" },
      { status: 500 }
    );
  }
};

export async function getProductById(id) {
  try {
    await connectDB();

    // ✅ validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product id" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: product },
      { status: 200 }
    );
    } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
export const deleteproduct= async (id) => {
  await connectDB();
  await product.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Interpretation deleted successfully" },
    { status: 200 }
  );
};


export async function editproduct(req, id) {
  try {
    await connectDB();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const variants = JSON.parse(formData.get("variants") || "[]");
    const files = formData.getAll("images");

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    let imageUrls = existingProduct.images || [];

    if (files.length && files[0]?.size > 0) {
      imageUrls = [];

      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "products" },
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          ).end(buffer);
        });

        imageUrls.push(result.secure_url);
      }
    }



   

   const product = await Product.findByIdAndUpdate(
      id,
      { name, description, variants, images: imageUrls },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("EDIT ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );

  

 
  }
}




