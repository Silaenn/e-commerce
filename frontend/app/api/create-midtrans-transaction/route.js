import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

export async function POST(request) {
  try {
    const serverKey = process.env.SECRET;
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    if (!serverKey || !clientKey) {
      console.error("Midtrans Error: SECRET or NEXT_PUBLIC_CLIENT environment variables are missing.");
      return NextResponse.json({ error: "Server configuration error: Missing Midtrans keys." }, { status: 500 });
    }

    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: serverKey,
      clientKey: clientKey,
    });

    const body = await request.json();
    console.log("DEBUG: Midtrans Payload:", body);
    
    const transaction = await snap.createTransaction(body);
    return NextResponse.json({ transaction });
  } catch (error) {
    console.error("Midtrans API Error Details:", error);
    return NextResponse.json({ 
      error: error.message,
      details: error.ApiResponse || "No detailed API response"
    }, { status: 500 });
  }
}
