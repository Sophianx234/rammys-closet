import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, amount, reference } = await request.json();

    const paystackSecretKey = process.env.NEXT_PUBLIC_PAYSTACK_LIVE_KEY;

    if (!paystackSecretKey) {
      return NextResponse.json({ error: "Paystack secret key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Paystack uses kobo
        reference,
        
        metadata: {
          order_id: reference,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[v0] Paystack error:", data);
      return NextResponse.json({ error: data.message || "Failed to initialize payment" }, { status: response.status });
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("[v0] Payment initialization error:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  }
}
