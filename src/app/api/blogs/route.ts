import { NextResponse } from "next/server";
import {connectDB} from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: "approved", isPublished: true }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}
