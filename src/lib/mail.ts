import { User } from "@/models/User";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465, // auto-secure if using port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Rammy's Closet" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, error };
  }
}



export async function sendMailToAllUsers({
  subject,
  html,
  text,
}: {
  subject: string;
  html: string;
  text?: string;
}) {
  // Get all emails
  const users = await User.find({}, "email");

  if (!users.length) {
    console.log("⚠️ No users found. Skipping bulk email.");
    return;
  }

  const BATCH_SIZE = 30; // safe for SMTP servers
  const allEmails = users.map((u) => u.email);

  for (let i = 0; i < allEmails.length; i += BATCH_SIZE) {
    const batch = allEmails.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map((email) =>
        sendMail({
          to: email,
          subject,
          html,
          text,
        })
      )
    );

    console.log(`📩 Sent batch (${batch.length}) successfully`);
  }
}
