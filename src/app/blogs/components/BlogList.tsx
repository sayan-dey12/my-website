"use client";

import { useState } from "react";
import SearchAndFilter from "./SearchAndFilter";
import FeaturedPost from "./FeaturedPost";
import PopularPosts from "./PopularPosts";
import BlogCard from "./BlogCard";
import LoadMoreButton from "./LoadMoreButton";

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

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

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

  return (
    <>
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setVisibleCount={setVisibleCount}
      />

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No blogs found.
        </p>
      ) : (
        <>
          {visibleBlogs[0] && (
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              <FeaturedPost post={visibleBlogs[0]} />
              <PopularPosts blogs={blogs.slice(1, 5)} />
            </div>
          )}

          <section>
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Latest Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {visibleBlogs.slice(1).map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </section>

          {visibleCount < filteredBlogs.length && (
            <LoadMoreButton onClick={() => setVisibleCount((p) => p + 6)} />
          )}
        </>
      )}
    </>
  );
}
