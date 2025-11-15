import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import { User } from "@/models/User";
import { signToken } from "@/lib/jwtConfig";
import { setAuthCookie } from "@/lib/setAuthCookie";
import { verifyPassword } from "@/lib/bcrypt";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Sign JWT token
    const token = await signToken(user);

    // Optionally, set HttpOnly cookie
    const response = setAuthCookie(token);

    // Include user role in the response
    const responseData = {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role || "user", // default to 'user' if role not set
      },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
