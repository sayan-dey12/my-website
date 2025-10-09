import Link from "next/link";
import { CardContent } from "@/components/ui/card";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  createdAt: string;
  author?: string;
  readingTime?: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  // Safe deterministic date formatting for SSR/ISR
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className="rounded-xl overflow-hidden border dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition bg-white dark:bg-gray-800">
        {/* 🖼️ Cover Image */}
        <div className="relative w-full h-[220px]">
          <img
            src={blog.coverImage || "/images/fallback.png"}
            alt={blog.title}
            className="w-full h-full object-contain sm:object-cover"
            loading="lazy"
          />
        </div>

        {/* 📖 Blog Content */}
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {blog.excerpt}
          </p>

          {/* 👤 Author + ⏱️ Reading time + 🗓️ Date */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {blog.author || "Guest Author"} • {blog.readingTime || "5 min read"} • {formattedDate}
          </p>
        </CardContent>
      </article>
    </Link>
  );
}
