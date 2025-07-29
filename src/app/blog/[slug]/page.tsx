import { connectDB } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import User, { IUser } from "@/models/userModel";
import { notFound } from "next/navigation";
import { BlogType } from "@/types/blog";
import { marked } from "marked";

type Props = {
  params: Promise<{ slug: string }>; // 👈 NOTE: `params` is async
};

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params; // ✅ Await here

  await connectDB();

  const blog = (await Blog.findOne({ slug }).lean()) as BlogType | null;
  if (!blog) return notFound();

  const user = (await User.findById(blog.authorId).lean()) as IUser | null;
  const authorName = user?.username ?? "Unknown author";

  const htmlContent = await marked.parse(blog.content || "");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 group transition duration-300">
      {/* Cover Image */}
      <div className="overflow-hidden rounded-2xl mb-6 hover:scale-105 hover:shadow-lg transition duration-500">
        <img
          src={blog.coverImage || "/images/fallback.png"}
          alt={blog.title}
          className="w-full h-auto max-h-[600px] object-contain rounded-2xl"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 group-hover:underline decoration-purple-500 transition duration-300">
        {blog.title}
      </h1>

      {/* Date & Tags */}
      <div className="flex flex-wrap justify-between text-sm text-gray-500 mb-6">
        <p>{new Date(blog.createdAt).toDateString()}</p>
        <div className="flex gap-2 flex-wrap">
          {blog.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs hover:bg-purple-200 transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Blog Content */}
      <div
  className="prose max-w-none transition duration-300
    [&_img]:w-full [&_img]:max-w-[500px] [&_img]:mx-auto [&_img]:rounded-lg
    [&_pre]:overflow-x-auto [&_pre]:bg-gray-100 dark:[&_pre]:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:text-sm
    [&_code]:break-words"
  dangerouslySetInnerHTML={{ __html: htmlContent }}
/>

      {/* Author Name */}
      <p className="mt-10 text-sm text-gray-500 italic text-right">Written by {authorName}</p>
    </div>
  );
}
