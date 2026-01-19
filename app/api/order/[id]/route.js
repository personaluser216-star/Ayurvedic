import { getOrderById } from "@/controller/order";

export async function GET(req, context) {
  const params = await context.params; // ✅ MUST await
  const { id } = params;

  return getOrderById(id);
}