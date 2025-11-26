import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/connectDB";
import { encryptPassword } from "@/lib/bcrypt";
import { sendMail } from "@/lib/mail";
import { passwordResetConfirmationEmail } from "@/lib/email-templates";
import crypto from "crypto";
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // token not expired
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // Hash the new password
    const encryptedPassword = await encryptPassword(password);
    user.password = encryptedPassword;

    // Clear token and expiration
    user.resetPasswordToken = "";
    user.resetPasswordExpires = 0;

    await user.save();

     await sendMail({
        to: user.email,
        subject: "Your password has been reset",
        html: passwordResetConfirmationEmail(user.name),
      });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
