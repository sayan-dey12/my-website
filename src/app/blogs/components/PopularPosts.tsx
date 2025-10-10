import Link from "next/link";

export default function PopularPosts({ blogs }: { blogs: any[] }) {
  return (
    <aside className="flex-1 flex flex-col gap-4">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 text-lg">
          Popular Posts
        </h3>
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            className="flex items-center gap-3 mb-3 hover:bg-purple-50 dark:hover:bg-gray-700 p-2 rounded transition"
          >
            <img
              src={blog.coverImage || "/images/fallback.png"}
              alt={blog.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                {blog.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {blog.author} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                {blog.readingTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
