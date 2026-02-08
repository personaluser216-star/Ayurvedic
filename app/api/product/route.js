import { addproduct, getproduct } from "@/controller/product";

export async function POST(req) {
  return addproduct(req);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  return getproduct(search);
}
