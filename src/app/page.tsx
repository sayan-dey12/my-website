"use client";

import { IconCloudDemo } from "@/components/magicui/icon-cloud-demo";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  createdAt: string;
};

export default function HomePage() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    toast("🚧 Feature coming soon!", { duration: 3000 });
  };

  const handleConnect = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      "/connect",
      "ConnectWindow",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };

  useEffect(() => {
    fetch("/api/blogs/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLatestBlogs(data.blogs);
        }
      });
  }, []);

  return (
    <main className="w-full px-4 sm:px-6 max-w-7xl mx-auto transition-colors duration-300">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-12 py-20 border-b border-gray-200 dark:border-gray-800">
        {/* Left Side */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Sayan Dey
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
            Full-Stack Developer • AI Enthusiast • Open Source Contributor
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            I design and build high-quality software solutions, focusing on{" "}
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              web applications
            </span>
            ,{" "}
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              AI integration
            </span>
            , and{" "}
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              developer tools
            </span>
            . My goal is to create impactful, scalable, and maintainable products.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleComingSoon}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
            >
              Projects
            </button>
            <button
              onClick={handleConnect}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-md transition"
            >
              Connect with Me
            </button>
            <Link
              href="/blogs"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition"
            >
              Read Blogs
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center md:justify-end">
          <div className="w-[300px] md:w-[350px]">
            <IconCloudDemo />
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 border-b border-gray-200 dark:border-gray-800 pb-3 text-gray-900 dark:text-white">
          Latest Blogs
        </h2>

        {latestBlogs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Loading latest blogs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`}>
                <div className="hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-900/30 transition rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111]">
                  <div className="relative w-full h-[220px]">
                    <img
                      src={blog.coverImage || "/images/fallback.png"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                      {blog.excerpt}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                      {new Date(blog.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 max-w-3xl">
          TechWithStrider is my personal blog and portfolio website. I’m Sayan Dey,
          a full-stack developer and student building in public with AI, web
          technologies, and open source.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center border-t border-gray-200 dark:border-gray-800 pt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Share Your Knowledge
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Write and publish your own blog post now.
        </p>
        <Link
          href="/blog/submit"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition"
        >
          Write a Blog
        </Link>
      </section>

      <br />
      <br />
    </main>
  );
}
