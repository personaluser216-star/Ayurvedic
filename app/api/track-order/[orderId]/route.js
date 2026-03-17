import Order from "@/models/order";
import { Types } from "mongoose"; // ✅ change
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET(req, { params }) {
  const { orderId } = await params;

  try {
    await connectDB(); // ✅ first connect

    if (!Types.ObjectId.isValid(orderId)) { // ✅ fix
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 }
      );
    }

    const trackorder = await Order.findById(orderId).lean();

    if (!trackorder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: trackorder },
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