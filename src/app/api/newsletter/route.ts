import { NextResponse } from "next/server";
import { Newsletter } from "@/models/Newsletter";
import { connectToDatabase } from "@/lib/connectDB";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { type: 'error', text: "Email is required" },
        { status: 400 }
      );
    }

    // Prevent duplicates
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { type: 'error', text: "This email is already subscribed." }
      );
    }

    await Newsletter.create({ email });

    return NextResponse.json({
      type: 'success',
      text: "Subscribed successfully!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { type: 'error', text: error.message },
      { status: 500 }
    );
  }
}
