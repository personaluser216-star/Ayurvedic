import { deleteproduct, editproduct, getProductById } from "@/controller/product";

export async function GET(req, context) {
  const params = await context.params; // ✅ MUST await
  const { id } = params;

  return getProductById(id);
}
export async function DELETE(req, context) {
  const { id } = await context.params; // ✅ SAME FIX HERE
  return deleteproduct(id);
}
export async function PUT(req, context) {
  const params = await context.params; // 🔥 FIX
  return editproduct(req, params.id);
}

