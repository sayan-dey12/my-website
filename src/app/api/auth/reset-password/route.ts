// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  await connectDB();
  const { token, id, password } = await req.json();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    _id: id,
    forgotPasswordToken: hashedToken,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({ message: 'Token expired or invalid' }, { status: 400 });
  }

  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(password, salt);
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;
  await user.save();

  return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
}
