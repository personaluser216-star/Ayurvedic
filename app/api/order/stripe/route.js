import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/order";

export async function POST(req) {
  try {
    await connectDB();

    const { customer, items, totalAmount } = await req.json();
    const origin = req.headers.get("origin");

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    // 🔹 ORDER CREATE (payment false)
  const order = await Order.create({
  customer,
  items,
  totalAmount,
  paymentMethod: "online", // ✅ IMPORTANT
  onlineMethod: "stripe",
  paymentStatus: "pending",
});


    // 🔹 STRIPE LINE ITEMS
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // 🔹 STRIPE SESSION
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

