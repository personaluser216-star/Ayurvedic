import { createOrder, getOrder } from "@/controller/order";

export async function POST(req) {
  return createOrder(req);
}

export async function GET()
{
  return getOrder();
}