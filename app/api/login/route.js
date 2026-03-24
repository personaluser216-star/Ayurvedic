// app/api/admin/login/route.js
import { adminLogin } from "@/controller/admin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Create a mock req/res object for controller
    const mockReq = { body: { email, password } };
    const mockRes = {
      status: (code) => {
        mockRes.statusCode = code;
        return mockRes;
      },
      json: (data) => {
        return new Response(JSON.stringify(data), {
          status: mockRes.statusCode || 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    };

    return adminLogin(mockReq, mockRes);
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}