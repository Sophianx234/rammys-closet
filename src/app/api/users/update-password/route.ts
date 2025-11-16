import { encryptPassword, verifyPassword } from "@/lib/bcrypt";
import { connectToDatabase } from "@/lib/connectDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();

    const form = await req.formData();
    const userId = form.get("userId") as string | null;
    const current = form.get("current") as string | null;
    const newPass = form.get("newPass") as string | null;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    if (!current || !newPass) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const match = await verifyPassword(current, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    user.password = await encryptPassword(newPass);
    await user.save();

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Password update error:", e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
