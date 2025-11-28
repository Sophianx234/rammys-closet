import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/connectDB";
import { getTokenFromRequest } from "@/lib/jwtConfig";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    // 🔐 Get token from headers
    const token = await getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    // 📦 Parse FormData
    const form = await req.formData();
    const image = form.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ msg: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const result = await uploadBufferToCloudinary(buffer, token.userId, "users");

    const updatedUser = await User.findByIdAndUpdate(
      token.userId,
      { profile: result.secure_url },
      { new: true }
    );

    return NextResponse.json({ msg: "Profile updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ msg: "Failed to update profile" }, { status: 500 });
  }
};
