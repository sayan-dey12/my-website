import { connectDB } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {
  const { id } = context.params;
  await connectDB();

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    blog.status = "approved";
    blog.isPublished = true;
    await blog.save();

    return NextResponse.json({ message: "Blog approved successfully" });
  } catch (error: any) {
    console.error("❌ Approve blog error:", error);
    return NextResponse.json({ message: "Failed to approve blog" }, { status: 500 });
  }
}
