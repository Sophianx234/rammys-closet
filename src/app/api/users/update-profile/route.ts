import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/connectDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();

    const form = await req.formData();

    const userId = form.get("userId") as string | null;
    const name = form.get("name") as string | null;
    const email = form.get("email") as string | null;
    const file = form.get("profile") as File | null;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Update text fields
    if (name) user.name = name;
    if (email) user.email = email;

    // Handle optional image update
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadBufferToCloudinary(buffer, undefined, "users");
      user.profile = result.secure_url;
    }

    await user.save();

    return NextResponse.json(
      { message: "User updated", user },
      { status: 200 }
    );

  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
