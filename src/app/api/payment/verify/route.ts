// app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase/admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    // update order status
    await db.collection("orders").doc(razorpay_order_id).update({
      razorpay_payment_id,
      razorpay_signature,
      status: "paid",
      paidAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, error: "Signature mismatch" },
      { status: 400 }
    );
  }
}
