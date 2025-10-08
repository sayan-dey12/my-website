// app/api/connect/route.ts
import { NextResponse } from "next/server";
import Email from "@/models/Email";
import { connectDB } from "@/dbConfig/dbConfig";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ success: true, message: "You are already subscribed!" });
    }

    // Create new email
    const newEmail = await Email.create({ email });
    return NextResponse.json({ success: true, message: "Thanks! You'll get updates soon.", data: newEmail });
  } catch (err) {
    console.error("Error saving email:", err);
    return NextResponse.json({ success: false, message: "Failed to save email" }, { status: 500 });
  }
}
