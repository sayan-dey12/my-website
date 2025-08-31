"use client";

import { CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  createdAt: string;
  category?: string;
  author?: string;
  readingTime?: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.blogs)) {
          const enhancedBlogs = data.blogs.map((b: Blog) => ({
            ...b,
            author: b.author || "Guest Author",
            readingTime: b.readingTime || "5 min read",
            category: b.category || "General",
            excerpt: b.excerpt || "Read this insightful blog post.",
          }));
          setBlogs(enhancedBlogs);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category || "General"))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || blog.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <main className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* 🔍 Search + Categories */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(6);
          }}
          placeholder="Search blog posts..."
          aria-label="Search blog posts"
          className="w-full md:w-1/2 p-3 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition 
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 🌀 Loading / Empty */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          Loading blogs...
        </p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No blog found
        </p>
      ) : (
        <>
          {/* ⭐ Featured Post + Right Sidebar */}
          {visibleBlogs[0] && (
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              {/* Left: Featured Blog */}
              <Link
                href={`/blog/${visibleBlogs[0].slug}`}
                className="flex-1 group"
              >
                <article className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition w-full">
                  <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px]">
                    <img
                      src={visibleBlogs[0].coverImage || "/images/fallback.png"}
                      alt={visibleBlogs[0].title}
                      className="w-full h-full object-contain sm:object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2 group-hover:underline">
                      {visibleBlogs[0].title}
                    </h2>
                    <p className="text-sm opacity-80 mb-2">
                      {visibleBlogs[0].author} • {visibleBlogs[0].readingTime} •{" "}
                      {new Date(visibleBlogs[0].createdAt).toDateString()}
                    </p>
                    <p className="text-base opacity-90 line-clamp-2">
                      {visibleBlogs[0].excerpt}
                    </p>
                  </div>
                </article>
              </Link>

              {/* Right Sidebar */}
              <aside className="flex-1 flex flex-col gap-4">
                {/* Popular Posts */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
                  <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 text-lg">
                    Popular Posts
                  </h3>
                  {blogs.slice(1, 5).map((blog) => (
                    <Link
                      key={blog._id}
                      href={`/blog/${blog.slug}`}
                      className="flex items-center gap-3 mb-3 hover:bg-purple-50 dark:hover:bg-gray-700 p-2 rounded transition"
                    >
                      <img
                        src={blog.coverImage || "/images/fallback.png"}
                        alt={blog.title}
                        className="w-16 h-16 object-contain sm:object-cover rounded"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {blog.author} • {new Date(blog.createdAt).toLocaleDateString()} • {blog.readingTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {/* 📑 Blog Grid */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Latest Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {visibleBlogs.slice(1).map((blog) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`}>
                  <article className="rounded-xl overflow-hidden border dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition bg-white dark:bg-gray-800">
                    <div className="relative w-full h-[220px]">
                      <img
                        src={blog.coverImage || "/images/fallback.png"}
                        alt={blog.title}
                        className="w-full h-full object-contain sm:object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {blog.author} • {blog.readingTime}
                      </p>
                    </CardContent>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* 📌 Load More */}
          {visibleCount < filteredBlogs.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition"
              >
                Load more posts
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
