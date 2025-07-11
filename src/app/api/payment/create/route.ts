// app/api/payment/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { db } from "@/lib/firebase/admin";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received POST Body:", body); // ✅ log everything

    const { amount } = body;

    if (!amount) {
      console.log("❌ Missing amount");
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });
    console.log("order", order);
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: unknown) {
    console.error("🔥 ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
