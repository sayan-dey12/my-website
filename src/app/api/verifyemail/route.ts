import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/userModel';
import { connectDB } from '@/dbConfig/dbConfig';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.nextUrl.searchParams.get("token");
    const userId = req.nextUrl.searchParams.get("id");

    if (!token || !userId) {
      return NextResponse.json({ message: "Invalid link" }, { status: 400 });
    }

    // Hash the token (same as in sendEmail)
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Match the user with hashed token & expiry check
    const user = await User.findOne({
      _id: userId,
      verifyToken: hashedToken,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Token expired or invalid" }, { status: 400 });
    }

    // Mark as verified
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error: any) {
  console.error("Backend verification error:", error);
  return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
}
}
