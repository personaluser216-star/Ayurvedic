
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/order";

export async function POST(req) {
  try {
    await connectDB();

    const { orderId, success } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID missing" },
        { status: 400 }
      );
    }

    if (success === true || success === "true") {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "paid",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({
      success: false,
      message: "Payment failed or cancelled",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


