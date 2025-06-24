// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/sendEmail';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Email not found' }, { status: 400 });
  }

  await sendEmail({ email, emailType: 'RESET', userId: user._id });
  return NextResponse.json({ message: 'Password reset link sent' }, { status: 200 });
}
