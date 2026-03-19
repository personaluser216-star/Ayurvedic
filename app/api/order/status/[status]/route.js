import { connectDB } from "@/lib/mongodb";
import order from "@/models/order";

export async function GET(req, { params }) {
  try {
    await connectDB();

    let { status } = params; // URL ma status aave che

    // Optional: frontend value map karo
    const statusMap = {
      placed: "placed",
      packing: "packing",
      shipped: "shipped",
      out_for_delivery: "out_for_delivery",
      delivered: "delivered",
      cancelled: "cancelled",
    };

    const dbStatus = statusMap[status] || status;

    const orders = await order.find({ status: dbStatus }).sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({ success: true, orders }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}