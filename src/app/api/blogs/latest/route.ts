import { connectDB } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
  }
}
