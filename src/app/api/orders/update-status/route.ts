import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import { Order } from "@/models/Order";

export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    const { reference, status } = await req.json();

    if (!reference || !status)
      return NextResponse.json(
        { success: false, message: "Missing reference or status" },
        { status: 400 }
      );

    const updated = await Order.findOneAndUpdate(
      { paymentReference: reference },
      { orderStatus: status },
      { new: true }
    );

    if (!updated)
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
