import { getOrderById, updateOrderStatus } from "@/controller/order";

export async function GET(req, context) {
  const params = await context.params;
  const { id } = params;

  return getOrderById(id);
}

export async function PUT(req, context) {
  const params = await context.params;
  const { id } = params;

  const body = await req.json();

  // 👇 controller ne id + body mokliye
  return updateOrderStatus(id, body);
}