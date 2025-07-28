import { connectDB } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context:any 
) {
  const {id} = context.params;
  console.log("Requesting blog id:", id);

  try {
    await connectDB();

    const blog = await Blog.findById(id).populate(
      "authorId",
      "username email"
    );

    // Blog not found or already reviewed
    if (!blog || blog.status !== "pending") {
      return NextResponse.json(
        { message: "Blog not found or already reviewed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog }, { status: 200 }); // Wrapped in `{ blog }`
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error fetching blog" },
      { status: 500 }
    );
  }
}
