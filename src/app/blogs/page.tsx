'use client';

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  createdAt: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogs);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(6); // Reset visible count on new search
          }}
          placeholder="Search blog posts..."
          className="w-full md:w-1/2 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No blog found</p>
      ) : (
        <>
          {/* Blog Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Featured Post */}
            {visibleBlogs[0] && (
              <Link href={`/blog/${visibleBlogs[0].slug}`} className="md:col-span-2">
                <Card className="overflow-hidden hover:shadow-lg transition">
                  <div className="relative w-full h-[400px]">
                    <img
                      src={visibleBlogs[0].coverImage || "/images/fallback.png"}
                      alt={visibleBlogs[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-3xl mb-3">{visibleBlogs[0].title}</CardTitle>
                    <p className="text-gray-700 text-base">{visibleBlogs[0].excerpt}</p>
                    <p className="text-sm text-gray-500 mt-3">
                      {new Date(visibleBlogs[0].createdAt).toDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Right side blogs */}
            <div className="flex flex-col gap-4">
              {visibleBlogs.slice(1, 3).map((blog) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`}>
                  <Card className="flex flex-col sm:flex-row gap-4 overflow-hidden hover:shadow-md transition">
                    <div className="w-full sm:w-48 h-36 shrink-0">
                      <img
                        src={blog.coverImage || "/images/fallback.png"}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                      />
                    </div>
                    <CardContent className="p-3 flex flex-col justify-center">
                      <CardTitle className="text-md font-semibold">{blog.title}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{blog.excerpt}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(blog.createdAt).toDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* More Posts */}
          <h2 className="text-xl font-semibold mb-4">More Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleBlogs.slice(3).map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`}>
                <Card className="hover:shadow-md transition">
                  <div className="relative w-full h-[250px]">
                    <img
                      src={blog.coverImage || "/images/fallback.png"}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{blog.title}</CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(blog.createdAt).toDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredBlogs.length && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 border rounded-full hover:bg-gray-100 transition"
              >
                Load more posts
              </button>
            </div>
            
          )}
        </>
      )}
      {/* CTA: Write a Blog */}
        <div className="mt-20 text-center border-t pt-10">
          <h2 className="text-2xl font-semibold mb-4">Want to share something?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Write and publish your own blog post now!
          </p>
          <Link
            href="/blog/submit"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition"
          >
            Write a Blog
          </Link>
        </div>
        <br />
    </div>
    
  );
  
}

