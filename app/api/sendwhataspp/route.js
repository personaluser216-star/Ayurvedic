import twilio from "twilio";

export async function POST(req) {
  try {
    const { phone, firstName, orderId, total } = await req.json();

    const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio sandbox
      to: `whatsapp:+91${phone}`,
      body: `Hi ${firstName}, 
Your order ${orderId} is confirmed.
Total: ₹${total}
Thank you for shopping ❤️`,
    });

    return Response.json({ success: true });
  }catch (error) {
  console.log("WhatsApp Full Error:", error);
  return Response.json({
    success: false,
    error: error.message,
  });
}}
