import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = (decoded as any).userId;

    // Clear the user's cart
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );

    return NextResponse.json({
      message: "Cart cleared successfully",
      cart: updatedUser?.cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
