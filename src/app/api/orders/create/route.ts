import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Expecting: { userId, user, cart, payment, address, ... }
    const { userId, user, cart, payment, address, ...rest } = body;
    if (!userId || !cart || !payment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const orderData = {
      userId,
      user: user || null,
      cart,
      payment,
      address: address || null,
      createdAt: new Date().toISOString(),
      status: "placed",
      ...rest,
    };
    const docRef = await db.collection("orders").add(orderData);
    return NextResponse.json({ orderId: docRef.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
