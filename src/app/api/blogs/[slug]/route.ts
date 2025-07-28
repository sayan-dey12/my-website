// src/app/api/blogs/[slug]/route.ts
import { connectDB } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string;
  };
};

export async function GET(
  req: NextRequest,
  context: Context 
) {
  
  await connectDB();
  const { slug } = context.params;


  const blog = await Blog.findOne({ slug: slug });

  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, blog });
}
