import { connectToDatabase } from "@/lib/connectDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();

    const form = await req.formData();
    const userId = form.get("userId") as string | null;
    const email = form.get("email") as string | null;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update email
    user.email = email;
    await user.save();

    return NextResponse.json(
        { message: "Email updated successfully", user },
        { status: 200 }
    );

  } catch (e) {
    console.error("Email update error:", e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
