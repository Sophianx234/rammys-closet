import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/connectDB";
import { encryptPassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { sendMail } from "@/lib/mail";
import { welcomeEmailTemplate } from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    // Parse FormData from the request
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await encryptPassword(password);

  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

     await sendMail({
      to: email,
      subject: "Welcome to Rammy's Closet!",
      html: welcomeEmailTemplate(name),
    });

    const token = await signToken(user);
    return setAuthCookie(token);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
