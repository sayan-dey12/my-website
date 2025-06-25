import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectDB } from '@/dbConfig/dbConfig';
import Blog from '@/models/blogModel';
import User from '@/models/userModel';

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    // Optional: Confirm the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { title, slug, content } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newBlog = new Blog({
      ...body,
      authorId: userId,
      isPublished: false,
      status: "pending", 
    });

    await newBlog.save();

    return NextResponse.json({ message: "Blog submitted for review" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid or expired token", error: error.message }, { status: 401 });
  }
}
