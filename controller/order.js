import { NextResponse } from "next/server";

import Order from "@/models/order"
import { connectDB } from "@/lib/mongodb";
import order from "@/models/order";
import mongoose from "mongoose";
import OrderSuccess from "@/componets/OrderSuccess";

import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export const createOrder = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const { customer, items, totalAmount, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    if (paymentMethod === "online") {
      return NextResponse.json(
        { error: "Online payment requires verification" },
        { status: 400 }
      );
    }

    // Create Order
    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod: "cod",
      paymentStatus: "pending",
    });
if (global.io) {
  global.io.emit("new_order", order);
}

    // ================= SEND EMAIL =================
    try {
      const emailPayload = {
        customerName: `${customer.firstName} ${customer.lastName || ''}`.trim(),
        customerEmail: customer.email,
        orderId: order._id.toString(),
        totalAmount: totalAmount,
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        address: `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,
        phone: customer.phone,
        paymentMethod: "cod",
      };

    await resend.emails.send({
  from: "Kanhiya Ayurveda <onboarding@resend.dev>",
  to: customer.email,
  subject: `Order Confirmed #${order._id} - Kanhiya Ayurveda`,

  react: OrderSuccess({
    customerName: emailPayload.customerName,
    orderId: emailPayload.orderId,
    totalAmount: emailPayload.totalAmount,
    paymentMethod: emailPayload.paymentMethod,
    items: emailPayload.items,
    address: emailPayload.address,
    phone: emailPayload.phone,
  }),
});

      console.log(`✅ Order email sent to ${customer.email}`);

    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
      // Email fail hone par bhi order success rahega
    }

    return NextResponse.json({ success: true, order }, { status: 201 });

  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
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
};
export const updateOrderStatus = async (id, body) => {
  try {
    const { orderStatus } = body;

    const validStatus = ["placed", "packing", "shipped", "out_for_delivery", "delivered", "cancelled"];

    if (!validStatus.includes(orderStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      data: order,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
};