// app/api/admin/customers/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const customers = await User.find().select(
      "-password"
    );

    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
