// src/app/api/blogs/[slug]/route.ts
import { connectDB } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();

  const blog = await Blog.findOne({ slug: params.slug });

  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, blog });
}
