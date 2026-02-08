import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import product from "@/models/product";

export async function GET() {
  try {
    await connectDB();

    // 🔥 only _id & name
    const products = await product.find({}, { name: 1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Product names API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch product names" },
      { status: 500 }
    );
  }
}
