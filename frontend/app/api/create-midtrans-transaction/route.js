import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

export async function POST(request) {
  try {
    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.SECRET,
      clientKey: process.env.NEXT_PUBLIC_CLIENT,
    });

    const body = await request.json();
    const transaction = await snap.createTransaction(body);

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error("Midtrans Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
