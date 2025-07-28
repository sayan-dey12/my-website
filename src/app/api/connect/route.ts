// app/api/connect/route.ts
import { NextResponse } from "next/server";
import Email from "@/models/Email";
import {connectDB} from "@/dbConfig/dbConfig"; // assuming you renamed dbConfig to dbConnect for consistency

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const newEmail = await Email.create({ email });
    return NextResponse.json({ success: true, message: "Email saved", data: newEmail });
  } catch (err) {
    console.error("Error saving email:", err);
    return NextResponse.json({ success: false, message: "Failed to save email" }, { status: 500 });
  }
}
