import { NextResponse } from "next/server";

import Order from "@/models/order"
import { connectDB } from "@/lib/mongodb";
import order from "@/models/order";
import mongoose from "mongoose";

export const createOrder = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const {
      customer,
      items,
      totalAmount,
      paymentMethod,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in order" },
        { status: 400 }
      );
    }

    // ❌ ONLINE ORDER DIRECT CREATE NAHI
    if (paymentMethod === "online") {
      return NextResponse.json(
        { error: "Online payment requires verification" },
        { status: 400 }
      );
    }

    // ✅ COD ORDER CREATE
    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod: "cod",
      paymentStatus: "pending",
    });

    return NextResponse.json(
      { success: true, order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
};
export const getOrder = async()=> {
  try {
    await connectDB();

   

    const products = await order.find();
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
export async function getOrderById(id) {
  try {
    await connectDB();

    // ✅ validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid order id" },
        { status: 400 }
      );
    }

    const product = await order.findById(id);

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
    console.error("GET order ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}