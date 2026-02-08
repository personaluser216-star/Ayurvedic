
import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    const { phone, firstName, orderId, total } = await req.json();

    if (!phone || !orderId || !firstName) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const message = `Hi ${firstName},\nYour order has been successfully placed!\nOrder ID: ${orderId}\nAmount: ₹${total}\nThank you for shopping with us!`;

    const sent = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: `whatsapp:+${phone}`,      // customer number with country code
    });

    return NextResponse.json({ success: true, sid: sent.sid });
  } catch (error) {
    console.error("WhatsApp Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


