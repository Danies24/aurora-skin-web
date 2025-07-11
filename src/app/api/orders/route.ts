import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const snapshot = await db
      .collection("orders")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
