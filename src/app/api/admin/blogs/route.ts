import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import initMongooseModels from "@/lib/initMongooseModels"; // ✅ new import

initMongooseModels(); // ✅ register all models before use

export async function GET() {
  try {
    await connectDB();

    const Blog  = (await import("@/models/blogModel")).default; // use dynamic import here if needed

    const blogs = await Blog.find({ status: "pending" }).populate("authorId", "username email");

    console.log("📦 Blogs from DB:", blogs);

    return NextResponse.json({ blogs });
  } catch (err: any) {
    console.error("❌ Error in admin blogs route:", err);

    return NextResponse.json(
      { message: "Error fetching blogs", error: err.message },
      { status: 500 }
    );
  }
}
