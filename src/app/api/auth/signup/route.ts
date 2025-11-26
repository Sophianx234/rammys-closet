import { encryptPassword } from "@/lib/bcrypt";
import { connectToDatabase } from "@/lib/connectDB";
import { welcomeEmail } from "@/lib/email-templates";
import { signToken } from "@/lib/jwtConfig";
import { sendMail } from "@/lib/mail";
import { setAuthCookie } from "@/lib/setAuthCookie";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

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
      html: welcomeEmail(name),
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
