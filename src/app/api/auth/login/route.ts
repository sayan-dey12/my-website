import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel'; // adjust if needed
import bcryptjs from 'bcryptjs';
import {connectDB} from '@/dbConfig/dbConfig'; // adjust if your db file is elsewhere
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log(user);

    // ✅ Block if not verified
  if (!user.isVerified) {
    return NextResponse.json({ message: "UNVERIFIED_EMAIL" }, { status: 401 });
  }
    
    // Optional: you can return a token

    const tokenData={
        id:user._id,
        email:user.email,
        username:user.username,
        isAdmin: user.isAdmin,
        role: user.role, // Assuming you have a role field
    }

    //create token
    const token = jwt.sign(tokenData,process.env.JWT_SECRET!);

    const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    })
        return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
