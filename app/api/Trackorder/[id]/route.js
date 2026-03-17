// app/api/track-order/[orderId]/route.js
import dbConnect from "@/utils/dbConnect";

import order from "@/models/order";

export async function GET(req, { params }) {
  const { orderId } = params; // folder slug

  try {
    await dbConnect(); // connect to DB
    const order = await order.findById(orderId);

    if (!order)
      return new Response(JSON.stringify({ message: "Order not found" }), {
        status: 404,
      });

    // return order details
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}